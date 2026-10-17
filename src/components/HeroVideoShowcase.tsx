import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  X,
  Clock,
  Droplets,
  Layers,
  Flame,
  Snowflake,
  ShieldCheck,
  Music
} from 'lucide-react';

import cowayNeoKitchenImg from '../assets/images/coway_neo_kitchen_1792265576318.jpg';
import cowayDispensePourImg from '../assets/images/coway_dispense_pour_1792265590650.jpg';
import cowayKitchenLifeImg from '../assets/images/coway_kitchen_life_1792265605478.jpg';
import cowayPromoBgm from '../assets/audio/coway_promo_bgm.mp3';

interface HeroVideoShowcaseProps {
  onSelectProduct: (productId: string) => void;
  onConsultSeller?: () => void;
}

interface Scene {
  id: number;
  timeRange: string;
  duration: number; // in seconds
  title: string;
  subtitle: string;
  tagline: string;
  featureBadge: string;
  image: string;
  fallback: string;
  specs: string[];
}

const SCENES: Scene[] = [
  {
    id: 1,
    timeRange: '00:00 - 00:05',
    duration: 5,
    title: 'Desain Minimalis Dapur Modern',
    subtitle: 'Estetika Elegan Scandinavian di Kitchen Island',
    tagline: 'Perpaduan sempurna unit Coway Neo Plus dengan interior dapur bersih dan modern.',
    featureBadge: 'Desain Kompak 26cm',
    image: cowayNeoKitchenImg,
    fallback: '/images/coway_neo_kitchen.jpg',
    specs: ['Bodi ramping modern', 'Bebas tumpahan galon', 'Hemat ruang countertop']
  },
  {
    id: 2,
    timeRange: '00:05 - 00:10',
    duration: 5,
    title: 'Dispenser RO 3 Suhu Instan',
    subtitle: 'Air Dingin, Panas & Normal Sekali Sentuh',
    tagline: 'Aliran air RO murni bersertifikasi Halal & WQA Gold Seal dengan kontrol presisi.',
    featureBadge: '3 Pengaturan Suhu',
    image: cowayDispensePourImg,
    fallback: '/images/coway_dispense_pour.jpg',
    specs: ['Sistem RO 4 Tahap', 'Kunci pengaman air panas', 'Tuas sekali putar']
  },
  {
    id: 3,
    timeRange: '00:10 - 00:15',
    duration: 5,
    title: 'Hidrasi Segar & Higienis Keluarga',
    subtitle: 'Air Minum Terbaik untuk Tumbuh Kembang Sehat',
    tagline: 'Tenang dan praktis setiap hari bersama perlindungan servis rutin Cody setiap 4 bulan.',
    featureBadge: 'Kapasitas Tangki 5.8 Liter',
    image: cowayKitchenLifeImg,
    fallback: '/images/coway_kitchen_life.jpg',
    specs: ['Tangki kedap udara', 'Eco sensor hemat energi', 'Gratis ganti filter 5 thn']
  }
];

export const HeroVideoShowcase: React.FC<HeroVideoShowcaseProps> = ({
  onSelectProduct,
  onConsultSeller
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const TOTAL_DURATION = 15; // 15 seconds promotional video showcase

  // Determine active scene based on current playback second
  const activeSceneIndex = Math.min(
    Math.floor((currentSeconds / TOTAL_DURATION) * SCENES.length),
    SCENES.length - 1
  );
  const currentScene = SCENES[activeSceneIndex];

  // Playback timer ticker (runs at ~100ms interval for fluid progress)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSeconds((prev) => {
          const next = prev + 0.1;
          if (next >= TOTAL_DURATION) {
            // Seamless loop restart
            if (audioRef.current && !isMuted) {
              audioRef.current.currentTime = 0;
            }
            return 0;
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isMuted]);

  // Synchronize audio playback with isPlaying and isMuted states
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isMuted && isPlaying) {
      if (Math.abs(audio.currentTime - (currentSeconds % TOTAL_DURATION)) > 0.5) {
        audio.currentTime = currentSeconds % TOTAL_DURATION;
      }
      audio.play().catch(() => {
        // Browser autoplay policy might require direct interaction
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, isMuted]);

  const handleTogglePlay = () => {
    setIsPlaying((prev) => {
      const nextPlaying = !prev;
      if (audioRef.current) {
        if (nextPlaying && !isMuted) {
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.pause();
        }
      }
      return nextPlaying;
    });
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => {
      const nextMuted = !prev;
      if (audioRef.current) {
        if (!nextMuted) {
          audioRef.current.currentTime = currentSeconds % TOTAL_DURATION;
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.pause();
        }
      }
      return nextMuted;
    });
  };

  const handleSeekScene = (sceneIndex: number) => {
    const targetSeconds = sceneIndex * 5;
    setCurrentSeconds(targetSeconds);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = targetSeconds;
      if (!isMuted) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const handleRestart = () => {
    setCurrentSeconds(0);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (!isMuted) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  // Image fallback handler
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl: string) => {
    const target = e.currentTarget;
    if (!target.dataset.triedPublic) {
      target.dataset.triedPublic = '1';
      target.src = fallbackUrl;
    }
  };

  const progressPercent = Math.min((currentSeconds / TOTAL_DURATION) * 100, 100);
  const formattedTime = `00:${Math.floor(currentSeconds).toString().padStart(2, '0')}`;

  return (
    <>
      {/* Background Music Audio Element */}
      <audio
        ref={audioRef}
        src={cowayPromoBgm}
        preload="auto"
        loop
        onError={(e) => {
          const el = e.currentTarget;
          if (!el.dataset.triedPublic) {
            el.dataset.triedPublic = '1';
            el.src = '/audio/coway_promo_bgm.mp3';
          }
        }}
      />

      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-sky-300/80 bg-slate-950 group select-none">
        {/* Main 16:9 Video Canvas Frame */}
        <div className="relative w-full aspect-16/10 sm:aspect-16/11 overflow-hidden bg-slate-900">
          {/* Visual Scene Transitions with Cinematic Pan effect */}
          {SCENES.map((scene, idx) => {
            const isActive = idx === activeSceneIndex;
            return (
              <div
                key={scene.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={scene.image}
                  alt={scene.title}
                  onError={(e) => handleImgError(e, scene.fallback)}
                  className={`w-full h-full object-cover object-center transition-transform duration-7000 ease-linear ${
                    isActive && isPlaying ? 'scale-105' : 'scale-100'
                  }`}
                />
              </div>
            );
          })}

          {/* Cinematic Vignette & Lighting Gradients */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-slate-950/60 pointer-events-none" />

          {/* Top Video Header Overlay */}
          <div className="absolute top-0 inset-x-0 z-30 p-3.5 sm:p-5 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-xs font-semibold text-sky-200 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                Coway Neo Plus di Dapur Modern
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Catchy Music Toggle Button */}
              <button
                type="button"
                onClick={handleToggleMute}
                title={isMuted ? 'Nyalakan Musik Video Menarik' : 'Matikan Musik Video'}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs backdrop-blur-md transition-all cursor-pointer ${
                  !isMuted
                    ? 'bg-emerald-500/25 hover:bg-emerald-500/35 border-emerald-400/60 text-emerald-300 shadow-lg shadow-emerald-500/20'
                    : 'bg-black/60 hover:bg-black/80 border-white/20 text-slate-200 hover:text-white'
                }`}
              >
                {!isMuted ? (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="hidden sm:inline font-semibold">Musik ON</span>
                    {/* Animated Music Equalizer Bars */}
                    <span className="flex items-end gap-0.5 h-3 ml-0.5">
                      <span className="w-0.5 bg-emerald-400 h-2 animate-bounce" />
                      <span className="w-0.5 bg-emerald-300 h-3 animate-bounce [animation-delay:150ms]" />
                      <span className="w-0.5 bg-emerald-400 h-1.5 animate-bounce [animation-delay:300ms]" />
                    </span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-slate-300" />
                    <span className="hidden sm:inline text-slate-300 font-medium">Nyalakan Musik</span>
                  </>
                )}
              </button>

              {/* Theater Fullscreen Expand */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                title="Buka Video Layar Penuh"
                className="p-2 rounded-xl bg-black/50 hover:bg-black/70 border border-white/20 text-white backdrop-blur-md transition-colors cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Floating 'Nyalakan Musik' Pill (When Muted and Playing) */}
          {isMuted && isPlaying && (
            <div className="absolute top-16 right-4 z-30 animate-pulse">
              <button
                type="button"
                onClick={handleToggleMute}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-500/90 to-blue-600/90 hover:from-sky-500 hover:to-blue-500 text-white text-[11px] font-semibold shadow-lg backdrop-blur-md border border-white/30 cursor-pointer transition-transform hover:scale-105"
              >
                <Music className="w-3.5 h-3.5 text-white" />
                <span>Nyalakan Musik 🎵</span>
              </button>
            </div>
          )}

          {/* Central Play/Pause Floating Action Button */}
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <button
              type="button"
              onClick={handleTogglePlay}
              className={`p-4 rounded-full bg-sky-600/90 hover:bg-sky-500 text-white shadow-2xl backdrop-blur-md pointer-events-auto transform transition-all hover:scale-110 active:scale-95 border-2 border-white/40 cursor-pointer ${
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100 scale-105'
              }`}
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
            </button>
          </div>

          {/* Bottom Video Info & Dynamic Captions */}
          <div className="absolute bottom-12 inset-x-0 z-30 px-4 sm:px-6 text-white pointer-events-none">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-sky-600/80 text-[11px] font-semibold tracking-wide text-white mb-1 shadow-xs">
              <span>Scene 0{currentScene.id} / 03</span>
              <span className="text-sky-200">•</span>
              <span>{currentScene.featureBadge}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-tight drop-shadow-md">
              {currentScene.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 line-clamp-1 drop-shadow-sm mt-0.5">
              {currentScene.tagline}
            </p>
          </div>

          {/* Timeline & Player Bar */}
          <div className="absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 sm:px-4 sm:pb-3 pt-4">
            {/* Segmented Timeline Progress */}
            <div className="flex items-center gap-1.5 mb-2.5">
              {SCENES.map((s, idx) => {
                const isPast = idx < activeSceneIndex;
                const isCurrent = idx === activeSceneIndex;
                const sceneProgress = isCurrent
                  ? ((currentSeconds - idx * 5) / 5) * 100
                  : isPast
                  ? 100
                  : 0;

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSeekScene(idx)}
                    className="flex-1 h-1.5 bg-white/20 hover:bg-white/35 rounded-full overflow-hidden relative cursor-pointer transition-colors"
                    title={`Lompat ke Scene ${s.id}: ${s.title}`}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-sky-400 to-sky-300 transition-all duration-100 ease-linear rounded-full"
                      style={{ width: `${Math.min(100, Math.max(0, sceneProgress))}%` }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls Strip */}
            <div className="flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="flex items-center gap-1.5 text-white hover:text-sky-300 font-medium cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span className="hidden sm:inline">Jeda</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span className="hidden sm:inline">Putar</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="p-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Ulang dari awal"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-sky-200">
                  {formattedTime} / 00:{TOTAL_DURATION}
                </span>
              </div>

              {/* Scene Quick Pickers */}
              <div className="hidden sm:flex items-center gap-1 text-[11px]">
                {SCENES.map((scene, idx) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => handleSeekScene(idx)}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      idx === activeSceneIndex
                        ? 'bg-sky-500/80 text-white font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    0{scene.id}
                  </button>
                ))}
              </div>

              {/* Quick Order Action */}
              <button
                type="button"
                onClick={() => onSelectProduct('neo-plus')}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold text-[11px] shadow-sm transition-all cursor-pointer"
              >
                <span>Pesan Neo Plus</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner Details in Hero Card */}
        <div className="bg-slate-900 border-t border-white/10 p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-sky-400">
                  Produk Terpopuler #1
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-950 text-sky-300 border border-sky-700/60 font-semibold">
                  Sewa Beli
                </span>
              </div>
              <h4 className="text-base font-bold font-display text-white mt-0.5">
                Coway Neo Plus CHP-264L
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Sistem RO 3 Suhu: Panas, Dingin & Normal • Bebas Angkat Galon
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 line-through">Rp 320.000/bln</div>
              <div className="text-lg sm:text-xl font-extrabold text-white font-display tabular-nums">
                Rp 250.000<span className="text-xs font-normal text-slate-300">/bln</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
              Gratis Servis & Filter Cody Berkala 5 Tahun
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-sky-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
              >
                Detail Video & Spek &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Cinematic Theater Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-sky-500/30">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-slate-950/70">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  <Play className="w-4 h-4 fill-sky-400" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    Video Promosi Coway Neo Plus
                  </h3>
                  <p className="text-xs text-slate-400">
                    Showcase Eksklusif Desain Dapur Modern & Kualitas Pemurnian Air RO
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Video Player View */}
            <div className="relative aspect-16/9 w-full bg-black overflow-hidden">
              <img
                src={currentScene.image}
                alt={currentScene.title}
                onError={(e) => handleImgError(e, currentScene.fallback)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-black/60" />

              {/* Central Large Play/Pause */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="p-5 rounded-full bg-sky-600/90 hover:bg-sky-500 text-white shadow-2xl backdrop-blur-md transition-all hover:scale-110 cursor-pointer border border-white/30"
                >
                  {isPlaying ? <Pause className="w-7 h-7 fill-white" /> : <Play className="w-7 h-7 fill-white ml-1" />}
                </button>
              </div>

              {/* Progress and Caption in Modal */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="flex items-center gap-2 mb-3">
                  {SCENES.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSeekScene(idx)}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                        idx === activeSceneIndex
                          ? 'bg-sky-600 text-white font-semibold shadow-sm'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20'
                      }`}
                    >
                      <div className="text-[10px] uppercase tracking-wider text-sky-200">Scene 0{s.id}</div>
                      <div className="truncate font-medium">{s.title}</div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sky-300">{formattedTime} / 00:{TOTAL_DURATION}</span>
                    <span>•</span>
                    <span className="text-white font-medium">{currentScene.subtitle}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      !isMuted
                        ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300'
                        : 'bg-white/10 border-white/15 text-slate-300 hover:text-white'
                    }`}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />}
                    <span>{isMuted ? 'Nyalakan Musik' : 'Musik ON 🎵'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Highlights & Direct CTA */}
            <div className="p-5 sm:p-6 bg-slate-900 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-white/5">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs mb-1">
                  <Snowflake className="w-4 h-4" />
                  <span>Air Dingin 2.3 Liter</span>
                </div>
                <p className="text-xs text-slate-300">
                  Segar seketika kapan pun tanpa perlu es batu atau menunggu lemari es.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-white/5">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
                  <Flame className="w-4 h-4" />
                  <span>Air Panas 1.0 Liter</span>
                </div>
                <p className="text-xs text-slate-300">
                  Suhu 90°C siap seduh kopi, teh, dan susu formula dengan child safety lock.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-white/5">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
                  <Droplets className="w-4 h-4" />
                  <span>Air Normal 2.5 Liter</span>
                </div>
                <p className="text-xs text-slate-300">
                  Total tangki 5.8 Liter kedap udara menjaga kemurnian dari debu dan bakteri.
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-slate-950 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
              <div className="text-xs text-slate-400">
                Promo Bulanan: <strong className="text-white text-sm">Rp 250.000/bln</strong> (Bebas Biaya Registrasi & Pemasangan)
              </div>
              <div className="flex items-center gap-2.5">
                {onConsultSeller && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      onConsultSeller();
                    }}
                    className="px-4 py-2.5 rounded-xl border border-sky-400/40 text-sky-300 hover:bg-sky-500/10 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Konsultasi Produk
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    onSelectProduct('neo-plus');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Daftar Order Neo Plus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
