import React, { ChangeEvent, Ref } from 'react';

interface InputProps {
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  ref?: Ref<HTMLInputElement>;
}

export const Input: React.FC<InputProps> = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ onChange, ref, placeholder }) => {
  return (
    <input
      ref={ref}
      placeholder={placeholder}
      onChange={onChange}
      className='border-solid border-[1px] p-[5px] border-silverChalice w-[100%]'
    />
  );
});
