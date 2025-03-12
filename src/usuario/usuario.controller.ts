import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
      const usuarioEntity = new UsuarioEntity();
      usuarioEntity.email = dadosDoUsuario.email;
      usuarioEntity.senha = dadosDoUsuario.senha;
      usuarioEntity.nome = dadosDoUsuario.nome;
      usuarioEntity.id =   uuid();
  
      this.usuarioRepository.salvar(usuarioEntity);
      return {
        usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
        mensagem: 'usuário criado com sucesso'
    };
    
  }

  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );

    return usuariosLista;
  }

  
/*
  @Put('/:id')
  async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
      const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);
  
      return {
          usuario: usuarioAtualizado,
          mensagem: 'usuário atualizado com sucesso',
      }
  
  }
*/
@Put('/:id')
async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
  try {
    // Verifica se o usuário existe antes de tentar atualizar
    const usuarioExistente = await this.usuarioRepository.buscaPorId(id);
    if (!usuarioExistente) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);

    return {
      usuario: usuarioAtualizado,
      mensagem: 'Usuário atualizado com sucesso',
    };
  } catch (error) {
    // Tratar erro específico de não encontrado
    if (error instanceof NotFoundException) {
      throw error; // Já tem uma mensagem adequada
    }

    // Para qualquer outro erro, lançar BadRequestException
    throw new BadRequestException(`Erro ao atualizar o usuário com ID ${id}. Tente novamente.`);
  }
}

@Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    try {
      // Verifica se o usuário existe antes de tentar remover
      const usuarioExistente = await this.usuarioRepository.buscaPorId(id);
      if (!usuarioExistente) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }

      const usuarioRemovido = await this.usuarioRepository.remove(id);

      return {
        usuario: usuarioRemovido,
        mensagem: 'Usuário removido com sucesso',
      };
    } catch (error) {
      // Tratar erro específico de não encontrado
      if (error instanceof NotFoundException) {
        throw error; // Já tem uma mensagem adequada
      }

      // Para qualquer outro erro, lançar BadRequestException
      throw new BadRequestException(`Erro ao remover o usuário com ID ${id}. Tente novamente.`);
    }
  }

}
