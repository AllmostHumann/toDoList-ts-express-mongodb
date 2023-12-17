interface ButtonProps {
  children: string | string[];
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  loading,
}) => {
  return (
    <button
      className='border-none md:my-0 transition-none hover:scale-100
      md:mx-[10px] p-0 m-[7px] hover:underline hover:cursor-pointer disabled:text-silver'
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {loading}
    </button>
  );
};
