import { User } from "collard_movies_model";
import { injectable } from "tsyringe";
import { BaseRepository } from "../base-repository/BaseRepository";
import { IUserRepository } from "./IUserRepository";

@injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository  {
    constructor(){
        super('users');
    }
}