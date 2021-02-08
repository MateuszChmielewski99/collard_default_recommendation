import { RecommendationMovieRef } from "../../types/RecommendationMovieRef";
import { IBaseRepository } from "../base-repository/IBaseRepository";

export interface IMovieRepository extends IBaseRepository<RecommendationMovieRef> {
    getByClusterId(clusterId:string):Promise<RecommendationMovieRef[] | undefined>
    getByIds(ids:string[]):Promise<RecommendationMovieRef[] | undefined>
}