import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Categoria } from "src/Categoria/entities/categoria.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: "tb_produto"})
export class Produto{

    @PrimaryGeneratedColumn() // Chave Primária e Auto_Increment
    id: number;

    // Validação para espaços em branco
    @Transform(({ value }: TransformFnParams) => value?.trim()) 
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    titulo: string;

    // Validação para espaços em branco
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    genero: string;

     // Validação para espaços em branco
     @Transform(({ value }: TransformFnParams) => value?.trim())
     @IsNotEmpty()
     @Column({length: 1000, nullable: false})
     texto: string;

     // Validação para espaços em branco

     @Transform(({ value }: TransformFnParams) => value?.trim())
     @IsNotEmpty()
     @Column({length: 1000, nullable: false})
     foto: string;     

     // Validação para espaços em branco
     @Transform(({ value }: TransformFnParams) => value?.trim())
     @IsNotEmpty()
     @Column({nullable: false})
     preco: number;     
 

     @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria
}

