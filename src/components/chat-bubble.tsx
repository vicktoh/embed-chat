import { FC } from 'react'
import { Appearance } from '../types'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
type ChatBubble = {
   role: "assistant" | "user",
   text: string
   timestamp: number,
   appearance: Appearance
}

export const ChatBubble: FC<ChatBubble> = ({role, text, appearance}) => {
  return (
      <div
          className={`dmd-flex dmd-flex-row dmd-gap-2 dmd-my-2  ${
              role === 'assistant' ? '' : 'dmd-justify-end'
          }`}
      >
          {role === 'assistant' ? (
              <div
                  className="dmd-w-10 dmd-h-10 dmd-self-start dmd-flex dmd-justify-center dmd-items-center dmd-rounded-full"
                  style={{
                      backgroundColor: appearance?.brandColor,
                      color: appearance.textColor,
                  }}
              >
                  {appearance.icon !== 'circle' &&
                  appearance.icon !== 'square' ? (
                      <img
                          src={appearance.icon}
                          className="dmd-w-10 dmd-h-10 dmd-rounded-full"
                      />
                  ) : (
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-bot"
                      >
                          <path d="M12 8V4H8" />
                          <rect width="16" height="12" x="4" y="8" rx="2" />
                          <path d="M2 14h2" />
                          <path d="M20 14h2" />
                          <path d="M15 13v2" />
                          <path d="M9 13v2" />
                      </svg>
                  )}
              </div>
          ) : null}
          <div
              className={`dmd-flex dmd-flex-col dmd-py-2 dmd-px-3 dmd-text-[14px]  dmd-gap-2 dmd-max-w-[80%] [&>ol]:dmd-list-decimal dmd-list dmd-list-inside [&>ol]:dmd-pl-4 ${
                  role === 'assistant'
                      ? 'dmd-rounded-tl-md dmd-rounded-br-md dmd-rounded-tr-md dmd-text-black dmd-bg-slate-300 dark:dmd-bg-[#4c5152] dark:dmd-text-white'
                      : 'dmd-rounded-tl-md dmd-rounded-bl-md dmd-rounded-tr-md dmd-self-end '
              }`}
              style={{
                  backgroundColor:
                      role === 'user' ? appearance?.brandColor : '',
                  color: appearance.textColor,
              }}
          >
            
                <Markdown remarkPlugins={[remarkGfm]}>
                    {text}
                </Markdown>
          </div>
      </div>
  );
}
