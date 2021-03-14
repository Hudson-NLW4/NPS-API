import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { IsEmail } from "class-validator";
import { v4 } from 'uuid';
import { SurveyUser } from "./SurveyUser";

@Entity("users")
export class User {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()   
    @IsEmail()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => SurveyUser, surveyUser => surveyUser.user)
    surveysUser: SurveyUser[];

    constructor () {
        if(!this.id){
            this.id = v4()
        }
    }
}
