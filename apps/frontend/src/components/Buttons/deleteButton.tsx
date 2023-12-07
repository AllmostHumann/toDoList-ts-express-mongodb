interface DeleteButtonProps {
  children: string | React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button
      className='w-[25px] h-[25px] border-none cursor:pointer p-0 transition-none bg-red-600 hover:bg-sunsetOrange hover:border-[1px] hover:border-solid hover:border-black dark:bg-red-700 text-white'
      onClick={onClick}
    >
      {children}
    </button>
  );
};
