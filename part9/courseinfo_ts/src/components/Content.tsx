interface coursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: coursePart[];
}

const Content = (props: ContentProps) => {
  return(
    <div>
      {props.courseParts.map((p, index) => <p key={index}>{p.name} {p.exerciseCount}</p>
      )}
    </div>
  )
}

export default Content;