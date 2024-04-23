import Image from "next/image"


const Loader = () => {
  return (
    <div className="flex flex-center h-screen w-full flex-col items-center pt-10">
      <Image
        src="/icons/loading-circle.svg"
        alt="Loader"
        width={50}
        height={50}
      />
    </div>
  )
}

export default Loader