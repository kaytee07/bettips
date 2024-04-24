import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface HomeCardProps {
    icon: string,
    bgImg: string,
    handleClick: () => void,
    title: string,
    description: string
}

const OddsCard = ({ icon, bgImg, handleClick, title, description}: HomeCardProps) => {
  return (
    <div className={cn("pt-4 flex flex-col bg-cover justify-between w-full  min-h-[260px] rounded-[14px] cursor-pointer", bgImg)}
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
        <div className="flex flex-col px-4 gap-2 bg-[rgba(0,0,0,0.8)]">
            <h1 className="text-xl font-bold ">{title}</h1>
            <p className="text-xl font-bold">{description}</p>
        </div>
      </div>
  )
}

export default OddsCard