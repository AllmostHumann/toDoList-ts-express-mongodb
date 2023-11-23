import { NavLink } from 'react-router-dom';
import {  toAutor } from '../../routers';

export const Footer = () => {
  return (
    <footer className='bg-teal dark:bg-sherpaBlue mt-auto p-0 flex justify-center items-center list-none'>
        <div className='m-[15px] bg-teal dark:bg-sherpaBlue'>
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
        </div>
    </footer>
  );
};
