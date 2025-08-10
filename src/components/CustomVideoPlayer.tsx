'use client';

import React, { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';

interface VideoQuality {
    label: string;
    src: string;
    resolution: string;
}

interface CustomVideoPlayerProps {
    src: string | VideoQuality[];
    poster?: string;
    className?: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
}

const CustomVideoPlayer = ({
    src,
    poster,
    className = '',
    autoPlay = false,
    muted = false,
    loop = false
}: CustomVideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(muted);
    const [showControls, setShowControls] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [showPlaybackMenu, setShowPlaybackMenu] = useState(false);
    const [isPiP, setIsPiP] = useState(false);
    const [qualities, setQualities] = useState<VideoQuality[]>([]);
    const [currentQuality, setCurrentQuality] = useState<VideoQuality | null>(null);
    const [showQualityMenu, setShowQualityMenu] = useState(false);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    const playbackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

    useEffect(() => {
        // Initialize quality options
        if (Array.isArray(src)) {
            setQualities(src);
            setCurrentQuality(src[0] || null);
        } else {
            const singleQuality: VideoQuality = {
                label: 'Auto',
                src: src,
                resolution: 'Auto'
            };
            setQualities([singleQuality]);
            setCurrentQuality(singleQuality);
        }
    }, [src]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => setCurrentTime(video.currentTime);
        const updateDuration = () => setDuration(video.duration);

        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', updateDuration);
        video.addEventListener('ended', () => setIsPlaying(false));

        return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('loadedmetadata', updateDuration);
            video.removeEventListener('ended', () => setIsPlaying(false));
        };
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current;
        const progress = progressRef.current;
        if (!video || !progress) return;

        const rect = progress.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * duration;
        video.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;

        const newVolume = parseFloat(e.target.value);
        video.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleFullscreen = () => {
        const container = videoRef.current?.parentElement;
        if (!container) return;

        if (!document.fullscreenElement) {
            container.requestFullscreen?.();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen?.();
            setIsFullscreen(false);
        }
    };

    const handlePlaybackSpeed = (speed: number) => {
        const video = videoRef.current;
        if (!video) return;

        video.playbackRate = speed;
        setPlaybackRate(speed);
        setShowPlaybackMenu(false);
    };

    const togglePictureInPicture = async () => {
        const video = videoRef.current;
        if (!video) return;

        try {
            if (!document.pictureInPictureElement) {
                await video.requestPictureInPicture();
                setIsPiP(true);
            } else {
                await document.exitPictureInPicture();
                setIsPiP(false);
            }
        } catch (error) {
            console.error('Picture-in-Picture not supported:', error);
        }
    };

    const handleQualityChange = (quality: VideoQuality) => {
        const video = videoRef.current;
        if (!video || !quality) return;

        const currentTime = video.currentTime;
        const wasPlaying = !video.paused;

        video.src = quality.src;
        video.load();

        video.addEventListener(
            'loadeddata',
            () => {
                video.currentTime = currentTime;
                if (wasPlaying) {
                    video.play();
                }
            },
            { once: true }
        );

        setCurrentQuality(quality);
        setShowQualityMenu(false);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div
            className={`group relative overflow-hidden rounded-lg bg-[#020202] ${className}`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}>
            <video
                ref={videoRef}
                src={currentQuality?.src || (typeof src === 'string' ? src : undefined)}
                poster={poster}
                autoPlay={autoPlay}
                muted={muted}
                loop={loop}
                className='h-full w-full object-cover'
                onClick={togglePlay}
            />

            {/* Play/Pause Overlay */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: !isPlaying ? 1 : 0,
                    scale: !isPlaying ? 1 : 0.8
                }}
                transition={{ duration: 0.2 }}
                className='pointer-events-none absolute inset-0 flex items-center justify-center'>
                <div className='rounded-full bg-[#F9F9F9]/90 p-6 backdrop-blur-sm'>
                    <PlayIcon className='h-12 w-12 text-[#020202]' />
                </div>
            </motion.div>

            {/* Controls */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: showControls ? 1 : 0,
                    y: showControls ? 0 : 20
                }}
                transition={{ duration: 0.3 }}
                className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-[#020202]/90 to-transparent p-4'>
                {/* Progress Bar */}
                <div
                    ref={progressRef}
                    className='group/progress mb-4 h-1 w-full cursor-pointer rounded-full bg-[#F9F9F9]/30'
                    onClick={handleProgressClick}>
                    <motion.div
                        className='relative h-full rounded-full bg-[#F9F9F9]'
                        initial={{ width: '0%' }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.1 }}>
                        <div className='absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 transform rounded-full bg-[#F9F9F9] opacity-0 transition-opacity group-hover/progress:opacity-100' />
                    </motion.div>
                </div>

                {/* Control Buttons */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                        {/* Play/Pause Button */}
                        <button
                            onClick={togglePlay}
                            className='min-h-0 p-1 text-[#F9F9F9] transition-colors hover:text-[#BDBDBD]'>
                            {isPlaying ? <PauseIcon className='h-6 w-6' /> : <PlayIcon className='h-6 w-6' />}
                        </button>

                        {/* Volume Controls */}
                        <div
                            className='group/volume flex items-center space-x-2'
                            onMouseEnter={() => setShowVolumeSlider(true)}
                            onMouseLeave={() => setShowVolumeSlider(false)}>
                            <button
                                onClick={toggleMute}
                                className='min-h-0 p-1 text-[#F9F9F9] transition-colors hover:text-[#BDBDBD]'>
                                {isMuted || volume === 0 ? (
                                    <VolumeOffIcon className='h-5 w-5' />
                                ) : (
                                    <VolumeOnIcon className='h-5 w-5' />
                                )}
                            </button>
                            <div className='relative flex items-center'>
                                <input
                                    type='range'
                                    min='0'
                                    max='1'
                                    step='0.05'
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className={`h-1 min-h-0 cursor-pointer appearance-none rounded-full bg-[#F9F9F9]/30 transition-all duration-200 ${
                                        showVolumeSlider ? 'w-20 opacity-100' : 'w-0 opacity-0'
                                    }`}
                                    style={{
                                        background: `linear-gradient(to right, #F9F9F9 0%, #F9F9F9 ${(isMuted ? 0 : volume) * 100}%, rgba(249, 249, 249, 0.3) ${(isMuted ? 0 : volume) * 100}%, rgba(249, 249, 249, 0.3) 100%)`
                                    }}
                                />
                            </div>
                        </div>

                        {/* Time Display */}
                        <div className='font-mono text-sm text-[#F9F9F9]'>
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                    </div>

                    <div className='flex items-center space-x-2'>
                        {/* Quality Selector */}
                        {qualities.length > 1 && (
                            <div className='relative'>
                                <button
                                    onClick={() => setShowQualityMenu(!showQualityMenu)}
                                    className='min-h-0 p-1 font-mono text-sm text-[#F9F9F9] transition-colors hover:text-[#BDBDBD]'>
                                    {currentQuality?.resolution || 'Auto'}
                                </button>

                                {showQualityMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className='absolute right-0 bottom-full mb-2 rounded-lg border border-[#333136] bg-[#020202]/95 p-2 backdrop-blur-sm'>
                                        {qualities.map((quality) => (
                                            <button
                                                key={quality.resolution}
                                                onClick={() => handleQualityChange(quality)}
                                                className={`block w-full rounded px-3 py-1 text-left font-mono text-sm whitespace-nowrap transition-colors ${
                                                    currentQuality?.resolution === quality.resolution
                                                        ? 'bg-[#333136] text-[#F9F9F9]'
                                                        : 'text-[#BDBDBD] hover:bg-[#333136]/50 hover:text-[#F9F9F9]'
                                                }`}>
                                                {quality.label} ({quality.resolution})
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {/* Playback Speed */}
                        <div className='relative'>
                            <button
                                onClick={() => setShowPlaybackMenu(!showPlaybackMenu)}
                                className='min-h-0 p-1 font-mono text-sm text-[#F9F9F9] transition-colors hover:text-[#BDBDBD]'>
                                {playbackRate}x
                            </button>

                            {showPlaybackMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className='absolute right-0 bottom-full mb-2 rounded-lg border border-[#333136] bg-[#020202]/95 p-2 backdrop-blur-sm'>
                                    {playbackSpeeds.map((speed) => (
                                        <button
                                            key={speed}
                                            onClick={() => handlePlaybackSpeed(speed)}
                                            className={`block w-full rounded px-3 py-1 text-left font-mono text-sm transition-colors ${
                                                playbackRate === speed
                                                    ? 'bg-[#333136] text-[#F9F9F9]'
                                                    : 'text-[#BDBDBD] hover:bg-[#333136]/50 hover:text-[#F9F9F9]'
                                            }`}>
                                            {speed}x
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Picture in Picture Button */}
                        <button
                            onClick={togglePictureInPicture}
                            className='min-h-0 p-1 text-[#F9F9F9] transition-colors hover:text-[#BDBDBD]'>
                            <PiPIcon className='h-4 w-4' />
                        </button>

                        {/* Fullscreen Button */}
                        <button
                            onClick={toggleFullscreen}
                            className='min-h-0 p-1 text-[#F9F9F9] transition-colors hover:text-[#BDBDBD]'>
                            {isFullscreen ? (
                                <ExitFullscreenIcon className='h-5 w-5' />
                            ) : (
                                <FullscreenIcon className='h-5 w-5' />
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// Custom Icons
const PlayIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill='currentColor' viewBox='0 0 24 24'>
        <path d='M8 5v14l11-7z' />
    </svg>
);

const PauseIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill='currentColor' viewBox='0 0 24 24'>
        <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
    </svg>
);

const VolumeOnIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill='currentColor' viewBox='0 0 24 24'>
        <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' />
    </svg>
);

const VolumeOffIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill='currentColor' viewBox='0 0 24 24'>
        <path d='M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z' />
    </svg>
);

const FullscreenIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill='currentColor' viewBox='0 0 24 24'>
        <path d='M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z' />
    </svg>
);

const ExitFullscreenIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill='currentColor' viewBox='0 0 24 24'>
        <path d='M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z' />
    </svg>
);

const PiPIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill='currentColor' viewBox='0 0 24 24'>
        <path d='M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z' />
        <path d='M14 10h4v2h-4z' />
    </svg>
);

export default CustomVideoPlayer;
