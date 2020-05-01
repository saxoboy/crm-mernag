import bcrypt from 'bcrypt';
import { getToken } from '../../config/middleware/auth';

export default {
    Mutation: {
        async login(root, { input }, { models: { user } }) {
            let { email, password } = input;
            try {
                let User = await user.findOne({ email }, 'id role name username email password');

                if (User && bcrypt.compareSync(password, User.password)) {
                    return {
                        ok: true,
                        message: 'Authenticated',
                        me: { user: User.id, role: User.role, name: User.name, username: User.username, email: User.email },
                        token: getToken({ user: User.id, role: User.role })
                    };

                } else return {
                    ok: false,
                    message: 'Incorrect email or password'
                };

            } catch (err) {
                return {
                    ok: false,
                    message: err.message
                };
            }
        }
    }
};