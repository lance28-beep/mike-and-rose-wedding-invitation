import React from 'react';

type Message = {
  timestamp: string;
  name: string;
  message: string;
};

export default function MessageMarquee({
  messages,
  direction = 'left',
  speed = 20,
}: {
  messages: Message[];
  direction?: 'left' | 'right';
  speed?: number; // seconds for one loop
}) {
  if (!messages.length) return null;

  // Animation direction
  const marqueeClass =
    direction === 'left'
      ? 'animate-marquee-left'
      : 'animate-marquee-right';

  return (
    <div className="overflow-x-hidden py-2 sm:py-4 relative">
      <div className="relative w-full">
        <div
          className={`flex gap-3 sm:gap-6 ${marqueeClass} whitespace-nowrap`}
          tabIndex={0}
          aria-label="Guest messages"
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {/* Repeat 3x for seamless infinite effect */}
          {Array(3).fill(messages).flat().map((msg, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="inline-block min-w-[180px] max-w-[90vw] sm:min-w-[260px] sm:max-w-xs bg-white/95 backdrop-blur-lg rounded-xl shadow-lg border border-[#B76E79]/20 px-3 py-3 sm:px-6 sm:py-4 mx-1 sm:mx-2 transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl relative"
                style={{ minHeight: 110 }}
              >
                <div className="flex items-center gap-2 mb-1 justify-center">
                  <span className="font-semibold text-[#B91C1C] playfair-display text-base sm:text-lg text-center w-full truncate">{msg.name}</span>
                  <span className="absolute top-2 right-2 text-[#B76E79] opacity-40">💌</span>
                </div>
                <div className="text-[#B76E79] playfair-display text-sm sm:text-base leading-snug break-words text-center px-1">
                  <span className="text-2xl text-[#B76E79] font-serif align-top">“</span>
                  {msg.message}
                  <span className="text-2xl text-[#B76E79] font-serif align-bottom">”</span>
                </div>
              </div>
              <div className="text-xs text-[#B76E79] mt-1 text-center w-full">
                {msg.timestamp && new Date(msg.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.3333%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right linear infinite;
        }
      `}</style>
    </div>
  );
} 