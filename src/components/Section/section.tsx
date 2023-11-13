interface SectionContent {
  title: string;
  body: React.ReactNode;
  extraHeaderContent?: React.ReactNode;
}

export const Section: React.FC<SectionContent> = ({
  title,
  extraHeaderContent,
  body,
}) => {
  return (
    <div className='mx-0 my-auto bg-white leading-normal'>
      <header
        className='m-0 p-[20px] grid bg-white border-solid border-b-[1px] 
      border-alto md:grid-cols-auto justify-between items-center grid-cols-1'
      >
        <h2 className='md:m-0 md:text-[25px] text-[20px] m-[3px]'>
          {title}
        </h2>
        {extraHeaderContent}
      </header>
      {body}
    </div>
  );
};
