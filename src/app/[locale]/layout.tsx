import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import SmoothScroll from '@/components/ui/SmoothScroll';
import { Metadata } from 'next';

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
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
