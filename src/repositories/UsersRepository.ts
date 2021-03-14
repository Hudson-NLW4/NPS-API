import { EntityRepository, getRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
class UsersRepository extends Repository<User> {

    userRepository = getRepository(User);     

}

export { UsersRepository }