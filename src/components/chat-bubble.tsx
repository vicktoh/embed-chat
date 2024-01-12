import { FC } from 'react'
import { Appearance } from '../types'

type ChatBubble = {
   role: "assistant" | "user",
   text: string
   timestamp: number,
   appearance?: Appearance
}

export const ChatBubble: FC<ChatBubble> = ({role, text, appearance}) => {
  return (
      <div
          className={`flex flex-row gap-2 my-2 max-w-[80%] ${
              role === 'assistant' ? '' : 'self-end'
          }`}
      >
          {role === 'assistant' ? (
              <div
                  className="w-8 h-8 self-start flex justify-center items-center rounded-full"
                  style={{ backgroundColor: appearance?.brandColor }}
              >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-message-circle-more"
                  >
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                      <path d="M8 12h.01" />
                      <path d="M12 12h.01" />
                      <path d="M16 12h.01" />
                  </svg>
              </div>
          ) : null}
          <div
              className={`flex flex-row py-2 px-3  gap-2 ${
                  role === 'assistant'
                      ? 'rounded-tl-md rounded-br-md rounded-tr-md text-black bg-orange-100 dark:bg-[#4c5152] dark:text-white'
                      : 'rounded-tl-md rounded-bl-md rounded-tr-md '
              }`}
              style={{
                  backgroundColor:
                      role === 'user' ? appearance?.brandColor : '',
              }}
          >
              <p className="text-base">{text}</p>
          </div>
      </div>
  );
}
