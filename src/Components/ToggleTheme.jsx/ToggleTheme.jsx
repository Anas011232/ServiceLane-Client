import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <label className="swap swap-rotate cursor-pointer">
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />

      {/* sun icon */}
      <svg
        className="swap-on fill-current w-7 h-7 text-yellow-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64 17.64A9 9 0 0 1 12 3v1a8 8 0 0 0-6.36 13.64z"></path>
      </svg>

      {/* moon icon */}
      <svg
        className="swap-off fill-current w-7 h-7 text-gray-800"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21 12.79A9 9 0 0 1 12.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </label>
  );
};

export default ThemeToggle;
