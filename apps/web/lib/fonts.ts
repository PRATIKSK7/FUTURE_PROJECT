/*
Font Configuration
Configures Inter font globally for the application using Next.js optimization.
Belongs in apps/web/lib/
*/
import { Inter } from 'next/font/google';

export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
