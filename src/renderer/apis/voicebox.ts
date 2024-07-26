const VOICEBOX_URI = 'http://localhost:50021/';

export const fetch_voicebox = async (message: string, type: string) => {
  const res = await fetch(
    `${VOICEBOX_URI}audio_query?text=${message}&speaker=0`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const query = await res.json();

  const audioData = await fetch(
    `${VOICEBOX_URI}synthesis?speaker=0&enable_interrogative_upspeak=true`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'audio/wav',
      },
      body: JSON.stringify(query),
    },
  );

  return audioData.arrayBuffer();
};
