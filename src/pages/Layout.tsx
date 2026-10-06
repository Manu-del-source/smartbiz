import { type ReactNode } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="relative bg-ink text-bone selection:bg-ember/30 overflow-x-hidden min-h-screen">
      <div className="grain-overlay" aria-hidden="true" />
      <Nav />
      <BackToTop />
      <WhatsAppButton />
      {children}
      <Footer />
    </main>
  );
}
