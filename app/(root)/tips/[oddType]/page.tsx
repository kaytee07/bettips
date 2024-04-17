import TipType from '@/components/ui/TipType'
import React from 'react'

const page = ({ params: { oddType, id }}: { params: { oddType: string, id: string}}) => {
  return (
    <div>
      <TipType oddType={oddType}/>
    </div>
  )
}

export default page
