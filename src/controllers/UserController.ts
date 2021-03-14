import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup'
import { AppError } from '../errors/AppError';

class UserController {

    async show(request: Request, response: Response) {
        const userRepository = getCustomRepository(UsersRepository);

        const users = await userRepository.find({ relations: ["surveysUser"] });
        
        return response.json(users);
    }
    
    async create(request: Request, response: Response) {
        const {name, email} = request.body;

        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatório"),
            email: yup.string().required("Email é obrigatório").email("Precisa ser um email válido")
        })

        // if(!(await schema.isValid(request.body))) {
        //     return response.status(400).json({
        //         error: 'validate error'
        //     })
        // }

        try {
            await schema.validate(request.body, {abortEarly: false});
        }catch(err) {            
            return response.status(400).json({error: err})
        }

        const userRepository = getCustomRepository(UsersRepository);

        let user = new User();
        user.name = name;
        user.email = email;
        
        validate(user).then((errors) => {
            if (errors.length > 0) {
                return response.status(400).json(errors);
            }
        })

        const userAlreadyExists = await userRepository.findOne({ 
            email
        })

        if(userAlreadyExists) {
            throw new AppError('Usuário já existe');            
        }
        
        userRepository.create(user)

        await userRepository.save(user);

        return response.status(201).json(user);
    }

}

export { UserController };

