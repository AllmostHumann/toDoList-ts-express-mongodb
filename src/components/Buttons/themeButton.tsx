import { useEffect } from 'react';
import useThemeStore from '../../utils/themeStore';
import { applyThemePreference } from '../../utils/toggleDarkLightTheme';

export const ThemeButton = () => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    applyThemePreference(theme);
  }, [theme]);

  return (
    <button
      className='absolute flex justify-center right-0 m-[15px] bg-teal dark:bg-sherpaBlue text-white'
      onClick={toggleTheme}
    >
      THEME
    </button>
  );
};
