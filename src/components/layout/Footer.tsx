'use client';
import React from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

function Footer() {
  const pathname = usePathname();
  return (
    <footer
      className={clsx(
        pathname !== '/'
          ? 'relative bottom-0 w-screen flex justify-center items-center h-16 bg-black text-white z-10'
          : 'absolute bottom-0 w-screen flex justify-center items-center h-16 bg-black text-white z-10'
      )}>
      <a href="https://github.com/fva062001">@fva062001</a>
    </footer>
  );
}

export default Footer;
