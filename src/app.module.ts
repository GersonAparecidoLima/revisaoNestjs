    import { Module } from '@nestjs/common';
    import { ProdutoModule } from './produto/produto.module';
    import { UsuarioModule } from './usuario/usuario.module';
    
    @Module({
         imports: [UsuarioModule, ProdutoModule],
         controllers: [],
         providers: [],     
    })
    export class AppModule {}    