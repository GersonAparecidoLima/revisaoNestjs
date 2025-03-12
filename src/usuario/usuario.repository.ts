import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
//vamos isolar a lógica para salvar dados do usuário
export class UsuarioRepository {
        //criando uma variavel com um array vazio
        private usuarios: UsuarioEntity[] = [];

    async salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario);
    }

    async listar() {
        return this.usuarios;
      }

      
    async existeComEmail(email: string) {
        const possivelUsuario = this.usuarios.find(
            usuario => usuario.email === email
        );
    
        return possivelUsuario !== undefined;
    }

    public buscaPorId(id: string) {
        const possivelUsuario = this.usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        );
    
        if(!possivelUsuario) {
            throw new Error('Usuário não existe');
        }
    
        return possivelUsuario;
    }


    async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
        const usuario = this.buscaPorId(id);
    
        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if (chave === 'id') {
                return;
            }
    
            usuario[chave] = valor;
        });
    
        return usuario;
    }


    async remove(id: string){
        const usuario = this.buscaPorId(id);
        this.usuarios = this.usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        );
    
        return usuario;
    }
}

