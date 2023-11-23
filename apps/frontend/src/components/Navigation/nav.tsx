import { NavLink } from 'react-router-dom';
import { toTasks } from '../../routers';
import { ThemeButton } from '../Buttons/themeButton';

export const Nav = () => {
  return (
    <nav className='bg-teal dark:bg-sherpaBlue m-0 p-0 flex justify-center items-center list-none'>
      <div className='m-[15px] bg-teal dark:bg-sherpaBlue'>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'text-white no-underline font-bold hover:border-b-[1px] border-solid'
              : 'text-white hover:border-b-[1px]'
          }
          to={toTasks()}
        >
          Tasks
        </NavLink>
      </div>
      <div className='absolute flex justify-center items-center right-0 m-[15px] bg-teal dark:bg-sherpaBlue text-white gap-[20px]'>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'text-white no-underline font-bold hover:border-b-[1px] border-solid'
              : 'text-white hover:border-b-[1px]'
          }
          to={toTasks()}
        >
          Login
        </NavLink>
        <ThemeButton />
      </div>
    </nav>
  );
};
