import { IsDateString, IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Transform, TransformFnParams } from "class-transformer"


@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn() 
    public id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    public nome: string

    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: true })
    public usuario: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    public senha: string
}