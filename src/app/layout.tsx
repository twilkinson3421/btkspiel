import './globals.scss';
import type { Metadata } from 'next';
import { AuthProvider } from './providers';
import Header from '@/components/Header/Header';

export const metadata: Metadata = {
  title: 'BTK Spiel',
  description: 'BTK Spiel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
