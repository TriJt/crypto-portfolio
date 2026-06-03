import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (el?: HTMLElement) => void;
        createTweet: (id: string, el: HTMLElement, options?: object) => Promise<HTMLElement>;
      };
    };
  }
}

export default function TweetEmbed({ tweetId }: { tweetId: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const render = () => {
      window.twttr?.widgets.createTweet(tweetId, ref.current!, {
        theme: 'light',       // hoặc 'dark'
        dnt: true,            // tắt tracking
        align: 'center',
        conversation: 'none', // ẩn reply thread
      });
    };

    // Nếu script đã load rồi thì render luôn
    if (window.twttr) {
      render();
      return;
    }

    // Load script lần đầu
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.onload = render;
    document.head.appendChild(script);
  }, [tweetId]);

  return (
    <div
      ref={ref}
      className="min-h-[200px] flex items-center justify-center"
    />
  );
}