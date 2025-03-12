import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioService } from './UsuarioService';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    return this.usuarioService.criaUsuario(dadosDoUsuario);
  }

  @Get()
  async listUsuarios(): Promise<ListaUsuarioDTO[]> {
    return this.usuarioService.listUsuarios();
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    return this.usuarioService.atualizaUsuario(id, novosDados);
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    return this.usuarioService.removeUsuario(id);
  }
}
