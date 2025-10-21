import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js';
import hash from '@adonisjs/core/services/hash'
import { LoginValidator } from '../validators/auth.js';

export default class AuthController {

    public async login({ response, request }: HttpContext) {

        const data = await request.validateUsing(LoginValidator);

        try {
            const user = await User.findBy('email', data.email)

            if (!user)
                return response.unauthorized({ message: 'Credenciais inválidas' });

            const isPasswordValid = await hash.verify(user.password, data.password);

            if (!isPasswordValid)
                return response.unauthorized({ message: 'Credenciais inválidas' });

            const token = await User.accessTokens.create(user);
            return (response.ok({
                token, user: {
                    id: user.id,
                    email: user.email,
                    funcao_id: user.funcao_id
                }
            }));

        } catch (error) {
            return response.unauthorized({ message: 'Credenciais inválidas' })
        }
    }

    public async register({ request, response }: HttpContext) {
        try {


            const { email, password, last_name, fist_name } = request.only(['email', 'fist_name', 'last_name', 'password']);

            const existUser = await User.findBy({ email });

            if (existUser)
                return response.status(500).json({ message: "Usuario existente\n:" });

            const username = fist_name.toLowerCase() + "." + last_name.toLowerCase();


            const user = await User.create({ email, last_name, fist_name, password, username });

            const token = await User.accessTokens.create(user);
            return (token);
        } catch (error) {
            return response.status(500).json({ message: "erro no cadastro \n:" + error });
        }
    }

    public async logout({ auth, response }: HttpContext) {
        await auth.use('api').invalidateToken();
        return response.ok({ message: 'Logout realizado com sucesso' })
    }

    public async me({ auth, response }: HttpContext) {
        const utilizador = auth.user!
        await utilizador.load('funcao')

        return response.ok({
            utilizador: {
                id: utilizador.id,
                email: utilizador.email,
                funcao: utilizador.funcao,
                agencia_id: utilizador.agencia_id
            }
        })
    }

    index() {
        return (User.all());
    }
}