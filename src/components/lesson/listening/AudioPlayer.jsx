// src/components/listening/AudioPlayer.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Settings } from 'lucide-react';
import { formatTime } from '../../../utils/helpers';

// Hàm phụ trợ: Chuyển đổi giây sang định dạng Phút:Giây (Ví dụ: 65s -> 1:05)
// const formatTime = (timeInSeconds) => {
//   if (!timeInSeconds || isNaN(timeInSeconds)) return "0:00";
//   const minutes = Math.floor(timeInSeconds / 60);
//   const seconds = Math.floor(timeInSeconds % 60);
//   return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
// };

const AudioPlayer = ({ title, subtitle, audioUrl, onTimeUpdateCallback }) => {
  // --- REFS ---
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeBarRef = useRef(null);

  // --- STATES ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // --- AUDIO EVENT HANDLERS ---
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);
      // Gọi callback để báo thời gian ra Component cha
      if (onTimeUpdateCallback) {
        onTimeUpdateCallback(time);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (onTimeUpdateCallback) onTimeUpdateCallback(0);
  };

  // --- USER INTERACTION HANDLERS ---
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRewind = () => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, audioRef.current.currentTime - 5);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    if (onTimeUpdateCallback) onTimeUpdateCallback(newTime);
  };

  const toggleSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5]; // Các mốc tốc độ
    const nextSpeedIndex = (speeds.indexOf(speed) + 1) % speeds.length;
    const newSpeed = speeds[nextSpeedIndex];
    setSpeed(newSpeed);
    if (audioRef.current) audioRef.current.playbackRate = newSpeed;
    
  };

  // Xử lý tua nhạc (Seek) khi click vào thanh Progress
  const handleSeek = (e) => {
    if (!progressBarRef.current || !audioRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPositionX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickPositionX / rect.width));
    const newTime = percent * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    if (onTimeUpdateCallback) onTimeUpdateCallback(newTime);
  };

  // Xử lý đổi âm lượng khi click vào thanh Volume dọc
  const handleVolumeChange = (e) => {
    if (!volumeBarRef.current || !audioRef.current) return;
    const rect = volumeBarRef.current.getBoundingClientRect();
    // Vì thanh dọc: dưới cùng là 0, trên cùng là 1 (rect.bottom trừ đi điểm click)
    const clickPositionY = rect.bottom - e.clientY;
    const newVolume = Math.max(0, Math.min(1, clickPositionY / rect.height));
    
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    audioRef.current.volume = newVolume;
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume > 0 ? volume : 1;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  // Tính toán % để render giao diện
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercent = isMuted ? 0 : volume * 100;

  return (
    <div className="w-full bg-white dark:bg-[#1b190d] rounded-2xl shadow-sm border border-[#f3f1e7] dark:border-[#3a3621] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
      
      {/* THẺ AUDIO ẨN DƯỚI NỀN */}
      <audio 
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Play Button */}
      <button 
        onClick={togglePlay}
        className="flex shrink-0 items-center justify-center rounded-full w-16 h-16 md:w-20 md:h-20 bg-primary text-black hover:scale-105 transition-transform shadow-lg"
      >
        {isPlaying ? (
          <Pause className="w-8 h-8 md:w-10 md:h-10 fill-current" />
        ) : (
          <Play className="w-8 h-8 md:w-10 md:h-10 fill-current ml-1" />
        )}
      </button>

      {/* Controls & Progress */}
      <div className="flex-1 flex flex-col gap-3 w-full">
        
        {/* Top Row: Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <p className="text-lg md:text-xl font-bold leading-tight text-[#1b190d] dark:text-white">{title}</p>
            <p className="text-[#9a8d4c] text-sm font-medium">{subtitle}</p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleRewind}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-background-light dark:bg-[#3a3621] text-xs font-bold hover:bg-primary/20 transition-colors text-[#1b190d] dark:text-white"
            >
              <RotateCcw className="w-4 h-4" /> -5s
            </button>
            <button 
              onClick={toggleSpeed}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-background-light dark:bg-[#3a3621] text-xs font-bold hover:bg-primary/20 transition-colors text-[#1b190d] dark:text-white w-[60px] justify-center"
            >
              {speed}x
            </button>
          </div>
        </div>

        {/* Progress Bar (Đã tích hợp onClick handleSeek) */}
        <div className="pt-2">
          <div 
            ref={progressBarRef}
            onClick={handleSeek}
            className="group relative flex h-3 w-full cursor-pointer items-center rounded-full bg-[#f3f1e7] dark:bg-[#3a3621] hover:h-4 transition-all"
          >
            {/* Thanh màu vàng thay đổi width động theo % */}
            <div className="h-full rounded-full bg-primary relative" style={{ width: `${progressPercent}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary border-4 border-white dark:border-[#1b190d] shadow-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-[#9a8d4c] text-xs font-bold font-mono">
            <p>{formatTime(currentTime)}</p>
            <p>{formatTime(duration)}</p>
          </div>
        </div>
      </div>

      {/* Volume Control (Đã tích hợp onClick handleVolumeChange) */}
      <div className="hidden md:flex flex-col items-center gap-3 px-4 border-l border-[#f3f1e7] dark:border-[#3a3621]">
        <button onClick={toggleMute} className="text-[#9a8d4c] hover:text-primary transition-colors">
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
        <div 
          ref={volumeBarRef}
          onClick={handleVolumeChange}
          className="h-20 w-2 rounded-full bg-[#f3f1e7] dark:bg-[#3a3621] relative overflow-hidden cursor-pointer hover:w-3 transition-all"
        >
          {/* Cột màu vàng thay đổi height động theo % */}
          <div className="absolute bottom-0 w-full bg-primary rounded-full" style={{ height: `${volumePercent}%` }}></div>
        </div>
      </div>

    </div>
  );
};

export default AudioPlayer;