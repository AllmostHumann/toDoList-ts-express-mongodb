interface FormProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}

export const FormComponent: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form
      className='flex flex-wrap mb-[10px] p-[20px] md:grid md:grid-cols-2 gap-[20px]'
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};
