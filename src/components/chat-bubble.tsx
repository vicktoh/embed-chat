import { FC } from 'react'
import { Appearance } from '../types'

type ChatBubble = {
   role: "assistant" | "user",
   text: string
   timestamp: number,
   appearance: Appearance
}

export const ChatBubble: FC<ChatBubble> = ({role, text, appearance}) => {
  return (
      <div
          className={`flex flex-row gap-2 my-2  ${
              role === 'assistant' ? '' : 'justify-end'
          }`}
      >
          {role === 'assistant' ? (
              <div
                  className="w-10 h-10 self-start flex justify-center items-center rounded-full"
                  style={{
                      backgroundColor: appearance?.brandColor,
                      color: appearance.textColor,
                  }}
              >
                  {appearance.icon !== 'circle' &&
                  appearance.icon !== 'square' ? (
                      <img
                          src={appearance.icon}
                          className="w-10 h-10 rounded-full"
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
              className={`flex flex-row py-2 px-3  gap-2 max-w-[70%] ${
                  role === 'assistant'
                      ? 'rounded-tl-md rounded-br-md rounded-tr-md text-black bg-slate-300 dark:bg-[#4c5152] dark:text-white'
                      : 'rounded-tl-md rounded-bl-md rounded-tr-md self-end '
              }`}
              style={{
                  backgroundColor:
                      role === 'user' ? appearance?.brandColor : '',
                  color: appearance.textColor,
              }}
          >
              <p className="text-sm">{text}</p>
          </div>
      </div>
  );
}
