import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {

    async execute(request: Request, response: Response) {
        const { nota } = request.params;
        const { id } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(id)
        })

        if(!surveyUser) {
            throw new AppError('Não existe essa pesquisa');            
        }

        surveyUser.value = Number(nota);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }

}

export { AnswerController }