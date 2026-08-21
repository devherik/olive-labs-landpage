import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { type Theme, type Font, type Locale, type WorkbenchTab, ThemeSchema, FontSchema, LocaleSchema, WorkbenchTabSchema } from './schemas'

interface UIState {
  theme: Theme;
  font: Font;
  locale: Locale;
  setTheme: (theme: Theme) => void;
  setFont: (font: Font) => void;
  setLocale: (locale: Locale) => void;
  initState: () => void;
  terminalTab: WorkbenchTab;
  setTerminalTab: (tab: WorkbenchTab) => void;
}

const getSystemTheme = (): "light" | "dark" =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

let activeThemeListener: ((e: MediaQueryListEvent) => void) | null = null;

const applyThemeToDOM = (theme: Theme, font: Font) => {
  const effectiveTheme = theme === "system" ? getSystemTheme() : theme;

  // Clean up previous classes to avoid conflicts
  document.documentElement.classList.remove("dark", "light-theme");
  if (effectiveTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.add("light-theme");
  }

  // Handle Font Style
  document.documentElement.classList.remove("font-serif", "font-sans");
  document.documentElement.classList.add(`font-${font}`);
};

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      font: 'sans',
      locale: 'pt-br',
      setTheme: (theme: Theme) => {
        const result = ThemeSchema.safeParse(theme);
        if (!result.success) {
          theme = 'light';
        }
        set({ theme });
        applyThemeToDOM(theme, get().font);
      },
      setFont: (font: Font) => {
        const result = FontSchema.safeParse(font);
        if (!result.success) {
          font = 'sans';
        }
        set({ font });
        applyThemeToDOM(get().theme, font);
      },
      setLocale: (locale: Locale) => {
        const result = LocaleSchema.safeParse(locale);
        if (!result.success) {
          locale = 'pt-br';
        }
        set({ locale });
      },
      initState: () => {
        const storedTheme = get().theme;
        const storedFont = get().font;
        const storedLocale = get().locale;

        applyThemeToDOM(storedTheme, storedFont);

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        if (activeThemeListener) {
          mediaQuery.removeEventListener('change', activeThemeListener);
        }

        activeThemeListener = () => {
          // Re-apply theme when system theme changes, but only if the theme is set to 'system'
          if (get().theme === 'system') {
            applyThemeToDOM('system', get().font);
          }
        };

        mediaQuery.addEventListener("change", activeThemeListener);

        set({ theme: storedTheme, font: storedFont, locale: storedLocale });
      },
      terminalTab: 'engine.go',
      setTerminalTab: (tab: WorkbenchTab) => {
        const result = WorkbenchTabSchema.safeParse(tab);
        set({ terminalTab: result.success ? tab : 'engine.go' });
      },
    }),
    {
      name: 'olive-labs-ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        font: state.font,
        locale: state.locale,
      }),
    }
  )
)
