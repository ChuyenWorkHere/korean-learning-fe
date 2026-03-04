import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, Play, Pause, Volume2, VolumeX, MoreVertical, Trash2, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { fileService } from '../../../../services/fileService';
import { formatTime } from '../../../../utils/helpers';

const MediaPlayerBlock = ({ data, onChange }) => {
  // --- REFS & STATES ---
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // State này sẽ kích hoạt Modal
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  // --- AUDIO EVENT HANDLERS ---
  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // --- USER ACTIONS ---
  const togglePlay = () => {
    if (!audioRef.current || !data.audioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const changeSpeed = (rate) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
  };

  const handleSeek = (e) => {
    if (!audioRef.current || duration === 0) return;
    const progressBar = e.currentTarget;
    const clickX = e.clientX - progressBar.getBoundingClientRect().left;
    const percentage = clickX / progressBar.offsetWidth;

    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // --- FILE UPLOAD HANDLER ---
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Bật Modal Loading Lên
      setIsUploading(true);
      const toastId = toast.loading("Uploading audio to cloud...");

      try {
        const uploadedData = await fileService.uploadFile(file);

        onChange('audioUrl', uploadedData.url);
        onChange('fileName', uploadedData.fileName);

        setIsPlaying(false);
        setCurrentTime(0);

        toast.success("Tải file thành công!", { id: toastId });
      } catch (error) {
        console.error(error);
        toast.error("Lỗi khi tải file lên.", { id: toastId });
      } finally {
        // Tắt Modal Loading Dù Thành Công Hay Thất Bại
        setIsUploading(false);
        // Reset lại value của input type="file" để nếu upload lại cùng 1 file thì nó vẫn nhận
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveAudio = () => {
    if (isPlaying) audioRef.current?.pause();
    onChange('audioUrl', '');
    onChange('fileName', '');
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="p-8 relative">
      <audio
        ref={audioRef}
        src={data.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {!data.audioUrl ? (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className="border-2 border-dashed border-[#eecd2b]/30 rounded-xl p-10 flex flex-col items-center justify-center bg-[#f8f8f6] dark:bg-[#221f10]/30 hover:bg-[#eecd2b]/5 transition-colors cursor-pointer"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/*"
            className="hidden"
          />
          <div className="w-12 h-12 bg-[#eecd2b]/20 rounded-full flex items-center justify-center mb-4">
            <UploadCloud className="text-[#eecd2b] w-6 h-6" />
          </div>
          <p className="font-medium text-[#1b190d] dark:text-white">Upload Conversation Audio</p>
          <p className="text-xs opacity-50 mt-1">MP3, WAV, or OGG (Max 10MB)</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center px-2">
            <span className="text-xs font-semibold text-[#5e5836] dark:text-[#f0ede4]/60 truncate max-w-[70%]">
              {data.fileName || 'Uploaded Audio File'}
            </span>
            <button onClick={handleRemoveAudio} className="text-red-500 hover:text-red-600 flex items-center gap-1 text-xs font-bold transition-colors">
              <Trash2 className="w-3 h-3" /> Remove
            </button>
          </div>

          <div className="bg-[#f8f8f6] dark:bg-[#221f10]/50 p-6 rounded-xl border border-[#eecd2b]/10">
            <div className="flex items-center gap-4 md:gap-6">
              <button
                onClick={togglePlay}
                className="w-12 h-12 shrink-0 bg-[#eecd2b] rounded-full flex items-center justify-center text-[#221f10] shadow-lg shadow-[#eecd2b]/30 hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-[10px] font-bold mb-2 text-[#1b190d] dark:text-white">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-[#eecd2b] tracking-widest hidden sm:inline-block">PREVIEW MODE</span>
                  <span>{formatTime(duration)}</span>
                </div>

                <div
                  className="relative h-2 bg-[#eecd2b]/20 rounded-full overflow-hidden cursor-pointer group"
                  onClick={handleSeek}
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-[#eecd2b] transition-all duration-100 ease-linear"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-[#eecd2b] rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `calc(${progressPercent}% - 6px)` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-[#1b190d] dark:text-white shrink-0 relative">
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-[#eecd2b]/10 rounded-lg transition-colors"
                  title="Mute / Unmute"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className={`p-2 rounded-lg transition-colors flex items-center justify-center ${showSpeedMenu ? 'bg-[#eecd2b]/20 text-[#eecd2b]' : 'hover:bg-[#eecd2b]/10'}`}
                    title="Playback Speed"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {showSpeedMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowSpeedMenu(false)}></div>

                      <div className="absolute right-0 bottom-full mb-2 w-32 bg-white dark:bg-[#2d2916] rounded-xl shadow-xl border border-[#eecd2b]/20 overflow-hidden py-1 z-50 animate-in fade-in zoom-in-95">
                        <div className="px-3 py-1.5 text-[10px] font-bold text-[#5e5836] dark:text-[#f0ede4]/60 uppercase border-b border-[#eecd2b]/10">Speed</div>
                        {[0.5, 0.75, 1, 1.25, 1.5].map(rate => (
                          <button
                            key={rate}
                            onClick={() => changeSpeed(rate)}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-[#eecd2b]/10 text-[#1b190d] dark:text-white flex items-center justify-between transition-colors"
                          >
                            <span>{rate}x {rate === 1 && '(Normal)'}</span>
                            {playbackRate === rate && <Check className="w-3 h-3 text-[#eecd2b]" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL LOADING UPLOAD --- */}
      {isUploading && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#2d2916] p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 border border-[#eecd2b]/20 animate-in fade-in zoom-in-95">
            <Loader2 className="w-12 h-12 text-[#eecd2b] animate-spin mb-4" />
            <h3 className="text-lg font-bold text-[#1b190d] dark:text-white mb-2">
              Uploading Audio...
            </h3>
            <p className="text-sm text-center text-[#5e5836] dark:text-[#f0ede4]/70">
              Please wait while your file is securely uploaded to the cloud. This may take a few moments depending on the file size.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default MediaPlayerBlock;