interface EditButtonProps {
  children: string | React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditButton: React.FC<EditButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button
      className='border-none cursor-pointer p-0 w-[30px] h-[30px] dark:bg-sherpaBlue bg-teal text-white'
      onClick={onClick}
    >
      {children}
    </button>
  );
};
