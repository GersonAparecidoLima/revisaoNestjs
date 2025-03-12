import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { EmailEhUnicoValidator } from './validacao/email-eh-unico.validator';
import { UsuarioService } from './UsuarioService';// Certifique-se de importar o UsuarioService

@Module({
  imports: [], // Pode ficar vazio por enquanto, a não ser que você precise importar outros módulos
  controllers: [UsuarioController], // A controller para lidar com requisições HTTP
  providers: [
    UsuarioService,         // Adiciona o UsuarioService como provider
    UsuarioRepository,      // Adiciona o UsuarioRepository
    EmailEhUnicoValidator   // Adiciona o EmailEhUnicoValidator, se necessário
  ],
})
export class UsuarioModule {}
