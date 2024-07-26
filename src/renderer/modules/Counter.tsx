import React, { useState, useEffect } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    // コンポーネントがアンマウントされたらクリア
    return () => {
      clearInterval(intervalId);
    };
  }, []); // 空の依存配列を指定して初回のみ実行

  return (
    <div>
      <h1>カウンタ: {count}</h1>
    </div>
  );
};
