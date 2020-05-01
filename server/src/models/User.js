import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

let roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;

let userSchema =  new Schema({
    name: {
        type: String,
        required: [true, 'The name is necessary'],
        trim: true
    },
    username: {
        type: String,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is necessary'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'The password is necessary'],
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles
    },
    status: {
        type: Boolean,
        default: true
    }
});

// Eliminar la contraseña cuando se realiza una consulta (por seguridad).
userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} it must be unique' });

export default mongoose.model('User', userSchema);