import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Body, Put, Delete, ParseFloatPipe } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";

@Controller("/produtos")
export class ProdutoController {

    constructor(private readonly produtoService: ProdutoService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]> {
        return this.produtoService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id: number): Promise<Produto> {
        return this.produtoService.findById(id);
    }

    @Get("/nome/:nome")
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param("nome") nome: string): Promise<Produto[]> {
        return this.produtoService.findByTitulo(nome)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() Produto: Produto): Promise<Produto> {
        return this.produtoService.create(Produto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() Produto: Produto): Promise<Produto> {
        return this.produtoService.update(Produto);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.produtoService.delete(id);
    }

    @Get('/precoasc/:preco')
    @HttpCode(HttpStatus.OK)
    listarPrecoAsc(@Param('preco', ParseFloatPipe) preco: number){
        return this.produtoService.ListarPrecoAsc(preco);
    }

    @Get('/precodesc/:preco')
    @HttpCode(HttpStatus.OK)
    listarPrecoDesc(@Param('preco', ParseFloatPipe) preco: number){
        return this.produtoService.ListarPrecoDesc(preco);
    }
}