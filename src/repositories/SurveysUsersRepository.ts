import { EntityRepository, getRepository, Repository } from "typeorm";
import { SurveyUser } from "../entities/SurveyUser";

@EntityRepository(SurveyUser)
class SurveysUsersRepository extends Repository<SurveyUser> {

    userRepository = getRepository(SurveyUser);     

}

export { SurveysUsersRepository };

