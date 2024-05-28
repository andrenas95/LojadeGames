import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaService } from "./services/categoria.services";
import { Categoria } from "./entities/categoria.entity";
import { CategoriaController } from "./controllers/categoria.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    providers: [CategoriaService],
    controllers: [CategoriaController],
    exports: [TypeOrmModule]
})
export class CategoriaModule {}