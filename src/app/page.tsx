'use client';
import { Fira_Code } from 'next/font/google';
import { useRouter } from 'next/navigation';
import Typed from 'typed.js';
import { useEffect, useRef } from 'react';
import editorImage from '/public/editor.png';

const firaCode = Fira_Code({ subsets: ['latin'] });

export default function Page() {
  const router = useRouter();
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Transpiler', 'Viewer', 'Converter'],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex lg:flex-row flex-col w-screen h-screen justify-center space-y-10 lg:space-y-0">
      <div
        className={`${firaCode.className} mt-10 lg:my-auto items-center lg:order-1 order-2 lg:w-6/12  flex justify-center flex-col lg:items-start lg:mx-12 mx-6 typewriter`}>
        <h1 className="text-2xl lg:text-4xl font-bold">
          # Markdown <span ref={el}></span>
        </h1>
        <p className="lg:w-8/12 text-start my-4">
          Welcome to your Markdown playground, where you can seamlessly convert
          your Markdown files into HTML or preview them instantly.
        </p>
        <div className="space-x-8">
          <button
            onClick={() => {
              router.push('/api/auth/login');
            }}
            className="bg-black text-white px-6 py-2 hover:text-black hover:bg-white border border-2-black hover:border-2-black/30">
            Login
          </button>
          <button>Try it Out</button>
        </div>
      </div>
      <div className="lg:order-2 order-1 lg:w-6/12  flex justify-center items-center mx-6 lg:mx-12 ">
        <img
          className="border border-black/20"
          src={editorImage.src}
          alt="markdown"
        />
      </div>
    </div>
  );
}
