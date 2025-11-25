import { totalExercises } from "./TotalExercise";
import { Part } from "./Part";

export const Content = props => (
  <>
    {props.parts.map(part => <Part key={part.id} part={part} />)}
    <p style={{ fontWeight: "bold" }}>Total of {totalExercises(props.parts)} exercises</p>
  </>
);