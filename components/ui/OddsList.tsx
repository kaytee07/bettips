"use client"
import OddsCard from "./OddsCard"


const OddsList = () => {

  const handlePayment = async (oddType:string, amount:number) => {
    const response = await fetch(`/api/pay/${oddType}`, {
      method:"POST",
      body: JSON.stringify({
        amount
      })
    })
  }

  return (
    <section className="grid grid-cols-1 gap-5 
     md:grid-cols-2 lg:grid-cols-3">
       <OddsCard 
            icon="/icons/add-meeting.svg"
            title="3 straight draws: Ghc 80.00"
            description="accurate three straight draws"
            bgColor="bg-orange-1"
            handleClick={() => { handlePayment("threestraightdraw", 80) }}
        />
       <OddsCard 
            icon="/icons/join-meeting.svg"
            description="get "
            title="5 odds: Ghc 35.00"
            bgColor="bg-blue-1"
            handleClick={() => { handlePayment("fiveodds", 35) }}
        />
       <OddsCard 
            icon="/icons/schedule.svg"
            title="Midnight/Basketball games: Ghc 50.00"
            description="Get your accurate midnight games"
            bgColor="bg-purple-1"
            handleClick={() => { handlePayment("midnightbasketball", 50) }}
        />
    </section>
  )
}

export default OddsList