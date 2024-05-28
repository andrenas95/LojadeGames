import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { Categoria } from './Categoria/entities/categoria.entity';
import { Produto } from './Produto/entities/produto.entity';
import { ProdutoModule } from './Produto/produto.module';
import { CategoriaModule } from './Categoria/categoria.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_lojadegames',
      entities: [Categoria, Produto, Usuario],
      synchronize: true,
    }),
    CategoriaModule,
    ProdutoModule,
    UsuarioModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}