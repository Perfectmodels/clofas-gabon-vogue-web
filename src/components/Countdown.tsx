
import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2025-11-16T00:00:00") - +new Date();
    let timeLeft: { [key: string]: number } = {};

    if (difference > 0) {
      timeLeft = {
        jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
        heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        secondes: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    timerComponents.push(
      // Ajout de la clé unique "key" pour corriger l'avertissement React
      <div key={interval} className="text-center">
        <div className="text-4xl md:text-6xl font-bold">{timeLeft[interval]}</div>
        <div className="text-sm uppercase tracking-wider">{interval}</div>
      </div>
    );
  });

  return (
    <div className="flex justify-center gap-4 md:gap-8 my-8">
      {timerComponents.length ? timerComponents : <span>L'événement est terminé !</span>}
    </div>
  );
};

export default Countdown;
