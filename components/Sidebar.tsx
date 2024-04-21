import { tipType } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div>
        <section className='sticky left-0 top-0 flex h-screen w-fit flex-col
       justify-between bg-dark-1 p-6 pt-19 text-white max-sm:hidden lg:w-[264px]'>
            <div className="flex flex-1 flex-col gap-6">
                {tipType.map((tips, index) => {
                    return (
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
                    )
                })}
            </div>
        </section>
    </div>
  )
}

export default Sidebar;
