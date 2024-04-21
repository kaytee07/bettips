"use client"
import OddsCard from "./OddsCard"


const OddsList = () => {


  return (
    <section className="grid grid-cols-1 gap-5 
     md:grid-cols-2 lg:grid-cols-4">
       <OddsCard 
            icon="/icons/add-meeting.svg"
            title="3 straight draws: Ghc 80.00"
            description="accurate three straight draws"
            bgColor="bg-orange-1"
            handleClick={() => {}}
        />
       <OddsCard 
            icon="/icons/join-meeting.svg"
            description="get "
            title="5 odds: Ghc 35.00"
            bgColor="bg-blue-1"
            handleClick={() => {}}
        />
       <OddsCard 
            icon="/icons/schedule.svg"
            title="Midnight/Basketball games: Ghc 50.00"
            description="Get your accurate midnight games"
            bgColor="bg-purple-1"
            handleClick={() => {}}
        />
    </section>
  )
}

export default OddsList