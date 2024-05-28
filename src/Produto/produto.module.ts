import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { produtoService } from './services/produto.services';
import { ProdutoController } from './controllers/produto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  providers: [produtoService],
  controllers: [ProdutoController],
  exports: [TypeOrmModule],
})
export class ProdutoModule {}
