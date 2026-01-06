"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { CgPlayButton } from "react-icons/cg";
import { Book } from "@/app/types/Book";
import { BiPause } from "react-icons/bi";

export default function AudioPlayer({ data }: { data: Book }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const SEEK_OFFSET = 10;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error("Playback failed:", error);
      setIsPlaying(false);
    }
  };

  const rewind = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(0, audio.currentTime - SEEK_OFFSET);
  };

  const forward = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.min(
      audio.duration || Infinity,
      audio.currentTime + SEEK_OFFSET
    );
  };

  return (
    <div className="bg-[#032b41] flex max-md:flex-col max-md:py-4 max-md:gap-y-6 md:h-20 md:justify-between items-center px-12 text-white">
      {/* AUDIO ELEMENT */}
      <audio
        ref={audioRef}
        src={data.audioLink}
        preload="metadata"
        onLoadedMetadata={() => {
          if (!audioRef.current) return;
          setDuration(audioRef.current.duration);
        }}
        onTimeUpdate={() => {
          if (!audioRef.current) return;
          setCurrentTime(audioRef.current.currentTime);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={(e) => {
          console.error("Audio error:", e);
          setIsPlaying(false);
        }}
      />

      {/* METADATA */}
      <div className="flex justify-center gap-x-2 w-full md:max-w-[calc(100%/3)]">
        <Image
          src={data.imageLink}
          height={48}
          width={48}
          alt={`${data.title} cover`}
          className="min-w-12 my-auto"
        />
        <p className="flex flex-col justify-center">
          <span className="font-semibold">{data.title}</span>
          <span className="text-gray-300 text-sm">{data.author}</span>
        </p>
      </div>

      {/* CONTROLS */}
      <div className="flex gap-6 justify-center items-center w-full md:max-w-[calc(100%/3)]">
        <button onClick={rewind} aria-label="Rewind 10 seconds">
          <Image
            src="/back10.svg"
            alt=""
            width={28}
            height={28}
            className="invert"
          />
        </button>

        <button
          onClick={togglePlay}
          className="h-10 w-10 bg-white rounded-full flex items-center justify-center"
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? (
            <BiPause className="w-7 h-7 text-[#032b41]" />
          ) : (
            <CgPlayButton className="w-7 h-7 text-[#032b41]" />
          )}
        </button>

        <button onClick={forward} aria-label="Forward 10 seconds">
          <Image
            src="/forward10.svg"
            alt=""
            width={28}
            height={28}
            className="invert"
          />
        </button>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full md:max-w-[calc(100%/3)] flex justify-center items-center md:justify-end gap-2">
        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          step={0.1}
          onChange={(e) => {
            if (!audioRef.current) return;
            audioRef.current.currentTime = Number(e.target.value);
          }}
          className="flex-1 w-full max-w-75 h-1 appearance-none bg-gray-500/40 rounded-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, rgb(43,217,124) ${progressPercent}%, #ffffff33 ${progressPercent}%)`,
          }}
          aria-label="Audio progress"
          aria-valuemin={0}
          aria-valuemax={duration || 0}
          aria-valuenow={currentTime}
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
        />
        <p>{formatTime(duration)}</p>
      </div>
    </div>
  );
}
