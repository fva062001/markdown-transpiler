'use client';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { Fira_Code } from 'next/font/google';
import { Roboto_Slab } from 'next/font/google';
import { useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { Roboto } from 'next/font/google';
import clsx from 'clsx';
import { EyeIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const firaCode = Fira_Code({ subsets: ['latin'] });
const robotoSlab = Roboto_Slab({ subsets: ['latin'] });
const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default withPageAuthRequired(Page);

function Page() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [markdown, setMarkdown] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const debounce = useDebouncedCallback((e) => {
    const response = transpileToHTML(e.target.value);
    response.then((res) => {
      setMarkdown(res);
    });
  }, 100);

  return (
    <div className="h-screen">
      <div className="flex flex-row h-full">
        <div
          className={clsx(
            showPreview
              ? 'w-full md:w-6/12 hidden border-r-[2px] border-[#E4E4E4]'
              : 'w-full md:w-6/12 border-r-[2px] border-[#E4E4E4]'
          )}>
          <div className=" bg-[#F5F5F5] py-2 px-3 flex flex-row justify-between">
            <p className={`text-[#7C8187] ${roboto.className} tracking-[2px]`}>
              MARKDOWN
            </p>
            <button>
              <EyeIcon
                className="h-6 w-6 text-[#7C8187] md:hidden"
                onClick={() => setShowPreview(!showPreview)}
              />
            </button>
          </div>
          <textarea
            onChange={debounce}
            ref={textAreaRef}
            defaultValue={'Start typing your markdown here...'}
            className={` w-full h-full p-3 preview-container ${firaCode.className}  outline-none resize-none`}
          />
        </div>

        <div
          className={clsx(
            showPreview
              ? `w-full md:w-6/12 ${robotoSlab.className}`
              : `hidden md:block w-full md:w-6/12 ${robotoSlab.className}`
          )}>
          <div className=" bg-[#F5F5F5] py-2 px-3 flex flex-row justify-between">
            <p className={`text-[#7C8187] ${roboto.className} tracking-[2px]`}>
              PREVIEW
            </p>
            <button>
              <XMarkIcon
                className="h-6 w-6 text-[#7C8187] md:hidden"
                onClick={() => setShowPreview(!showPreview)}
              />
            </button>
          </div>
          {markdown && (
            <div
              className="word-wrap break-words p-3 html-wrapper max-h-screen overflow-y-auto preview-container"
              dangerouslySetInnerHTML={{ __html: markdown.toString() }}></div>
          )}
        </div>
      </div>
    </div>
  );
}

async function transpileToHTML(markdownText: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdownText);

  return `<div style="white-space: pre-wrap;">${file.value}</div>`;
}
