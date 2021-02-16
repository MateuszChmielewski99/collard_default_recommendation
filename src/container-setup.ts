import { container } from 'tsyringe';
import { RecommendMoviesCommand } from 'collard_movies_model';
import { CommandDispatcher } from './handlers/command-dispatcher/CommandDispatcher';
import { ICommandDispatcher } from './handlers/command-dispatcher/ICommandDispatcher';
import { ICommandHandler } from './handlers/ICommandHandler';
import { RecommendMovieHandler } from './handlers/recommend-movie/RecommendMovieHandler';
import { IMovieRepository } from './repositories/movie-repository/IMovieReposistory';
import { MovieRepository } from './repositories/movie-repository/MovieRepository';
import { IUserRepository } from './repositories/user-repository/IUserRepository';
import { UserRepository } from './repositories/user-repository/UserRepository';
import { RabbitMqServiceBus } from './service-bus/RabbitMqServiceBus';

export const bootstrap = () => {
  container.register<IUserRepository>('IUserRepository', {
    useClass: UserRepository,
  });
  container.register('IServiceBus', {
    useClass: RabbitMqServiceBus,
  });
  container.register<ICommandHandler<RecommendMoviesCommand>>(
    'ICommandHandler<RecommendMoviesCommand>',
    { useClass: RecommendMovieHandler }
  );
  container.register<ICommandDispatcher>('ICommandDispatcher', {
    useClass: CommandDispatcher,
  });
  container.register<IMovieRepository>('IMovieRepository', {
    useClass: MovieRepository,
  });
};
