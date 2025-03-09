import { Injectable } from '@nestjs/common';

@Injectable()
//vamos isolar a lógica para salvar dados do usuário
export class UsuarioRepository {
        //criando uma variavel com um array vazio
    private usuarios = [];

    async salvar(usuario) {
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

}

