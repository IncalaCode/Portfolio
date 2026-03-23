"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }

    // Check theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className={`w-full font-sans md:px-10 relative ${isDark ? 'bg-black' : 'bg-gradient-to-b from-[#FFF8DC] to-[#FFFACD]'}`}
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className={`text-lg md:text-4xl mb-4 max-w-4xl ${isDark ? 'text-white' : 'text-black'}`}>
          Hi 👋 Kaleb Here and  My Journey
        </h2>
        <p className={`text-sm md:text-base max-w-sm ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
          Building scalable systems and elegant solutions.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            id={item.title === "2026" ? "projects" : undefined}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className={`h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
                <div className={`h-4 w-4 rounded-full p-2 ${isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-200 border-neutral-400'} border relative`}>
                  <div className={`absolute inset-0 rounded-full ${isDark ? 'bg-yellow-500' : 'bg-orange-500'} opacity-0 animate-pulse-glow`} style={{
                    animation: 'pulse-glow 3s ease-in-out infinite'
                  }} />
                </div>
              </div>
              <h3 className={`hidden md:block text-xl md:pl-20 md:text-5xl font-bold ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className={`md:hidden block text-2xl mb-4 text-left font-bold ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className={`absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] ${isDark ? 'via-neutral-700' : 'via-neutral-400'}`}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-yellow-500 via-orange-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
