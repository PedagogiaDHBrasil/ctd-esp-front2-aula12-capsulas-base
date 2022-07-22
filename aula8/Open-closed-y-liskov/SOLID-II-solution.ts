import FakeApi from './fakeApi';

interface IUsuario {
    nome: string;
    sobrenome: string;
    email: string;
}

// NOTA: Você pode executar o projeto com o comando yarn run-start.

// Para este exemplo, começamos com uma classe User que possui certos métodos predefinidos.
// Temos um método de login que nos permite fazer login em nossa aplicação.
// Além disso, temos um método mudarPassword que nos permite alterar a senha do nosso usuário. Este método é
// acessível a qualquer usuário.
// Por fim, temos um método mudarEmail que nos permite alterar o email de qualquer usuário. Este método é
// acessível apenas a um usuário que tenha permissões de administrador.

class Usuario {
    nome: IUsuario['nome'];
    sobrenome: IUsuario['sobrenome'];
    email: IUsuario['email'];
    API: FakeApi;

    constructor(
        nome: IUsuario['nome'],
        sobrenome: IUsuario['sobrenome'],
        email: IUsuario['email'],
    ) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.API = new FakeApi();
    }

    async login(senha: string) {
        try {
            const usuario = await this.API.login(this.email, senha);
            console.log(`Bem vindo ${usuario.nome} ${usuario.sobrenome}`);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    async mudarSenha(senha: string, novaSenha: string) {
        try {
            await this.API.mudarSenha(this.email, senha, novaSenha);
            console.log(`Senha alterada com sucesso`);
        } catch (error: any) {
            console.log(error.message);
        }
    }
}

// Criamos uma classe Administrator que herda de User e possui métodos específicos para administradores.
// Neste caso, o administrador poderá alterar o email de qualquer usuário.

class UsuarioAdministrador extends Usuario {
    async mudarEmail(email: string, novaEmail: string) {
        try {
            await this.API.mudarEmail(email, novaEmail);
            console.log(`E-mail alterado com sucesso`);
        } catch (error: any) {
            console.log(error.message);
        }
    }
}

// Neste caso, criamos cada tipo de usuário usando a classe especificada para cada caso.
const usuarioAdmin = new UsuarioAdministrador(
    'Felipe',
    'Steve',
    'felipe@gmail.com',
);
const usuarioNormal = new Usuario('Sergio', 'Silva', 'sergio2@gmail.com');

// Agora, se chamarmos o método mudarEmail do usuário administrador, podemos realizar a operação.
// Se chamarmos o método mudarEmail do usuário normal, não podemos realizar a operação, pois o referido método
// não existe na classe User.

usuarioAdmin.mudarEmail('felipe@gmail.com', 'felipe2@gmail.com');
usuarioNormal.mudarEmail('sergio@gmail.com', 'sergio2@gmail.com');
