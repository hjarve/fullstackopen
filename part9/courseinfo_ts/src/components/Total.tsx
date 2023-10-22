interface TotalProps {
  totalNumber: number;
}

const Total = (props: TotalProps) => {
  return(
    <p>Number of exercises {props.totalNumber}</p>
  )
}

export default Total;