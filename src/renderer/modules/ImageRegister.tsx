import React, { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { thumnailsState } from '../states/thumnailsState';
import InputImage from './InputImage';
import { useGetImageUrl } from '../hooks/useGetImageUrl';

type Props = {
  person: string;
};

const ImageRegister = (props: Props) => {
  const FIELD_SIZE = 160;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [thumnails, setThumnails] = useRecoilState(thumnailsState);

  useEffect(() => {
    let newThumnails = { ...thumnails };
    newThumnails[props.person] = imageUrl;
    console.log(props.person, imageUrl, newThumnails);
    setThumnails(newThumnails);
  }, [imageFile]);

  // state (imageFile)が更新されたら、画像URLを作成する。
  const imageUrl = useGetImageUrl({ key: props.person, file: imageFile });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget?.files && e.currentTarget.files[0]) {
      const targetFile = e.currentTarget.files[0];
      setImageFile(targetFile);
    }
  };

  const handleClickCancelButton = () => {
    setImageFile(null);
    // <input />タグの値をリセット
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'relative' }}>
        <label
          htmlFor={`${props.person}InputImage`}
          style={{
            border: 'gray 2px dotted',
            width: FIELD_SIZE,
            height: FIELD_SIZE,
            display: 'flex',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            cursor: 'pointer',
            fontSize: 10,
          }}
        >
          {imageUrl && imageFile ? (
            <img
              src={imageUrl}
              alt="アップロード画像"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          ) : (
            'Image'
          )}
          {/* ダミーインプット: 見えない */}
          <InputImage
            ref={fileInputRef}
            id={`${props.person}InputImage`}
            onChange={handleFileChange}
          />
        </label>
        {imageUrl && imageFile ? (
          <div
            style={{
              width: 13,
              height: 13,
              borderRadius: 100,
              backgroundColor: 'red',
              fontSize: 10,
              textAlign: 'center',
              cursor: 'pointer',
              position: 'absolute',
              color: 'white',
              bottom: 0,
              right: 0,
            }}
            onClick={handleClickCancelButton}
          >
            X
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ImageRegister;
