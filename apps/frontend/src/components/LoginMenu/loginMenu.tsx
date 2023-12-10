interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginMenu = ({ setShowModal }: ModalProps) => {
  return (
    <div className='h-full w-full leading-normal text-black dark:text-white grid place-items-center fixed backdrop-blur-sm !bg-transparent'>
      <div className='rounded-lg my-0 mx-auto text-left p-[5px] max-w-md md:w-full w-fit leading-normal'>
        <div className='p-5 bg-white rounded-lg'>
          <div className='flex justify-between bg-white'>
            <h3 className='md:text-[25px] text-[20px]'>Sign Up</h3>
            <button
              className='dark:bg-jet text-black dark:text-white'
              onClick={() => setShowModal(false)}
            >
              X
            </button>
          </div>
          <form className='mb-[10px] p-[10px] text-alto font-medium bg-white dark:bg-jet'>
            <div className='py-[10px] flex flex-col rounded-lg bg-white'>
              <label className='text-lg text-black dark:text-white'>
                Username
              </label>
              <input
                className='border-solid border-[1px] p-[5px] border-silverChalice w-[100%]'
                placeholder='AllmostHumann'
              />
            </div>
            <div className='py-[10px] flex flex-col rounded-lg bg-white'>
              <label className='text-lg text-black dark:text-white'>
                Email
              </label>
              <input
                className='border-solid border-[1px] p-[5px] border-silverChalice w-[100%]'
                placeholder='name@company.com'
              />
            </div>
            <div className='py-[10px] flex flex-col rounded-lg bg-white'>
              <label className='text-lg text-black dark:text-white'>
                Password
              </label>
              <input
                className='border-solid border-[1px] p-[5px] border-silverChalice w-[100%]'
                placeholder='**********'
              />
            </div>
          </form>
          <button className='border-none cursor-pointer p-[10px] w-[100%] hover:scale-[1.03] dark:bg-sherpaBlue bg-teal text-white'>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
