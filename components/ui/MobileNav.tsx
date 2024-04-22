import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { tipType } from "@/constants"
import Image from "next/image"
import Link from "next/link"


const MobileNav = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="pt-3">
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger"
            width={40}
            height={40}
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none text-white bg-dark-1">
            <p className='text-[26px] font-extrabold text-white'>Bettips</p>
            <section className="flex h-full flex-col gap-6 
                pt-16 text-white">
                 {tipType.map((tips, index) => {
                    return (
                        <SheetClose asChild key={index}>
                            <Link
                            href={tips.src}
                            key={index}
                            className="flex gap-4 p-4 rounded-lg justify-start"
                        >
                           <Image
                                src={tips.imageUrl}
                                alt={tips.name}
                                width={24}
                                height={24}
                            />
                            <p className="text-lg font-semibold">
                                {tips.name}
                            </p>
                            </Link>
                        </SheetClose>
                    )
                    })}           
            </section>
            {/* <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </SheetDescription>
            </SheetHeader> */}
        </SheetContent>
        </Sheet>
    </div>
  )
}

export default MobileNav
