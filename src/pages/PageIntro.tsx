import type { ReactNode } from 'react';

export default function PageIntro({ title, children }: { title: string; children: ReactNode }) {
  return (
    <header className="container mx-auto px-5 md:px-10 pt-32 md:pt-40 pb-10 md:pb-14">
      <div className="max-w-3xl">
        <p className="eyebrow mb-4">SmartBiz · Eldoret, Kenya</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-bone">{title}</h1>
        <div className="mt-6 text-lg text-mist leading-relaxed max-w-2xl">{children}</div>
      </div>
    </header>
  );
}
