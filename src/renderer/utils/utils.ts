export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const voicebox_res_play = (arrayBuffer: ArrayBuffer) => {
  // Blobに変換
  const audioBlob = new Blob([arrayBuffer], { type: 'audio/x-wav' });
  // URLに変換
  const audioUrl = URL.createObjectURL(audioBlob);
  // 音声作成
  const audio = new Audio(audioUrl);
  // 音量[0-1]設定
  audio.volume = 1;

  // Promiseを返す
  return new Promise<void>((resolve) => {
    // 再生
    audio.play();
    // 再生終了後にURLを解放
    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
      resolve(); // Promiseを解決して終了
    };
  });
};
