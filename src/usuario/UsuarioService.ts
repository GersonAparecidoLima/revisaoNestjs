import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioEntity } from './usuario.entity';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  // Criar um novo usuário
  async criaUsuario(dadosDoUsuario: CriaUsuarioDTO): Promise<any> {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.id = uuid();

    await this.usuarioRepository.salvar(usuarioEntity);

    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      mensagem: 'Usuário criado com sucesso',
    };
  }

  // Listar todos os usuários
  async listUsuarios(): Promise<ListaUsuarioDTO[]> {
    const usuariosSalvos = await this.usuarioRepository.listar();
    return usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
  }

  // Atualizar um usuário
  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO): Promise<any> {
    try {
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
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException(`Erro ao atualizar o usuário com ID ${id}. Tente novamente.`);
    }
  }

  // Remover um usuário
  async removeUsuario(id: string): Promise<any> {
    try {
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
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException(`Erro ao remover o usuário com ID ${id}. Tente novamente.`);
    }
  }
}
