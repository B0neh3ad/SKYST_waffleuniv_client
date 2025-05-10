'use client';

import { useRef } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';

type YouTubePlayerProps = {
  videoId: string;
  onPlayerReady: (player: YouTubePlayer) => void;
};

export default function YouTubePlayer({ videoId, onPlayerReady }: YouTubePlayerProps) {
  const onReady = (event: { target: YouTubePlayer }) => {
    onPlayerReady(event.target); // 부모 컴포넌트에서 제어할 수 있도록 player 전달
  };

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      mute: 0,
    },
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onReady} />;
}
