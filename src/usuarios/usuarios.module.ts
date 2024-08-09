import { Module } from '@nestjs/common';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosController } from './controllers/usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bcrypt } from '../auth/bcrypt/bcrypt';
import { Usuario } from './entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuariosService, Bcrypt],
  controllers: [UsuariosController],
  exports: [UsuariosService]
})
export class UsuariosModule {}
