export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='my-0 mx-auto text-left max-w-[1000px] p-[20px] leading-normal'>
      {children}
    </main>
  );
};
