import { EntityRepository, getRepository, Repository } from "typeorm";
import { Survey } from "../entities/Survey";

@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey> {

    userRepository = getRepository(Survey);     

}

export { SurveysRepository };

