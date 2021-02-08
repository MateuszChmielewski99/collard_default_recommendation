import { container } from 'tsyringe';
import { IsRecommendMovieCommand } from '../command/command-type-check';
import { ICommandHandler } from '../handlers/ICommandHandler';

export const createCommandHandler = (content: object):ICommandHandler<object> | null => {
  if (IsRecommendMovieCommand(content))
    return container.resolve('ICommandHandler<RecommendMoviesCommand>');

    return null;
};
