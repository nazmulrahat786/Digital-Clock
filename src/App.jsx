import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [time, setTime] = useState(new Date());
  const [dark, setDark] = useState(false);
  const [is24Hour, setIs24Hour] = useState(false);
  const tickAudio = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      if (tickAudio.current) {
        tickAudio.current.currentTime = 0;
        tickAudio.current.play().catch(() => {});
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !is24Hour,
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hour = time.getHours();
  let greeting = "";
  let bgGradient = "";

  if (hour >= 5 && hour < 12) {
    greeting = "☀️ Good Morning";
    bgGradient = "from-amber-200 via-sky-300 to-blue-400";
  } else if (hour >= 12 && hour < 18) {
    greeting = "🌞 Good Afternoon";
    bgGradient = "from-blue-300 via-indigo-400 to-purple-500";
  } else {
    greeting = "🌙 Good Evening";
    bgGradient = "from-indigo-900 via-purple-900 to-gray-800";
  }

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen transition-all duration-700 bg-gradient-to-br ${bgGradient} ${
        dark ? "text-white" : "text-gray-900"
      }`}
    >
      <audio
        ref={tickAudio}
        src="https://cdn.pixabay.com/download/audio/2023/03/13/audio_4f3f8c7d8e.mp3"
        preload="auto"
      />

      <div
        className={`relative backdrop-blur-lg bg-white/20 shadow-2xl rounded-3xl px-6 sm:px-12 py-8 sm:py-10 border border-white/30 text-center w-11/12 max-w-3xl ${
          dark ? "bg-black/30 border-gray-700" : ""
        }`}
      >
        <h1 className="text-3xl sm:text-5xl font-semibold mb-3 sm:mb-4">{greeting}</h1>

        <h2
          className="text-5xl sm:text-8xl font-mono tracking-widest mb-2 sm:mb-3 select-none transition-all duration-300"
          style={{
            textShadow: dark
              ? "0 0 25px rgba(255,255,255,0.4)"
              : "0 0 20px rgba(0,0,0,0.3)",
          }}
        >
          {formattedTime}
        </h2>

        <p className="text-sm sm:text-lg opacity-90 mb-4 sm:mb-6">{formattedDate}</p>

        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
          <button
            onClick={() => setDark(!dark)}
            className="px-4 sm:px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-md text-sm sm:text-base"
          >
            {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <button
            onClick={() => setIs24Hour(!is24Hour)}
            className="px-4 sm:px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-all shadow-md text-sm sm:text-base"
          >
            {is24Hour ? "Switch to 12h" : "Switch to 24h"}
          </button>
        </div>
      </div>

      <p className="mt-6 sm:mt-8 text-xs sm:text-sm opacity-70 font-light text-center text-white px-4">
        Developed by{" "}
        <span className="font-semibold text-white">
          <a href="https://nazmul-haque-rahat.web.app/">Nazmul Haque Rahat</a>
        </span>
      </p>
    </div>
  );
}
