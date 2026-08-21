import { z } from 'zod';

export const ThemeSchema = z.enum(["light", "dark", "system"]);
export const FontSchema = z.enum(["sans", "serif"]);
export const LocaleSchema = z.enum(['pt-br', 'en', 'fr']);
export const WorkbenchTabSchema = z.enum(['engine.go', 'mcp_gateway.py', 'domain_contract.ts']);

export type Theme = z.infer<typeof ThemeSchema>;
export type Font = z.infer<typeof FontSchema>;
export type Locale = z.infer<typeof LocaleSchema>;
export type WorkbenchTab = z.infer<typeof WorkbenchTabSchema>;

export const PillarSchema = z.object({
  nodeId: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  icon: z.string(),
});
export type Pillar = z.infer<typeof PillarSchema>;

export const InstrumentSchema = z.object({
  id: z.string(),
  title: z.string(),
  tagline: z.string(),
  description: z.string(),
  category: z.string(),
  isFlagship: z.boolean(),
  url: z.string(),
  highlights: z.array(z.string()),
  badges: z.array(z.string()),
});
export type Instrument = z.infer<typeof InstrumentSchema>;

export const CaseStudySchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  client: z.string(),
  architecture: z.string(),
  description: z.string(),
  challengesOvercome: z.array(z.string()),
  badges: z.array(z.string()),
  status: z.string(),
});
export type CaseStudy = z.infer<typeof CaseStudySchema>;

export const ArchitectProfileSchema = z.object({
  name: z.string(),
  role: z.string(),
  location: z.string(),
  education: z.string(),
  bio: z.string(),
  github: z.string(),
  linkedin: z.string(),
  studio: z.string(),
  corePrinciples: z.array(z.string()),
});
export type ArchitectProfile = z.infer<typeof ArchitectProfileSchema>;

