export const totalExercises = parts => {
  return parts.reduce((sum, part) => sum + part.exercises, 0);
}