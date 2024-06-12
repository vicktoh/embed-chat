import { FC } from 'react'
import { Appearance } from '../types'
type LoadingBubbleProps = {
   appearance: Appearance
}
export const LoadingBubble:FC<LoadingBubbleProps> = ({appearance}) => {
  return (
   <div
   className={`dmd-flex dmd-flex-row dmd-gap-2 dmd-my-2 dmd-max-w-[80%]`}
>
<div
           className="dmd-w-8 dmd-h-8 dmd-self-start dmd-flex dmd-justify-center dmd-items-center dmd-rounded-full"
           style={{
            backgroundColor: appearance?.brandColor,
            color: appearance.textColor,
        }}
       >
           <svg
               xmlns="http://www.w3.org/2000/svg"
               width="16"
               height="16"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
               className="lucide lucide-message-circle-more"
           >
               <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
               <path d="M8 12h.01" />
               <path d="M12 12h.01" />
               <path d="M16 12h.01" />
           </svg>
       </div>
   <div
       className={`dmd-flex dmd-flex-row dmd-py-2 dmd-px-3  dmd-gap-2 dmd-rounded-tl-md dmd-rounded-br-md dmd-rounded-tr-md dmd-text-black dmd-bg-orange-100 dark:dmd-bg-[#4c5152] dark:dmd-text-white`}
   >
       <div className="dmd-w-3 dmd-h-3 dmd-rounded-full dmd-animate-pulse" style={{backgroundColor: appearance.brandColor}}></div>
       <div className="dmd-w-3 dmd-h-3 dmd-rounded-full dmd-animate-pulse-fast" style={{backgroundColor: appearance.brandColor}}></div>
       <div className="dmd-w-3 dmd-h-3 dmd-rounded-full dmd-animate-pulse-medium" style={{backgroundColor: appearance.brandColor}}></div>
   </div>
</div>
  )
}
