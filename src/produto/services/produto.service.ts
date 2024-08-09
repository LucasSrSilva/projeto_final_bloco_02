import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike, DeleteResult, MoreThan, LessThan } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService {

    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: {
                categoria: true
            }
        })
    }

    async findById(id: number): Promise<Produto> {
        let buscaProduto = await this.produtoRepository.findOne({
            where: {
                id
            },
            relations: {
                categoria: true
            }
        });

        if (!buscaProduto) {
            throw new HttpException("Produto não foi encontrada!", HttpStatus.NOT_FOUND);

        };
        return buscaProduto;
    }

    async findByTitulo(titulo: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },
            relations: {
                categoria: true
            }
        })
    }

    async create(Produto: Produto): Promise<Produto> {

        if (Produto.categoria) {
            await this.categoriaService.findById(Produto.categoria.id)
            return await this.produtoRepository.save(Produto);
        }

        return await this.produtoRepository.save(Produto);
    }

    async update(Produto: Produto): Promise<Produto> {

        let buscaProduto = await this.findById(Produto.id);

        if (!buscaProduto || !Produto.id) {
            throw new HttpException("A Produto não foi encontrada!", HttpStatus.NOT_FOUND);
        }

        if (Produto.categoria) {
            await this.categoriaService.findById(Produto.categoria.id)
            return await this.produtoRepository.save(Produto);
        }

        return await this.produtoRepository.save(Produto);
    }

    async delete(id: number): Promise<DeleteResult> {
        let buscaProduto = await this.findById(id);

        if (!buscaProduto) {
            throw new HttpException("Produto não foi encontrada!", HttpStatus.NOT_FOUND);

        };
        return await this.produtoRepository.delete(id);
    }

    async ListarPrecoAsc(preco: number): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                preco: MoreThan(preco)
            },
            order: {
                preco: "ASC"
            },
            relations: {
                categoria: true
            }
        })
    }

    async ListarPrecoDesc(preco: number): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                preco: LessThan(preco)
            },
            order: {
                preco: "DESC"
            },
            relations: {
                categoria: true
            }
        })
    }
}
