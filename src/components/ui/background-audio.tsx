"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const AUDIO_SRC = "/assets/Memory%20limitations%20in%20artificial%20intelligence.m4a";
const FADE_DURATION = 4; // seconds
const CROSSFADE_LEAD = 6; // seconds before end to start next track
const BASE_VOLUME = 0.1; // ~ -20 dB
const DUCK_VOLUME = 0.02; // ~ -35 dB
const DUCK_FADE_MS = 800;

export function BackgroundAudio() {
  const audioA = useRef<HTMLAudioElement | null>(null);
  const audioB = useRef<HTMLAudioElement | null>(null);
  const currentRef = useRef<"a" | "b">("a");
  const durationRef = useRef<number | null>(null);
  const [canPlay, setCanPlay] = useState(false);
  const rafRef = useRef<number | null>(null);
  const targetVolumeRef = useRef(BASE_VOLUME);
  const isMutedRef = useRef(false);

  // single global fade helper
  const fade = useMemo(
    () =>
      (audio: HTMLAudioElement | null, from: number, to: number, timeMs: number) => {
        if (!audio) return;
        const start = performance.now();
        const step = () => {
          const now = performance.now();
          const t = Math.min(1, (now - start) / timeMs);
          audio.volume = from + (to - from) * t;
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
    []
  );

  const getEffectiveTarget = () => (isMutedRef.current ? 0 : targetVolumeRef.current);

  // Expose start method globally so DisclaimerModal can call it directly
  useEffect(() => {
    const startAudio = () => {
      const active = currentRef.current === "a" ? audioA.current : audioB.current;
      if (!active) return;
      active.currentTime = 0;
      active
        .play()
        .then(() => {
          fade(active, 0, getEffectiveTarget(), FADE_DURATION * 1000);
          setCanPlay(true);
        })
        .catch(() => undefined);
    };

    (window as Window & { __startBackgroundAudio?: () => void }).__startBackgroundAudio = startAudio;
    (window as Window & { __setBackgroundMute?: (mute: boolean) => void }).__setBackgroundMute = (mute: boolean) => {
      isMutedRef.current = mute;
      const active = currentRef.current === "a" ? audioA.current : audioB.current;
      if (active) {
        fade(active, active.volume, getEffectiveTarget(), 300);
      }
    };
    (window as Window & { __getBackgroundMute?: () => boolean }).__getBackgroundMute = () => isMutedRef.current;

    return () => {
      delete (window as Window & { __startBackgroundAudio?: () => void }).__startBackgroundAudio;
      delete (window as Window & { __setBackgroundMute?: (mute: boolean) => void }).__setBackgroundMute;
      delete (window as Window & { __getBackgroundMute?: () => boolean }).__getBackgroundMute;
    };
  }, [fade]);

  useEffect(() => {
    const a = new Audio(AUDIO_SRC);
    const b = new Audio(AUDIO_SRC);
    a.loop = false;
    b.loop = false;
    a.preload = "auto";
    b.preload = "auto";
    a.volume = 0;
    b.volume = 0;
    audioA.current = a;
    audioB.current = b;

    const setupDuration = () => {
      const d = a.duration;
      if (Number.isFinite(d) && d > 0) {
        durationRef.current = d;
      }
    };

    a.addEventListener("loadedmetadata", setupDuration);
    b.addEventListener("loadedmetadata", setupDuration);

    const handleTimeUpdate = () => {
      const current = currentRef.current;
      const duration = durationRef.current;
      const active = current === "a" ? audioA.current : audioB.current;
      const idle = current === "a" ? audioB.current : audioA.current;
      if (!active || !idle || !duration) return;
      const timeLeft = duration - active.currentTime;
      if (timeLeft <= CROSSFADE_LEAD && idle.paused) {
        idle.currentTime = 0;
        idle.volume = 0;
        idle.play().catch(() => undefined);
        fade(idle, 0, getEffectiveTarget(), FADE_DURATION * 1000);
        fade(active, active.volume, 0, FADE_DURATION * 1000);
        currentRef.current = current === "a" ? "b" : "a";
      }
    };

    const tick = () => {
      handleTimeUpdate();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      a.pause();
      b.pause();
      a.src = "";
      b.src = "";
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [fade]);

  // Ducking logic: when any <video> plays, lower volume; restore when none playing
  useEffect(() => {
    let playingCount = 0;

    const applyDuck = () => {
      const target = playingCount > 0 ? DUCK_VOLUME : BASE_VOLUME;
      targetVolumeRef.current = target;
      const active = currentRef.current === "a" ? audioA.current : audioB.current;
      if (active) {
        fade(active, active.volume, getEffectiveTarget(), DUCK_FADE_MS);
      }
    };

    const onPlay = (ev: Event) => {
      if (ev.target instanceof HTMLVideoElement) {
        playingCount += 1;
        applyDuck();
      }
    };

    const onPause = (ev: Event) => {
      if (ev.target instanceof HTMLVideoElement) {
        playingCount = Math.max(0, playingCount - 1);
        applyDuck();
      }
    };

    document.addEventListener("play", onPlay, true);
    document.addEventListener("pause", onPause, true);
    document.addEventListener("ended", onPause, true);

    return () => {
      document.removeEventListener("play", onPlay, true);
      document.removeEventListener("pause", onPause, true);
      document.removeEventListener("ended", onPause, true);
    };
  }, [fade]);

  return null;
}
