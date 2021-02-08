import { RecommendMoviesCommand } from './RecommendMovies.command';
export const IsRecommendMovieCommand = (
  command: any
): command is RecommendMoviesCommand => {
  const casted = command as RecommendMoviesCommand;
  return casted.movies !== undefined && casted.userId !== undefined;
};
