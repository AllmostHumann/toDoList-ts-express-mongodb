import { NavLink, useNavigate } from 'react-router-dom';
import { toTasks } from '../../routers';
import { ThemeButton } from '../Buttons/themeButton';
import { useGetAuthenticadedUser } from '../../api/hooks/users/useGetAuthenticadedUser';
import { useUserLogout } from '../../api/hooks/users/useLogOut';

interface ModalProps {
  setShowSignupModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Nav = ({ setShowSignupModal, setShowLoginModal }: ModalProps) => {
  const navigate = useNavigate();
  const { data: loggedUser } = useGetAuthenticadedUser();
  const { mutate: logout } = useUserLogout();

  return (
    <nav className='bg-teal dark:bg-sherpaBlue m-0 p-0 flex justify-start items-center list-none md:justify-center'>
      <div className='m-[15px] bg-teal dark:bg-sherpaBlue'>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'text-white no-underline font-bold hover:border-b-[1px] border-solid'
              : 'hover:border-b-[1px] text-white'
          }
          to={toTasks()}
        >
          Tasks
        </NavLink>
      </div>
      <div className='absolute flex justify-center items-center right-0 m-[15px] bg-teal dark:bg-sherpaBlue text-white md:gap-[20px] gap-[10px] '>
        {!loggedUser && (
          <button
            className='border-none md:my-0 transition-none hover:scale-100
          md:mx-[10px] p-0 m-[7px] hover:underline hover:cursor-pointer bg-teal dark:bg-sherpaBlue text-white'
            onClick={() => setShowSignupModal(true)}
          >
            Sign up
          </button>
        )}
        <button
          className='border-none md:my-0 transition-none hover:scale-100
          md:mx-[10px] p-0 m-[7px] hover:underline hover:cursor-pointer bg-teal dark:bg-sherpaBlue text-white'
          onClick={() => setShowLoginModal(true)}
        >
          {loggedUser ? `Signed in as: ${loggedUser.username}` : 'Log in'}
        </button>
        {loggedUser && (
          <button
            className='border-none md:my-0 transition-none hover:scale-100
          md:mx-[10px] p-0 m-[7px] hover:underline hover:cursor-pointer bg-teal dark:bg-sherpaBlue text-white'
            onClick={() => {
              logout(), navigate(toTasks());
            }}
          >
            Log out
          </button>
        )}
        <ThemeButton />
      </div>
    </nav>
  );
};
