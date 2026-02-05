import React, { useEffect, useState } from 'react';
import { EVENT_DATE_ISO } from '../constants';

interface CountdownProps {
  targetTime: string; // HH:MM
}

const Countdown: React.FC<CountdownProps> = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      
      // Construct the full target date
      // Combine EVENT_DATE_ISO with targetTime
      const targetString = `${EVENT_DATE_ISO}T${targetTime}:00`;
      const target = new Date(targetString);

      // Validate date
      if (isNaN(target.getTime())) {
        return "ERR:DATE";
      }

      let diff = target.getTime() - now.getTime();
      
      // Event passed?
      if (diff <= 0) {
        return "00:00:00";
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      // If more than 24 hours away (e.g. days > 0), show Days in Spanish
      if (days > 0) {
        return `${days} DÍAS ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`;
      }
      
      // If same day (D-Day), show HH:MM:SS
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <div className="font-mono text-neon-red text-lg md:text-xl tracking-widest bg-black/40 px-3 py-1 rounded border border-neon-red/30 shadow-[0_0_10px_rgba(255,0,60,0.2)] inline-block min-w-[120px] text-center">
      {timeLeft}
    </div>
  );
};

export default Countdown;