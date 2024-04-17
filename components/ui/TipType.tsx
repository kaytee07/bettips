interface oddTypeProps {
    oddType: string
}


const TipType = ({oddType}: oddTypeProps) => {
  return (
    <div>
      {oddType} tip
    </div>
  )
}

export default TipType
