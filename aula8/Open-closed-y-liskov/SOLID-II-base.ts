import FakeApi from './fakeApi';

interface IUsuario {
    nome: string;
    sobrenome: string;
    email: string;
}

// NOTA: Você pode executar o projeto com o comando yarn run-start.

// Para este exemplo, começamos com uma classe User que possui certos métodos predefinidos.
// Temos um método de login que nos permite fazer login em nossa aplicação.
// Além disso, temos um método changePassword que nos permite alterar a senha do nosso usuário. Este método é
// acessível a qualquer usuário.
// Por fim, temos um método changeEmail que nos permite alterar o email de qualquer usuário. Este método é
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

    async mudarEmail(email: string, novaEmail: string) {
        try {
            await this.API.mudarEmail(email, novaEmail);
            console.log(`E-mail alterado com sucesso`);
        } catch (error: any) {
            console.log(error.message);
        }
    }
}

// Aqui vamos criar dois usuários. Um deles é um usuário administrador e o outro é um usuário normal.

const usuarioAdmin = new Usuario('Felipe', 'Steve', 'felipe@gmail.com');
const usuarioNormal = new Usuario('Sergio', 'Silva', 'sergio@gmail.com');

// Para o caso do usuário administrador, vemos que podemos usar o método mudarEmail sem problemas.

usuarioAdmin.mudarEmail('felipe@gmail.com', 'felipe2@gmail.com');

// Mas o que acontece se chamarmos o método mudarEmail do nosso usuário normal?

usuarioNormal.mudarEmail('sergio@gmail.com', 'sergio2@gmail.com');

// Como podemos ver, o usuário normal tem acesso para alterar seu e-mail, mas não deve poder fazer essa alteração.
// Para resolver este problema, teríamos que substituir o método mudarEmail do nosso usuário normal. Mas isso
// não é uma boa ideia, pois estaríamos violando alguns princípios que fazem parte do SOLID. Por isso, vamos
// refatora nosso código para poder atingir nosso objetivo.
