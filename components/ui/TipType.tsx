"use client"
import {
  Card,
  CardFooter,
} from "@/components/ui/card"

import { Button } from "./button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import Loader from "./Loader";



interface oddTypeProps {
    oddType: string,
}

interface TipProps {
  imageUrl: string,
  tipType: string
}




const TipType = ({oddType}: oddTypeProps) => {
  const [ images, setImages] = useState([]);
  const [ paid, setPaid ] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const { toast } = useToast();

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

    const newImage = images.filter((image: any) => image.imageUrl !== imageUrl)
    setImages(newImage);
  }

  useEffect(()=> {
    if (!user) {
      const verifyReference = async () => {
      const response = await fetch('/api/verify', {
        method: "POST",
        body: JSON.stringify({
            reference
        })
      });
      console.log(response.status)
      if(response.status === 200) {
        toast({
          description: "ok"
        })
        setPaid(true);
      } else if(response.status === 400) {
        toast({
          description: "you've already been on the page"
        })
        setPaid(false)
        router.push("/");
      } else {
        console.log(response.status)
        router.push("/");
      }
    }
    verifyReference();
    } else {
      setPaid(true)
    }
    
  },[]);

  useEffect(() => {
    const getTips = async () => {
      try {
        const response = await fetch(`/api/odds/${oddType}`);
        if (response.ok) {
        const allSlips = await response.json();
        setImages(allSlips);
        if(!user && !reference) router.push("/sign-in");
      }
    } catch (error) {
      console.error("Error fetching tips:", error);
    }
  };
      getTips();
    
  }, [user]);
  return (
    <>
    { paid ?  (
      <section className="flex flex-col gap-6 pt-10 items-center">
        {images.length && images.map((tip: TipProps, index) => {
        return   (
          <Card className="w-full" key={index}>
            <div className="section w-full items-center p-6 pt-0 flex justify-between">
              <Image
                src={tip.imageUrl}
                alt={tip.tipType}
                width={400}
                height={400}
                className={cn('w-full crisp-edges')}
              />
            </div>
            { user && (
              <CardFooter className="flex justify-between">
              <Button onClick={() => {handleDelete(tip.tipType, tip.imageUrl)}} variant="destructive" className="w-full">Delete</Button>
              </CardFooter>
            )}
          </Card>
      )
       })
     }
    </section>
    ) : (
      <Loader/>
    )}
      
    
    </>
  )
}

export default TipType
