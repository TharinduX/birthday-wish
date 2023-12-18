'use client'
import { useEffect, useState, CSSProperties } from 'react';
import Script from 'next/script';

const BalloonComponent = () => {
  const [balloons, setBalloons] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const balloons = createBalloons(10);
    setBalloons(balloons);
  }, []);

  const createBalloons = (num: number): JSX.Element[] => {
    let balloons: JSX.Element[] = [];
    for (let i = num; i > 0; i--) {
      const balloonStyles = getRandomStyles();
      balloons.push(<div key={i} className="balloon" style={balloonStyles} />);
    }
    return balloons;
  };

  const getRandomStyles = (): CSSProperties => {
    const r = random(255);
    const g = random(255);
    const b = random(255);
    const mt = random(200);
    const ml = random(50);
    const dur = random(5) + 5;
    return {
      backgroundColor: `rgba(${r},${g},${b},0.7)`,
      color: `rgba(${r},${g},${b},0.7)`,
      boxShadow: `inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7)`,
      margin: `${mt}px 0 0 ${ml}px`,
      animation: `float ${dur}s ease-in infinite`,
    };
  };

  const random = (num: number): number => {
    return Math.floor(Math.random() * num);
  };

  return (
    <div id="balloon-container" className='absolute -z-50'>
      {balloons}
    </div>
  );
};

export default BalloonComponent;
