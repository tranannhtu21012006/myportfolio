import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import SmoothScroll from '@/components/ui/SmoothScroll';
import { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Trần Anh Tú | Developer Portfolio',
  description: 'Frontend / Fullstack Developer based in Vietnam. Passionate about building creative digital experiences.',
  keywords: ['Tran Anh Tu', 'Developer', 'Portfolio', 'Frontend', 'Fullstack', 'Web Developer'],
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
