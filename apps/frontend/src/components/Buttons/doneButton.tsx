interface DoneButtonProps {
  children: string | React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DoneButton: React.FC<DoneButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button
      className='w-[25px] h-[25px] border-none cursor:pointer p-0 transition-none bg-japaneseLaurel hover:bg-limeade hover:border-[1px] hover:border-solid hover:border-black dark:bg-green-700 text-white'
      onClick={onClick}
    >
      {children}
    </button>
  );
};
