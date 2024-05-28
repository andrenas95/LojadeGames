import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Categoria } from "../../Categoria/entities/categoria.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";


@Entity({name: "tb_produtos"})
export class Produto {

    @ApiProperty()  
    @PrimaryGeneratedColumn()    
    id: number

    @ApiProperty()  
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    titulo: string

    @ApiProperty()  
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string

    @ApiProperty()  
    @UpdateDateColumn()
    data: Date
    
    @ApiProperty({ type: () => Categoria })  
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    Categoria: Categoria

    @ApiProperty({ type: () => Usuario })  
    @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
        onDelete: "CASCADE"
    })
    usuario: Usuario

}