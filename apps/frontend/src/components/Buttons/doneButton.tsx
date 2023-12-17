interface DoneButtonProps {
  children: string | React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const DoneButton: React.FC<DoneButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
