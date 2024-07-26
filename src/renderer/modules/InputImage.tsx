import React, { InputHTMLAttributes, forwardRef } from 'react';

export type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: InputHTMLAttributes<HTMLInputElement>['id'];
};

const InputImage = forwardRef<HTMLInputElement, Props>(
  ({ onChange, id }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        type="file"
        accept="image/*"
        onChange={onChange}
        hidden
      />
    );
  },
);

export default InputImage;
