interface Usuario {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
}

type Usuarios = Usuario[];

const usuariosFalsos: Usuarios = [
    {
        id: 1,
        nome: 'Felipe',
        sobrenome: 'Steve',
        email: 'felipe@gmail.com',
        senha: 'steve1234',
    },
    {
        id: 2,
        nome: 'Sergio',
        sobrenome: 'Silva',
        email: 'sergio@gmail.com',
        senha: 'silva1234',
    },
];

export default class FakeApi {
    async login(
        email: Usuario['email'],
        senha: Usuario['senha'],
    ): Promise<Usuario> {
        return new Promise((resolve, reject) => {
            const usuarioExistente = usuariosFalsos.find(
                (usuario) => usuario.email === email && usuario.senha === senha,
            );

            if (usuarioExistente) {
                resolve(usuarioExistente);
            } else {
                reject(new Error('Usuário com senha incorreto'));
            }
        });
    }

    public async mudarSenha(
        email: Usuario['email'],
        senha: Usuario['senha'],
        novaSenha: Usuario['senha'],
    ): Promise<Usuario> {
        return new Promise((resolve, reject) => {
            const usuarioExistente = usuariosFalsos.find(
                (usuario) => usuario.email === email && usuario.senha === senha,
            );

            if (usuarioExistente) {
                usuarioExistente.senha = novaSenha;
                resolve(usuarioExistente);
            } else {
                reject(new Error('Usuário com senha incorreto'));
            }
        });
    }

    public async mudarEmail(
        email: Usuario['email'],
        novaEmail: Usuario['email'],
    ): Promise<Usuario> {
        return new Promise((resolve, reject) => {
            const usuarioExistente = usuariosFalsos.find(
                (usuario) => usuario.email === email,
            );

            if (usuarioExistente) {
                usuarioExistente.email = novaEmail;
                resolve(usuarioExistente);
            } else {
                reject(new Error('Usuário com senha incorreto'));
            }
        });
    }
}
