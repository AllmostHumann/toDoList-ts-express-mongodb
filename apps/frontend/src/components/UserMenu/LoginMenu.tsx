import { useEffect, useRef } from 'react';
import { FormButton } from '../Buttons/formButton';
import { useUserLogin } from '../../api/hooks/users/useLogin';
import { Input } from '../Input/input';
import { useGetAuthenticadedUser } from '../../api/hooks/users/useGetAuthenticadedUser';
import useTasksStore from '../../utils/taskStore';
import { useNavigate } from 'react-router-dom';
import { toTasks } from '../../routers';

// interface LoginProps {
//   setShowLoginModal: (showLoginModal: boolean) => void;
// }

export const LoginMenu = () => {
  const navigate = useNavigate();
  const { mutate: userLogin, error: loginError } = useUserLogin();
  const { refetch: refetchUsers, data: loggedUser } = useGetAuthenticadedUser();
  const {
    loginUserName,
    setLoginUserName,
    loginUserPassword,
    setLoginUserPassword,
    setShowLoginModal,
  } = useTasksStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (loginError && !loggedUser) {
      setShowLoginModal(true);
    } else if (!loginError && loggedUser) {
      setShowLoginModal(false);
    }
  }, [loggedUser, loginError, setShowLoginModal]);

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmUserName = loginUserName.trim();
    const trimmUserPassword = loginUserPassword.trim();

    if (!trimmUserName && !trimmUserPassword) {
      return;
    }

    userLogin({
      username: trimmUserName,
      password: trimmUserPassword,
    });

    if (loggedUser) {
      refetchUsers();
    }

    navigate(toTasks());
    setLoginUserName('');
    setLoginUserPassword('');
  };

  return (
    <div className='h-full w-full leading-normal text-black dark:text-white grid place-items-center fixed backdrop-blur-sm !bg-transparent'>
      <div className='rounded-lg my-0 mx-auto text-left p-[5px] max-w-md md:w-full w-fit leading-normal border-[2px] border-davysGray'>
        <div className='p-5 bg-white rounded-lg'>
          <div className='flex justify-between bg-white'>
            <h3 className='md:text-[25px] text-[20px]'>Log in</h3>
            <button
              className='dark:bg-jet text-black dark:text-white'
              onClick={() => setShowLoginModal(false)}
            >
              X
            </button>
          </div>
          <form
            className='mb-[10px] p-[10px] text-alto font-medium bg-white dark:bg-jet'
            onSubmit={onFormSubmit}
          >
            {loginError && (
              <div className='!bg-red-300 w-full h-[40px] grid place-items-center justify-start pl-2 font-medium text-red-900 rounded-lg'>
                <p className='m-1'>Invalid credentials!</p>
              </div>
            )}
            <div className='py-[10px] flex flex-col rounded-lg bg-white'>
              <label className='text-lg text-black dark:text-white'>
                Username
              </label>
              <Input
                className='border-solid border-[1px] p-[5px] border-silverChalice w-full text-black'
                placeholder='Username'
                ref={inputRef}
                required={true}
                type='text'
                value={loginUserName}
                onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                  setLoginUserName(target.value)
                }
              />
            </div>
            <div className='py-[10px] flex flex-col rounded-lg bg-white'>
              <label className='text-lg text-black dark:text-white'>
                Password
              </label>
              <Input
                className='border-solid border-[1px] p-[5px] border-silverChalice w-full text-black'
                placeholder='**********'
                required={true}
                type='current-password'
                value={loginUserPassword}
                onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                  setLoginUserPassword(target.value)
                }
              />
            </div>
            <FormButton className='border-none cursor-pointer p-[10px] w-full hover:scale-[1.03] dark:bg-sherpaBlue bg-teal text-white'>
              Sign in
            </FormButton>
          </form>
        </div>
      </div>
    </div>
  );
};
