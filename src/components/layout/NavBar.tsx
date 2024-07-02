'use client';
import React from 'react';
import Link from 'next/link';
import markDownLogo from '/public/markdownLogo.svg.png';
import { useUser } from '@auth0/nextjs-auth0/client';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

type NavBarLink = {
  title: string;
  href: string;
};

const navBarLinks: NavBarLink[] = [
  {
    title: 'About',
    href: '/about',
  },
];

function NavBar() {
  const { user } = useUser();
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav
      className={clsx(
        pathname !== '/'
          ? ' top-0 flex justify-between items-center h-16 w-screen bg-white text-black  shadow-sm font-mono px-4 lg:px-12'
          : 'absolute top-0 flex justify-between items-center h-16 w-screen bg-white text-black  shadow-sm font-mono px-4 lg:px-12'
      )}
      role="navigation">
      <Link href="/">
        <img
          className="h-auto w-14"
          src={markDownLogo.src}
          alt={'markdown logo'}
        />
      </Link>
      <div className="flex fle-row">
        {navBarLinks.map((item, index) => {
          return (
            <Link
              className=" hover:font-bold hover:text-black hover:underline cursor-pointer p-4"
              key={index}
              href={item.href}>
              <p>{item.title}</p>
            </Link>
          );
        })}
        {/* {user ? (
          <Link
            className=" hover:font-bold hover:text-black hover:underline cursor-pointer p-4"
            href={'/api/auth/logout'}>
            <p>Logout</p>
          </Link>
        ) : (
          <Link
            className=" hover:font-bold hover:text-black hover:underline cursor-pointer p-4"
            href={'/api/auth/login'}>
            <p>Login</p>
          </Link>
        )} */}
      </div>
    </nav>
  );
}

export default NavBar;
