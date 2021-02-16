import { RecommendMoviesCommand } from 'collard_movies_model';
export const IsRecommendMovieCommand = (
  command: any
): command is RecommendMoviesCommand => {
  const casted = command as RecommendMoviesCommand;
  return casted.movies !== undefined && casted.userId !== undefined;
};
