import React, { ChangeEvent, Ref } from 'react';

export interface InputProps {
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  ref?: Ref<HTMLInputElement>;
  className?: string;
}

export const Input: React.FC<InputProps> = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ onChange, placeholder, value, className }, inputRef) => {
  return (
    <input
      ref={inputRef}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
    />
  );
});
