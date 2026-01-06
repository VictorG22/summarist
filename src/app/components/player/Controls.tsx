'use client'
import { useEffect, useState } from 'react';
import {
  BsFillFastForwardFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillRewindFill,
  BsSkipEndFill,
  BsSkipStartFill,
  BsShuffle,
  BsRepeat,
} from 'react-icons/bs';

export default function Controls ({audioSrc}: {audioSrc: string}) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  //   useEffect(() =>{
  //   if (isPlaying) {
  //     audioRef.current?.play();
  //   } else {
  //     audioRef.current?.pause();
  //   }
  // }, [isPlaying, audioRef]);

  return (
    <div className="flex gap-4 items-center">
      <audio src={audioSrc} />
      <button onClick={() => {}}>
        <BsSkipStartFill size={20} />
      </button>
      <button onClick={() => {}}>
        <BsFillRewindFill size={20} />
      </button>
      <button onClick={() => setIsPlaying((prev) => !prev)}>
        {isPlaying ? (
          <BsFillPauseFill size={30} />
        ) : (
          <BsFillPlayFill size={30} />
        )}
      </button>
      <button onClick={() => {}}>
        <BsFillFastForwardFill size={20} />
      </button>
      <button onClick={() => {}}>
        <BsSkipEndFill size={20} />
      </button>
      <button 
      >
        <BsShuffle
          size={20}
        />
      </button>
      <button>
        <BsRepeat
          size={20}
        />
      </button>
    </div>
  );
};