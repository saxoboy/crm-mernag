import { createError } from 'apollo-errors'
import { baseResolver } from './baseResolver'

export const ForbiddenError = createError('ForbiddenError', {
    message: 'You do not have permission to perform this action.'
});

export const AuthenticationRequiredError = createError('AuthenticationRequiredError', {
    message: 'You must log in to do this'
});

export const isAuth = baseResolver.createResolver(
    // Extraer el usuario del contexto (indefinido si no existe)
    (root, args, { user: { id } }, info) => {
        if (!id) throw new AuthenticationRequiredError()    
    }
);

export const isAdmin = isAuth.createResolver(
    // Extraer el usuario y asegúrese de que es un administrador.
    (root, args, { user: { role } }, info) => {
        if (role !== 'ADMIN') throw new ForbiddenError()
    }
)