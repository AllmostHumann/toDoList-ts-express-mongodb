import { NavLink } from 'react-router-dom';
import { toTasks } from '../../routers';
import { ThemeButton } from '../Buttons/themeButton';

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Nav = ({ setShowModal }: ModalProps) => {
  return (
    <nav className='bg-teal dark:bg-sherpaBlue m-0 p-0 flex justify-center items-center list-none'>
      <div className='m-[15px] bg-teal dark:bg-sherpaBlue'>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'text-white no-underline font-bold hover:border-b-[1px] border-solid'
              : 'hover:border-b-[1px]'
          }
          to={toTasks()}
        >
          Tasks
        </NavLink>
      </div>
      <div className='absolute flex justify-center items-center right-0 m-[15px] bg-teal dark:bg-sherpaBlue text-white gap-[20px]'>
        <button
          className='border-none md:my-0 transition-none hover:scale-100
          md:mx-[10px] p-0 m-[7px] hover:underline hover:cursor-pointer bg-teal dark:bg-sherpaBlue text-white'
          onClick={() => setShowModal(true)}
        >
          Log in
        </button>
        <ThemeButton />
      </div>
    </nav>
  );
};
