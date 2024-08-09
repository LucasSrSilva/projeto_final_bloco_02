import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike, DeleteResult } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

@Injectable()
export class CategoriaService {

    constructor(
        @InjectRepository(Categoria)
        private CategoriaRepository: Repository<Categoria>
    ) { }

    async findAll(): Promise<Categoria[]>{
        return await this.CategoriaRepository.find({
            
        })
    }

    async findById(id: number): Promise<Categoria> {
        let buscaCategoria = await this.CategoriaRepository.findOne({
            where: {
                id
            },
            
        })

        if (!buscaCategoria) {
            throw new HttpException("Categoria não foi encontrado!", HttpStatus.NOT_FOUND)
        }

        return buscaCategoria;
    }

    async findByDescricao(titulo: string): Promise<Categoria[]> {
        return await this.CategoriaRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },
            
        })
    }

    async create(Categoria: Categoria): Promise<Categoria> {
        return await this.CategoriaRepository.save(Categoria)
    }

    async update(Categoria: Categoria): Promise<Categoria> {
        let buscaCategoria = await this.findById(Categoria.id);

        if (!buscaCategoria || !buscaCategoria.id) {
            throw new HttpException("O produto não foi encontrado!", HttpStatus.NOT_FOUND)
        }

        return await this.CategoriaRepository.save(Categoria);
    }

    async delete(id: number): Promise<DeleteResult> {
        let buscaCategoria = await this.findById(id);

        if (!buscaCategoria || !buscaCategoria.id) {
            throw new HttpException("O produto não foi encontrado!", HttpStatus.NOT_FOUND)
        }

        return await this.CategoriaRepository.delete(id);

    }
}

