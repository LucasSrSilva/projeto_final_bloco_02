import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Body, Put, Delete } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.service";

@Controller("/categoria")
export class CategoriaController {
    
    constructor(private readonly categoriaService: CategoriaService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findbyId(@Param("id", ParseIntPipe) id: number): Promise<Categoria> {
        return this.categoriaService.findById(id);
    }

    @Get("/titulo/:titulo")
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param("titulo") titulo: string): Promise<Categoria[]> {
        return this.categoriaService.findByDescricao(titulo)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() Categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.create(Categoria);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() Categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.update(Categoria);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.categoriaService.delete(id);
    }

}