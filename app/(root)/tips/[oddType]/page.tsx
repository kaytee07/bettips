import TipType from '@/components/ui/TipType';
import React from 'react';
import { useUser } from '@nextui-org/react';
import { headers } from "next/headers";


const page = ({ params: { oddType, id }}: { params: { oddType: string, id: string}}) => {
  const headersList = headers();
  const referer = headersList.get('referer');
  return (
    <div>
      <TipType oddType={oddType}/>
    </div>
  )
}

export default page
