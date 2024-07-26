import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { thumnailsState } from '../states/thumnailsState';

type Args = {
  key: string;
  file: File | null;
};

export const useGetImageUrl = ({ key, file }: Args) => {
  const [thumnails, setThumnails] = useRecoilState(thumnailsState);

  useEffect(() => {
    if (!file) {
      return;
    }

    let reader: FileReader | null = new FileReader();
    reader.onloadend = () => {
      // base64のimageUrlを生成する。
      const base64 = reader && reader.result;
      if (base64 && typeof base64 === 'string') {
        setThumnails({ ...thumnails, [key]: base64 });
      }
    };
    reader.readAsDataURL(file);

    return () => {
      reader = null;
    };
  }, [file]);

  return file === null ? undefined : thumnails[key];
};
