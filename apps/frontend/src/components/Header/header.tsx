export const Header = ({ title }: { title: string }) => {
  return (
    <header className='m-0'>
      <h1 className='m-0 grid p-[10px] bg-alto dark:bg-jet'>{title}</h1>
    </header>
  );
};
