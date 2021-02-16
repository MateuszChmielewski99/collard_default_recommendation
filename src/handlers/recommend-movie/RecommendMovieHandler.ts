import { MovieReference } from 'collard_movies_model';
import { inject, injectable } from 'tsyringe';
import { RecommendMoviesCommand } from 'collard_movies_model';
import { IMovieRepository } from '../../repositories/movie-repository/IMovieReposistory';
import { IUserRepository } from '../../repositories/user-repository/IUserRepository';
import { RecommendationMovieRef } from '../../types/RecommendationMovieRef';
import { ICommandHandler } from '../ICommandHandler';

@injectable()
export class RecommendMovieHandler
  implements ICommandHandler<RecommendMoviesCommand> {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('IMovieRepository') private movieRepository: IMovieRepository
  ) {}

  async handle(command: RecommendMoviesCommand) {
    const { movies: movieIds, userId } = command;
    console.log(`acknowladged user with id: ${userId}`);

    const favouriteMovies: RecommendationMovieRef[] = [];
    // free tier does not allow to get by ids  
    for (const movieId of movieIds) {
      const single = await this.movieRepository.getOne(movieId);
      if (single) favouriteMovies.push(single);
    }

    const recommended: MovieReference[] = [];

    if (!favouriteMovies) throw new Error("Couldn't find movies by given ids");

    console.log(`found ${favouriteMovies.length} movies`);

    for (const favouriteMovie of favouriteMovies) {
      const movies = await this.movieRepository.getByClusterId(
        favouriteMovie.cluster
      );
      if (!movies) continue;

      console.log(`found ${movies.length} based on cluster id: ${favouriteMovie.cluster}`);

      recommended.push(
        ...movies
          ?.filter(item => favouriteMovie._id !== item._id)
          .slice(0, 3)
          .map<MovieReference>(movie => {
            return { id: +movie._id, poster: movie.poster, title: movie.title };
          })
      );
    }

    const user = await this.userRepository.getOne(userId);

    if (!user) throw new Error('Could not find user with given id');

    user.recommended = recommended.filter((movie, index) => recommended.indexOf(movie) === index);
    this.userRepository.update(user);
  }
}
