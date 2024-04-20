"use client"
import {
  Card,
  CardFooter,
} from "@/components/ui/card"

import { Button } from "./button"
import Image from "next/image"
import { useEffect, useState } from "react"

interface oddTypeProps {
    oddType: string,
}

interface TipProps {
  imageUrl: string,
  tipType: string
}




const TipType = ({oddType}: oddTypeProps) => {
  const [ images, setImages] = useState([])

  const handleDelete = async (tiptype: string, imageUrl:string) => {
    const response = await fetch(`/api/odds/${tiptype}`, {
      method: "DELETE",
      body: JSON.stringify({
        imageUrl
      })
    })

    if (response.ok){
      console.log(await response.json())
    }

    const newImage = images.filter((image) => {
      return image.imageUrl !== imageUrl
    })
    setImages(newImage);
  }

  useEffect(() => {
    const getTips = async () => {
      const response = await fetch(`/api/odds/${oddType}`);

      const allSlips = await response.json()
      if(response.ok){
        setImages(allSlips)
      }
    }
    getTips()
  }, [oddType])
  return (
    <section className="flex flex-col gap-6 pt-10 items-center">
      {images.length &&
       images.map((tip: TipProps, index) => {
        return   (
          <Card className="w-[350px]" key={index}>
            <div className="section w-full items-center p-6 pt-0 flex justify-between">
              <Image
                src={tip.imageUrl}
                alt={tip.tipType}
                width={50}
                height={50}
              />
            </div>
            <CardFooter className="flex justify-between">
              <Button onClick={() => {handleDelete(tip.tipType, tip.imageUrl)}} variant="destructive" className="w-full">Delete</Button>
            </CardFooter>
          </Card>
      )
       })
     }
    </section>
  )
}

export default TipType
