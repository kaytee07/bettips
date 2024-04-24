"use client"
import { useRouter } from 'next/navigation';
import OddsCard from "./OddsCard"
import {Card, CardFooter, Image, Button, CardHeader} from "@nextui-org/react";
import { useEffect, useState } from 'react';
import Loader from './Loader';
import { toast } from './use-toast';


const OddsList = () => {
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState(false);
  const handlePayment = async (oddType:string, amount:number) => {
    setIsLoading(true);
    const response = await fetch(`/api/pay/${oddType}`, {
      method:"POST",
      body: JSON.stringify({
        amount
      })
    })

    if (response.ok) {
      let url = await response.json();
      router.push(url);
    } else {
      setIsLoading(false);
      console.log("No tip uploaded yet")
      toast({
        description: "No tip uploaded yet"
      })
    }
  }

  useEffect (() => {

  }, [isLoading])

  return (
    <>
      { !isLoading ? (
        <section className="grid grid-cols-1 gap-5 w-full
     md:grid-cols-2 lg:grid-cols-3 lg:m-auto">
        <OddsCard 
            icon="/icons/add-meeting.svg"
            title="3 straight draws: Ghc 80.00"
            description="click here to buy"
            bgImg="bg-handshake"
            handleClick={() => { handlePayment("threestraightdraw", 80) }}
        />
       <OddsCard 
            icon="/icons/join-meeting.svg"
            description="click here to buy"
            title="5 odds: Ghc 35.00"
            bgImg="bg-win"
            handleClick={() => { handlePayment("fiveodds", 35) }}
        />
       <OddsCard 
            icon="/icons/schedule.svg"
            title="Midnight/Basketball games: Ghc 50.00"
            description="click here to buy"
            bgImg="bg-basketball"
            handleClick={() => { handlePayment("midnightbasketball", 50) }}
        />
        
        </section>
      ): (
        <Loader/>
      )}
       
  </>
  )
}

export default OddsList