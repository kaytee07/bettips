import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface HomeCardProps {
    icon: string,
    bgColor: string,
    handleClick: () => void,
    title: string,
    description: string
}

const OddsCard = ({ icon, bgColor, handleClick, title, description}: HomeCardProps) => {
  return (
    <div className={cn("px-4 py-6 flex flex-col bg-her justify-between w-full xl:max-w-[320px] min-h-[260px] rounded-[14px] cursor-pointer", bgColor)}
       onClick={handleClick}>
        <div className="flex-center glassmorphism size-12
         rounded-[10px]">
            <Image
             src={icon}
             alt="meeting"
             width={27}
             height={27}
            />
        </div>
        <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold ">{title}</h1>
            <p className="text-md font-normal">{description}</p>
        </div>
      </div>
  )
}

export default OddsCard