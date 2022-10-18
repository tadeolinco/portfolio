import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

export const Timer = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [diff, setDiff] = useState<number | null>(null);
  const [canNotify, setCanNotify] = useState(false);

  useEffect(() => {
    Notification.requestPermission().then(() => {
      setCanNotify(true);
    });
  }, []);

  useEffect(() => {
    const startTimeLS = localStorage.getItem('workout@startTime');

    if (startTimeLS) {
      const realStartTime = new Date(startTimeLS);
      const now = new Date();
      if (now.getTime() - realStartTime.getTime() >= 1000 * 60) {
        localStorage.removeItem('workout@startTime');
      } else {
        setStartTime(new Date(startTimeLS));
      }
    }
  }, []);

  useEffect(() => {
    if (startTime) {
      localStorage.setItem('workout@startTime', startTime.toString());
    } else {
      localStorage.removeItem('workout@startTime');
    }
  }, [startTime]);

  const startTimeRef = useRef(startTime);

  useEffect(() => {
    startTimeRef.current = startTime;
  }, [startTime]);

  const timerRef = useRef(0);
  useEffect(() => {
    clearInterval(timerRef.current);
    if (startTime) {
      timerRef.current = window.setInterval(() => {
        const nextDiff =
          new Date().getTime() - (startTimeRef.current?.getTime() || 0);

        if (nextDiff >= 1000 * 60) {
          setDiff(null);
          setStartTime(null);
          clearInterval(timerRef.current);
          const bell = new Audio('/boxing-bell.mp3');
          bell.play();
        } else {
          setDiff(nextDiff);
        }
      }, 25);
    }
  }, [canNotify, startTime]);

  let minutes = diff ? Math.floor(diff / 1000 / 60) : 0;

  const _seconds = diff
    ? ((diff - minutes * 1000 * 60) / 1000).toFixed(2)
    : '00.00';

  const seconds = _seconds && _seconds.split('.')[0];
  const ms = _seconds && _seconds.split('.')[1];

  const diffRender =
    diff === null
      ? '00:00:00'
      : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
          2,
          '0',
        )}:${ms}`;
  return (
    <>
      <Head>
        <title>{diffRender}</title>
      </Head>
      <div className="flex items-center justify-center bg-green-300 p-4 text-4xl text-white">
        <div
          style={{
            fontFamily: 'monospace',
          }}
          onClick={() => {
            clearInterval(timerRef.current);
            setStartTime(new Date());
          }}
        >
          {diffRender}
        </div>
      </div>
    </>
  );
};
