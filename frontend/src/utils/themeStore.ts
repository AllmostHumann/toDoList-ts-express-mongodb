import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { THEME_TYPES } from './themeConstants';

interface ThemeState {
  theme: string;
}

interface ThemeStore extends ThemeState {
  toggleTheme: () => void;
}

const { THEME_DARK, THEME_LIGHT } = THEME_TYPES;

const useThemeStore = create<ThemeStore>()(
  persist(
    devtools((set) => ({
      theme: THEME_LIGHT,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT,
        })),
    })),
    {
      name: 'theme',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useThemeStore;
