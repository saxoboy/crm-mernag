import { pubsub } from "../../config/apollo";
import { isAuth } from "../../config/errors/authentication";

// Exporto mis suscripciones, querys y mutations para unirme con los otros resolvers
export default {
  Subscription: {
    newProduct: { subscribe: () => pubsub.asyncIterator("NEW_PRODUCT") },
    updateProduct: { subscribe: () => pubsub.asyncIterator("UPDATE_PRODUCT") },
  },

  Query: {
    getProducts: isAuth.createResolver(
      async (root, { since = 0, limit = 10 }, { models: { product } }) => {
        try {
          return await product.find({ status: true }).skip(since).limit(limit);
        } catch (err) {
          return { ok: false, message: err.message };
        }
      }
    ),

    getProduct: isAuth.createResolver(
      async (root, { id }, { models: { product } }) => {
        try {
          return await product.findOne({ status: true, _id: id });
        } catch (err) {
          return { ok: false, message: err.message };
        }
      }
    ),
  },

  Mutation: {
    createProduct: isAuth.createResolver(
      async (root, { input }, { models: { product } }) => {
        let { code, name, description, image, stock, brand, unit } = input;
        try {
          let newProduct = new product({
            code,
            name,
            description,
            image,
            stock,
            brand,
            unit,
          });
          await newProduct.save();
          // Active eventTrigger
          pubsub.publish("NEW_PRODUCT", { newProduct });
          return {
            ok: true,
            message: "Product Created correctly",
            data: { newProduct },
          };
        } catch (err) {
          return { ok: false, message: err.message };
        }
      }
    ),

    updateProduct: isAuth.createResolver(
      async (root, { id, input }, { models: { product } }) => {
        const { code, name, description, image, stock, brand, unit, updated_at } = input;
        let query = { _id: id, status: true };
        let update = {
          $set: {
            code,
            name,
            description,
            image,
            stock,
            brand,
            unit,  
            updated_at: Date.now()
          },
        };
        let props = {
          new: true,
          runValidators: true,
          context: "query",
        };

        try {
          let updateProduct = await product.findOneAndUpdate(query, update, props);

          // Active eventTrigger
          pubsub.publish("UPDATE_PRODUCT", { updateProduct });

          return {
            ok: true,
            message: "Updated successfully",
            data: { updateProduct },
          };
        } catch (err) {
          return { ok: false, message: err.message };
        }
      }
    ),

    deleteProduct: isAuth.createResolver(
      async (root, { id }, { user: { role }, models: { product } }) => {
        // If the user does not have the permissions to create more users, we return an error
        if (role !== "ADMIN") throw new ForbiddenError();

        try {
          let query = { _id: id, status: true };
          //let update = { $set: { status: false } };
          //var User = await user.findOneAndUpdate(query, update);
          let Product = await product.findOneAndRemove(query);

          if (!Product) return { ok: false, message: "This product it was previously removed" };
          return { ok: true, message: "Removed correctly" };
        } catch (err) {
          return { ok: false, message: "The id does not exist" };
        }
      }
    ),
  },
};
