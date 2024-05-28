import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: {
        produto: true,
      },
    });
  }

  async findById(id: number): Promise<Categoria> {
    const Categoria = await this.categoriaRepository.findOne({
      where: {
        id,
      },
      relations: {
        produto: true,
      },
    });

    if (!Categoria)
      throw new HttpException(
        'Categoria não encontrado!',
        HttpStatus.NOT_FOUND,
      );

    return Categoria;
  }

  async findByDescricao(descricao: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
      relations: {
        produto: true,
      },
    });
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    const buscaCategoria: Categoria = await this.findById(categoria.id);

    if (!buscaCategoria || !categoria.id)
      throw new HttpException(
        'Categoria não foi encontrado!',
        HttpStatus.NOT_FOUND,
      );

    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    const buscaCategoria: Categoria = await this.findById(id);

    if (!buscaCategoria)
      throw new HttpException(
        'Categoria não foi encontrado!',
        HttpStatus.NOT_FOUND,
      );

    return await this.categoriaRepository.delete(id);
  }
}
