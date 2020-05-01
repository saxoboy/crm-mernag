import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

let units = {
    values: ['PIECES', 'METER', 'KG'],
    message: '{VALUE} no es una unidad válida'
}

let Schema = mongoose.Schema;

let productSchema =  new Schema({
    code: {
        type: String,
        unique: true,
        required: [true, 'The code is necessary'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'The name is necessary'],
        trim: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    stock: {
        type: Number,
        required: [true, 'The stock is necessary'],
        trim: true
    },
    brand: {
        type: String,
        trim: true
    },    
    unit: {
        type: String,
        default: 'PRODUCT_UNIT',
        enum: units
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date
    },
    status: {
        type: Boolean,
        default: true
    }
})

productSchema.plugin(uniqueValidator, { message: '{PATH} it must be unique' });
export default mongoose.model('Product', productSchema);