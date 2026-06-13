import { z } from 'zod';

export const ThemeSchema = z.enum(["light", "dark", "system"]);
export const FontSchema = z.enum(["sans", "serif"]);
export const LocaleSchema = z.enum(['pt-br', 'en', 'fr']);

export type Theme = z.infer<typeof ThemeSchema>;
export type Font = z.infer<typeof FontSchema>;
export type Locale = z.infer<typeof LocaleSchema>;
