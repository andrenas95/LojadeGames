import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Produto } from "../entities/produto.entity";
import { produtoService } from "../services/produto.services";


@ApiTags('Produto')
@UseGuards(JwtAuthGuard)
@Controller("/produtos")
@ApiBearerAuth()
export class ProdutoController {
  constructor(private readonly produtoService: produtoService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findByTitulo(@Param('titulo') titulo: string): Promise<Produto[]> {
    return this.produtoService.findByTitulo(titulo);
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
  delete(@Param('id', ParseIntPipe) id: number){
    return this.produtoService.delete(id);
  }

}