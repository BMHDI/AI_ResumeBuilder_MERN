import React, { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch"
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";


function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Set the initial mode based on user preference
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    setIsDarkMode(theme === 'dark');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode and save preference
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-800 dark:text-gray-200">
        {isDarkMode ? <CiLight size={20} style={{right: '-32px', position: 'relative'}} /> : <MdOutlineDarkMode size={20} style={{zIndex: 1, right: '-50px', position: 'relative'}} />}
      </span>
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleDarkMode}
        // className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
      />
        {/* <span className="sr-only">Toggle Dark Mode</span> */}
     
    </div>
  );
}

export default DarkModeToggle;
