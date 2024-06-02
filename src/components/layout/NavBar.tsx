import React from 'react';
import Link from 'next/link';
import markDownLogo from '/public/markdownLogo.svg.png';

type NavBarLink = {
  title: string;
  href: string;
};

const navBarLinks: NavBarLink[] = [
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Login',
    href: '/api/auth/login',
  },
];

function NavBar() {
  return (
    <nav
      className="absolute top-0 flex justify-between items-center h-16 w-screen bg-white text-black  shadow-sm font-mono px-4 lg:px-12"
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
      </div>
    </nav>
  );
}

export default NavBar;
