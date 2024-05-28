import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class produtoService{
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ){}

    async findAll(): Promise<Produto[]>{
        return await this.produtoRepository.find();

        // SELECT * FROM tb_produtos;
    }

    async findById(id: number): Promise<Produto> {

        let produto = await this.produtoRepository.findOne({
            where:{
                id
            }
        });

        // Checar se a Produto não foi encontrada
        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        // Retornar a Produto, caso ela exista
        return produto;

        // SELECT * FROM tb_produtos WHERE id = ?;
    }

    async findByTitulo(titulo: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`)
            }
        })

        // SELECT * FROM tb_produtos WHERE titulo LIKE '%titulo%';
    }

    async create(produto: Produto): Promise<Produto>{
        return await this.produtoRepository.save(produto);

         // INSERT INTO tb_produtos (titulo, texto, data) VALUES (?, ?, server);
    }

    async update(produto: Produto): Promise<Produto>{
        
        let buscaProduto: Produto = await this.findById(produto.id);
        
        if (!buscaProduto || !produto.id)
            throw new HttpException('Produto não foi encontrado!', HttpStatus.NOT_FOUND)

        return await this.produtoRepository.save(produto);

         // UPDATE tb_produtos SET titulo = ?, texto = ?, data = server WHERE id = ?;

    }

    async delete(id: number): Promise<DeleteResult>{
        
        let buscaProduto: Produto = await this.findById(id);
        
        if (!buscaProduto)
            throw new HttpException('Produto não foi encontrado!', HttpStatus.NOT_FOUND)

        return await this.produtoRepository.delete(id);
        
    }

}