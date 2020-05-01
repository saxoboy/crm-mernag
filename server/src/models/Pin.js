import moongoose from 'mongoose';
//import uniqueValidator from 'mongoose-unique-validator';

let Schema = moongoose.Schema;

let pinSchema =  new Schema({
    title: {
        type: String,
        required: [true, 'The title is necessary']
    },
    content: {
        type: String,
        required: [true, 'The content is necessary']
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/delizacakeart/image/upload/t_media_lib_thumb/v1564818204/not-available-es.png'
    },
    latitude: {
        type: Number,
        required: [true, 'The latitude is necessary']
    },
    longitude: {
        type: Number,
        required: [true, 'The longitude is necessary']
    },
    author: { type: moongoose.Schema.ObjectId, ref: "User" },
    comments: [
      {
        text: String,
        createdAt: { type: Date, default: Date.now },
        author: { type: moongoose.Schema.ObjectId, ref: "User" }
      }
    ]
  }, { timestamps: true }
);
//pinSchema.plugin(uniqueValidator, { message: '{PATH} it must be unique' });

export default moongoose.model('Pin', pinSchema);