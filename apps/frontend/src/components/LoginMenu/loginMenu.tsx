interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginMenu = ({ setShowModal }: ModalProps) => {
  return (
    <div className='h-full w-full leading-normal text-white grid place-items-center fixed backdrop-blur-sm !bg-transparent'>
      <div className='rounded-lg my-0 mx-auto text-left p-[20px] max-w-md md:w-full w-fit leading-normal'>
        <div className='flex justify-between'>
          <h3 className='md:text-[25px] text-[20px]'>Sign Up</h3>
          <button
            className='bg-alto dark:bg-jet'
            onClick={() => setShowModal(false)}
          >
            X
          </button>
        </div>
        <form className='mb-[10px] p-[10px] text-alto bg-alto dark:bg-jet'>
          <div className='py-[10px] flex flex-col rounded-lg'>
            <label className='text-lg'>Username</label>
            <input
              className='border-solid border-[1px] p-[5px] border-silverChalice w-[100%]'
              placeholder='AllmostHumann'
            />
          </div>
          <div className='py-[10px] flex flex-col'>
            <label className='text-lg'>Email</label>
            <input
              className='border-solid border-[1px] p-[5px] border-silverChalice w-[100%]'
              placeholder='name@company.com'
            />
          </div>
          <div className='py-[10px] flex flex-col'>
            <label className='text-lg'>Password</label>
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
  );
};
