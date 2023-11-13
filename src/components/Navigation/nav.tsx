import { NavLink } from 'react-router-dom';
import { toTasks, toAutor } from '../../routers';

export const Nav = () => {
  return (
    <nav>
      <ul className='bg-teal m-0 p-0 flex justify-center list-none'>
        <li className='m-[15px]'>
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
        </li>
        <li className='m-[15px]'>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'text-white no-underline font-bold hover:border-b-[1px] border-solid'
                : 'text-white hover:border-b-[1px]'
            }
            to={toAutor()}
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
