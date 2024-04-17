import React from 'react'

const page = ({ params: { oddType, id }}: { params: { oddType: string, id: string}}) => {
  return (
    <div>
      {oddType} page
    </div>
  )
}

export default page
