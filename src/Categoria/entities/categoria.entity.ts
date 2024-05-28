import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../Produto/entities/produto.entity';


@Entity({ name: 'tb_categoria' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  descricao: string;

  @OneToMany(() => Produto, (produto) => produto.Categoria)
  produto: Produto[]; // Listar todas as produtos associadas ao Tema;
}
