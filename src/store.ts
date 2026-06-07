import { create } from 'zustand'

interface UIState {
  isDarkMode: boolean
  toggleDarkMode: () => void
  terminalTab: 'manifest' | 'infrastructure' | 'commands'
  setTerminalTab: (tab: 'manifest' | 'infrastructure' | 'commands') => void
}

export const useUIStore = create<UIState>((set) => {
  // Check system/local preferences on load
  const isDarkInitial =
    typeof window !== 'undefined'
      ? document.documentElement.classList.contains('dark') ||
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      : false

  // Set initial class list
  if (typeof window !== 'undefined') {
    if (isDarkInitial) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return {
    isDarkMode: isDarkInitial,
    toggleDarkMode: () =>
      set((state) => {
        const nextDark = !state.isDarkMode
        if (typeof window !== 'undefined') {
          if (nextDark) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
          } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
          }
        }
        return { isDarkMode: nextDark }
      }),
    terminalTab: 'manifest',
    setTerminalTab: (tab) => set({ terminalTab: tab }),
  }
})
