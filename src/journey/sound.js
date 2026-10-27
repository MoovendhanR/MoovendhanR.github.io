// All sound is generated live with the Web Audio API: no audio files to load.
// Layers: engine hum and road/wind noise that follow riding speed, plus one
// ambience per kind of place (night crickets, dawn birds, city hum, neon pad).

const AMBIENCE_BY_CHAPTER = ['crickets', 'birds', 'birds', 'city', 'city', 'city', 'neon', 'crickets'];
const ENGINE_BY_VEHICLE = { bicycle: 0, 'scooter-crate': 1, scooter: 1, motorbike: 1.35 };

function noiseBuffer(ctx, seconds) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  return buffer;
}

export function createSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;

  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  const loopNoise = (filterType, frequency, q) => {
    const source = ctx.createBufferSource();
    source.buffer = noiseBuffer(ctx, 2);
    source.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = frequency;
    filter.Q.value = q;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    source.connect(filter).connect(gain).connect(master);
    source.start();
    return { filter, gain };
  };

  // Engine: two detuned oscillators through a low-pass filter.
  const engineGain = ctx.createGain();
  engineGain.gain.value = 0;
  const engineFilter = ctx.createBiquadFilter();
  engineFilter.type = 'lowpass';
  engineFilter.frequency.value = 420;
  const engineOscillators = [['sawtooth', 0], ['square', 7]].map(([type, detune]) => {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = 48;
    osc.detune.value = detune;
    osc.connect(engineFilter);
    osc.start();
    return osc;
  });
  engineFilter.connect(engineGain).connect(master);

  const road = loopNoise('bandpass', 700, 0.6);
  const wind = loopNoise('highpass', 2200, 0.3);
  const cityHum = loopNoise('lowpass', 180, 0.7);

  // Crickets: a high tone chopped into fast pulses.
  const cricketGain = ctx.createGain();
  cricketGain.gain.value = 0;
  const cricket = ctx.createOscillator();
  cricket.frequency.value = 4400;
  const cricketPulse = ctx.createGain();
  const pulseLfo = ctx.createOscillator();
  pulseLfo.type = 'square';
  pulseLfo.frequency.value = 28;
  const pulseDepth = ctx.createGain();
  pulseDepth.gain.value = 0.5;
  pulseLfo.connect(pulseDepth).connect(cricketPulse.gain);
  cricketPulse.gain.value = 0.5;
  cricket.connect(cricketPulse).connect(cricketGain).connect(master);
  cricket.start();
  pulseLfo.start();

  // Neon pad: a soft minor chord.
  const padGain = ctx.createGain();
  padGain.gain.value = 0;
  const padFilter = ctx.createBiquadFilter();
  padFilter.type = 'lowpass';
  padFilter.frequency.value = 900;
  [110, 130.81, 164.81, 220].forEach((f, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = f;
    osc.detune.value = i % 2 ? 6 : -6;
    osc.connect(padFilter);
    osc.start();
  });
  padFilter.connect(padGain).connect(master);

  // Birds: short rising chirps scheduled at random while the dawn ambience is up.
  let birdLevel = 0;
  let nextChirp = 0;
  const chirp = (when) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const base = 2200 + Math.random() * 1800;
    osc.frequency.setValueAtTime(base, when);
    osc.frequency.exponentialRampToValueAtTime(base * 1.6, when + 0.09);
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(0.05 * birdLevel + 0.0001, when + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.12);
    osc.connect(gain).connect(master);
    osc.start(when);
    osc.stop(when + 0.14);
  };

  const ambience = { crickets: 0, birds: 0, city: 0, neon: 0 };
  let muted = true;

  const glide = (param, value, time = 0.25) => param.setTargetAtTime(value, ctx.currentTime, time);

  function update({ speed, progress, vehicle }) {
    if (muted) return;
    const engine = ENGINE_BY_VEHICLE[vehicle] ?? 1;
    const s = Math.min(1, speed);

    engineOscillators.forEach((osc) => glide(osc.frequency, (42 + s * 70) * (engine || 1), 0.15));
    glide(engineFilter.frequency, 300 + s * 900, 0.2);
    glide(engineGain.gain, engine ? (0.025 + s * 0.06) * engine : 0, 0.2);
    glide(road.gain.gain, 0.008 + s * 0.05);
    glide(road.filter.frequency, 400 + s * 900);
    glide(wind.gain.gain, 0.004 + s * 0.035);

    // Blend ambience between chapters so places fade into each other.
    const f = Math.max(0, progress * AMBIENCE_BY_CHAPTER.length - 0.5);
    const i = Math.min(AMBIENCE_BY_CHAPTER.length - 1, Math.floor(f));
    const j = Math.min(AMBIENCE_BY_CHAPTER.length - 1, i + 1);
    const t = Math.min(1, f - i);
    Object.keys(ambience).forEach((k) => { ambience[k] = 0; });
    ambience[AMBIENCE_BY_CHAPTER[i]] += 1 - t;
    ambience[AMBIENCE_BY_CHAPTER[j]] += t;

    glide(cricketGain.gain, ambience.crickets * 0.012, 0.6);
    glide(cityHum.gain.gain, ambience.city * 0.09 + ambience.neon * 0.04, 0.6);
    glide(padGain.gain, ambience.neon * 0.035, 0.8);
    birdLevel = ambience.birds;
    if (birdLevel > 0.15 && ctx.currentTime > nextChirp) {
      const burst = 2 + Math.floor(Math.random() * 3);
      for (let n = 0; n < burst; n += 1) chirp(ctx.currentTime + n * 0.16);
      nextChirp = ctx.currentTime + 0.8 + Math.random() * 2.2;
    }
  }

  function setMuted(value) {
    muted = value;
    if (!value && ctx.state === 'suspended') ctx.resume();
    glide(master.gain, value ? 0 : 0.9, 0.3);
  }

  function dispose() {
    ctx.close();
  }

  return { update, setMuted, dispose };
}
