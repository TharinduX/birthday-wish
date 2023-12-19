'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Caveat } from 'next/font/google'
import { Button } from './ui/button';

const caveat = Caveat({ subsets: ['latin'] })

const BirthdayCake = ({ wishData }: any) => {
  const flameRef = useRef<HTMLDivElement>(null);
  const flame2Ref = useRef<HTMLDivElement>(null);
  const flame3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [candlesBlownOut, setCandlesBlownOut] = useState(false);
  const [viewWish, setViewWish] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const handleClick = () => {
      if (flameRef.current && flame2Ref.current && flame3Ref.current && textRef.current) {
        flameRef.current.style.opacity = '0';
        flame2Ref.current.style.opacity = '0';
        flame3Ref.current.style.opacity = '0';
        textRef.current.style.top = '-90px';
        textRef.current.style.opacity = '1';
        setTimeout(() => {
          setCandlesBlownOut(true);
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }
        }, 2000);
      }
    };

    // Blow out candles when user blows into mic
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(stream => {
        setStream(stream);
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);

        javascriptNode.onaudioprocess = () => {
          const array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          let values = 0;

          const length = array.length;
          for (let i = 0; i < length; i++) {
            values += (array[i]);
          }

          const average = values / length;

          // Blow out candles if average is greater than a threshold
          if (average > 100) handleClick();
        };
      })
      .catch(err => console.log("The following error occurred: " + err.name));

  }, []);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleViewClick = () => {
    setViewWish(true);
    playAudio();
  };

  return (
    <div >
      {candlesBlownOut ? (
        viewWish ? (
          <div className="transition-opacity duration-2000">
            <div className='px-5 md:px-12'>
              <p className={`${caveat.className} text-center text-2xl md:text-4xl`}>
                {wishData.wish}
              </p>
              <p className={`${caveat.className} mt-10 flex justify-center md:justify-end text-xl md:text-3xl text-muted-foreground`}>From: {wishData.senderName}</p>
            </div>
          </div>
        ) : (
          <div className='mx-auto items-center text-center justify-center flex flex-col gap-2'>
            <p className='text-3xl font-semibold tracking-tight text-pink'>One more thing,</p>
            <p className='text-lg text-muted-foreground tracking-tight text-pink'>Click the button below to view your wish!</p>
            <Button variant='secondary' className='px-5 mt-5' onClick={handleViewClick}>View wish</Button>
          </div>
        )
      ) : (
        <div className=''>
          <div id="birthday-cake">
            <div className="cake">
              <div className="middle"></div>
              <div className="chocs"></div>
              <div className="top"></div>
            </div>
            <div className="candles">
              <div className="flame" ref={flameRef}></div>
              <div className="flame2" ref={flame2Ref}></div>
              <div className="flame3" ref={flame3Ref}></div>
              <div className="shadows"></div>
              <div className="text" ref={textRef}></div>
            </div>
          </div>
        </div>
      )}
      <audio ref={audioRef} src="/sounds/birthday.mp3" />
    </div >
  );
};

export default BirthdayCake;