import { injectable } from 'tsyringe';
import { RecommendationMovieRef } from '../../types/RecommendationMovieRef';
import { BaseRepository } from '../base-repository/BaseRepository';
import { IMovieRepository } from './IMovieReposistory';

@injectable()
export class MovieRepository extends BaseRepository<RecommendationMovieRef>
  implements IMovieRepository {
  constructor() {
    super('recommendation_movies');
  }

  async getByClusterId(
    clusterId: string
  ): Promise<RecommendationMovieRef[] | undefined> {
    return super.getByQuery({ cluster: clusterId }, { score: -1 });
  }

  async getByIds(ids: string[]) {
    const pipeline = [
      {
        _id:{
          $in:ids
        }
      },
    ];

    return super.agregate<RecommendationMovieRef>(pipeline);
  }
}
