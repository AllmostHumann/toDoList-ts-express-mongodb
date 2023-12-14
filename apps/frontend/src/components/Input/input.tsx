import React, { ChangeEvent, Ref } from 'react';

export interface InputProps {
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  ref?: Ref<HTMLInputElement>;
  className?: string;
  required?: boolean;
  type?: string;
}

export const Input: React.FC<InputProps> = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ onChange, placeholder, value, className, required, type }, inputRef) => {
  return (
    <input
      ref={inputRef}
      type={type}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
    />
  );
});
