import './journey.css';

import React, { useEffect, useRef, useState } from 'react';

import { chapters, finrightCards, links, skills } from './chapters';
import { createSound } from './sound';
import { createWorld } from './world';

const COUNT = chapters.length;
const FINRIGHT_INDEX = chapters.findIndex((c) => c.id === 'finright');
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const GFX_MODES = ['auto', 'high', 'low'];
const SLOW_FRAME_MS = 30;
const lowPower = window.innerWidth < 768 || (navigator.hardwareConcurrency || 8) <= 4;

const readSavedGfx = () => {
  try {
    const saved = window.localStorage.getItem('journey-gfx');
    return GFX_MODES.includes(saved) ? saved : 'auto';
  } catch (e) {
    return 'auto';
  }
};

const Journey = () => {
  const canvasRef = useRef(null);
  const chapterRefs = useRef([]);
  const cardRefs = useRef([]);
  const hintRef = useRef(null);
  const worldRef = useRef(null);
  const soundRef = useRef(null);
  const [active, setActive] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [gfxMode, setGfxMode] = useState(readSavedGfx);
  // In auto mode this drops to 'low' if frames are slow.
  const [autoQuality, setAutoQuality] = useState(lowPower ? 'low' : 'high');
  const quality = gfxMode === 'auto' ? autoQuality : gfxMode;
  const gfxModeRef = useRef(gfxMode);
  gfxModeRef.current = gfxMode;

  useEffect(() => {
    if (worldRef.current) worldRef.current.setQuality(quality);
  }, [quality]);

  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showIntro]);

  useEffect(() => {
    let world;
    let frame;
    let disposed = false;
    let target = 0;
    let current = 0;
    let last = performance.now();
    let slowTime = 0;
    let sampledTime = 0;

    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? clamp01(window.scrollY / max) : 0;
    };
    const resize = () => world && world.resize(window.innerWidth, window.innerHeight);

    // Fade each chapter's text in around the middle of its stretch of road.
    const updateOverlays = (p) => {
      chapterRefs.current.forEach((el, i) => {
        if (!el) return;
        const center = (i + 0.5) / COUNT;
        const half = 0.5 / COUNT;
        let d = (p - center) / half;
        if (i === 0 && d < 0) d = 0;
        if (i === COUNT - 1 && d > 0) d = 0;
        const opacity = clamp01((1 - Math.abs(d)) * 2.4);
        el.style.opacity = opacity;
        el.style.transform = `translateY(${d * -28}px)`;
        el.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
        el.style.pointerEvents = opacity > 0.6 ? 'auto' : 'none';
      });
      const local = (p - FINRIGHT_INDEX / COUNT) * COUNT;
      cardRefs.current.forEach((el, k) => {
        if (!el) return;
        const shown = local > 0.5 + k * 0.08 && local < 0.97;
        el.classList.toggle('is-shown', shown);
      });
      if (hintRef.current) hintRef.current.style.opacity = clamp01(1 - p * 40);
    };

    // Auto GFX: if more than a third of the last few seconds ran slow, switch to low.
    const watchFrameRate = (frameMs) => {
      if (gfxModeRef.current !== 'auto' || document.hidden || frameMs > 500) return;
      sampledTime += frameMs;
      if (frameMs > SLOW_FRAME_MS) slowTime += frameMs;
      if (sampledTime > 4000) {
        if (slowTime / sampledTime > 0.33) setAutoQuality('low');
        sampledTime = 0;
        slowTime = 0;
      }
    };

    const loop = (now) => {
      const frameMs = now - last;
      const dt = Math.min(0.05, frameMs / 1000);
      last = now;
      current += (target - current) * Math.min(1, dt * 3.5);
      const { chapterIndex, speed, vehicle } = world.update(current, dt);
      if (soundRef.current) soundRef.current.update({ speed, progress: current, vehicle });
      watchFrameRate(frameMs);
      setActive((prev) => (prev === chapterIndex ? prev : chapterIndex));
      updateOverlays(current);
      frame = requestAnimationFrame(loop);
    };

    (async () => {
      try {
        await Promise.race([
          document.fonts && document.fonts.load('700 40px "JetBrains Mono"'),
          new Promise((resolve) => setTimeout(resolve, 1500)),
        ]);
      } catch (e) {
        // Signs fall back to a system monospace font.
      }
      if (disposed) return;
      try {
        world = createWorld(canvasRef.current, { lowPower });
      } catch (e) {
        // No usable WebGL: fall back to the classic site.
        window.location.replace(links.classic);
        return;
      }
      worldRef.current = world;
      resize();
      world.setQuality(gfxModeRef.current === 'auto' ? (lowPower ? 'low' : 'high') : gfxModeRef.current);
      readScroll();
      current = target;
      frame = requestAnimationFrame(loop);
    })();

    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('resize', resize);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('resize', resize);
      if (world) world.dispose();
      worldRef.current = null;
      if (soundRef.current) soundRef.current.dispose();
      soundRef.current = null;
    };
  }, []);

  const jumpTo = (index) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ((index + 0.5) / COUNT) * max, behavior: 'smooth' });
  };

  // Browsers only allow audio to start from a click, so sound is created on demand.
  const setSound = (on) => {
    if (on && !soundRef.current) soundRef.current = createSound();
    if (soundRef.current) soundRef.current.setMuted(!on);
    setSoundOn(on && Boolean(soundRef.current));
  };

  const startRide = (withSound) => {
    setSound(withSound);
    setShowIntro(false);
  };

  const cycleGfx = () => {
    const next = GFX_MODES[(GFX_MODES.indexOf(gfxMode) + 1) % GFX_MODES.length];
    setGfxMode(next);
    try {
      window.localStorage.setItem('journey-gfx', next);
    } catch (e) {
      // Preference just isn't remembered.
    }
  };

  const gfxLabel = gfxMode === 'auto' ? `Auto·${autoQuality}` : gfxMode;

  return (
    <div className="journey">
      <canvas ref={canvasRef} className="journey__canvas" aria-hidden="true" />

      <div className="journey__hud">
        <a href="#top" className="journey__brand" onClick={(e) => { e.preventDefault(); jumpTo(0); }}>
          <strong>Moovendhan R</strong>
          <span>Full-Stack Engineer · Bengaluru</span>
        </a>
        <div className="journey__actions">
          <a href={links.resume} download="Moovendhan-R-Resume.pdf">Résumé</a>
          <a href={links.classic}>Classic view</a>
        </div>
      </div>

      <ol className="journey__rail" aria-label="Chapters">
        {chapters.map((c, i) => (
          <li key={c.id}>
            <button
              type="button"
              className={i === active ? 'is-active' : i < active ? 'is-past' : ''}
              onClick={() => jumpTo(i)}
              aria-label={c.title}
            >
              <span>{c.title}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="journey__story">
        {chapters.map((c, i) => (
          <article
            key={c.id}
            ref={(el) => { chapterRefs.current[i] = el; }}
            className={`journey__chapter journey__chapter--${c.id}`}
          >
            <p className="journey__label">{c.label}</p>
            {i === 0 ? <h1>{c.title}</h1> : <h2>{c.title}</h2>}
            <p className="journey__text">{c.text}</p>
            {c.id === 'contact' && (
              <div className="journey__contact">
                <div className="journey__chips">
                  {skills.map((s) => <span key={s}>{s}</span>)}
                </div>
                <div className="journey__buttons">
                  <a className="is-primary" href={links.email}>moovendhanr1011@gmail.com</a>
                  <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                  <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
                  <a href={links.resume} download="Moovendhan-R-Resume.pdf">Résumé</a>
                </div>
              </div>
            )}
          </article>
        ))}

        <div className="journey__cards" aria-label="Work at FinRight">
          {finrightCards.map((card, k) => (
            <div key={card.title} ref={(el) => { cardRefs.current[k] = el; }} className="journey__card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <small>{card.tags}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="journey__controls">
        <button type="button" onClick={() => setSound(!soundOn)} aria-pressed={soundOn}>
          <span className={soundOn ? 'is-on' : ''} aria-hidden="true">{soundOn ? '◉' : '○'}</span>
          Sound {soundOn ? 'on' : 'off'}
        </button>
        <button type="button" onClick={cycleGfx} title="Graphics quality: Auto, High or Low">
          GFX {gfxLabel}
        </button>
      </div>

      {showIntro && (
        <div className="journey__intro" role="dialog" aria-modal="true" aria-labelledby="journey-intro-title">
          <div className="journey__intro-box">
            <p id="journey-intro-title" className="journey__label">Before you ride</p>
            <p className="journey__intro-text">For the full experience, turn the sound on.</p>
            <button type="button" className="journey__intro-start" onClick={() => startRide(true)}>
              ◉ Start with sound
            </button>
            <button type="button" className="journey__intro-muted" onClick={() => startRide(false)}>
              continue muted
            </button>
          </div>
        </div>
      )}

      <div ref={hintRef} className="journey__hint">
        Scroll to ride
        <span aria-hidden="true">⌄</span>
      </div>

      <div className="journey__track" style={{ height: `${COUNT * 140}vh` }} />
    </div>
  );
};

export default Journey;
