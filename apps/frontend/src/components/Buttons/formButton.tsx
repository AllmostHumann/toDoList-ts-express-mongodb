interface ButtonProps {
  children: React.ReactNode;
  className: string;
}

export const FormButton = ({ children, className }: ButtonProps) => {
  return <button className={className}>{children}</button>;
};
