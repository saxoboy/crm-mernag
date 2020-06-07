import bcrypt from "bcrypt";
import { isAdmin, isAuth, ForbiddenError } from "../../config/errors/authentication";
import { pubsub } from "../../config/apollo";

/* "isAuth" verifica que el usuario haya iniciado sesión y que el token sea válido, si pasa las validaciones, entonces ejecuta el resolver que contiene dentro */

/* "isAdmin" verifica que el usuario haya iniciado sesión, que el token sea válido y que su ROLE sea ADMIN, si pasa las validaciones, entonces ejecuta el resolver que contiene dentro */

// Exporto mis querys, mutations y subscription para unirme con los otros resolvers

export default {
  Subscription: {
    newUser: { subscribe: () => pubsub.asyncIterator("NEW_USER") },
    updateInfoUser: { subscribe: () => pubsub.asyncIterator("UPDATE_INFO_USER") },
    
  },

  Query: {  
    getUsers: isAuth.createResolver(
      async (root, { since = 0, limit = 10 }, { models: { user } }) => {
        try {
          return await user.find({ status: true }).skip(since).limit(limit);
        } catch (err) {
          return { ok: false, message: err.message };
        }
      }
    ),

    getUser: isAuth.createResolver(
      async (root, { id }, { models: { user } }) => {
        try {
          return await user.findOne({ status: true, _id: id });
        } catch (err) {
          return { ok: false, message: err.message };
        }
      }
    ),

    me: isAuth.createResolver(
      async (root, {}, { user: { id }, models: { user } }) => {
        if (!id) {
          return null;
        }
        try {
          return await user.findOne(
            { status: true, _id: id },
            "id name username email photo role"
          );
        } catch (err) {
          return { ok: false, message: err.message };
        }
      }
    ),
  },

  Mutation: {
    createUser: isAdmin.createResolver(
      async (root, { input }, { models: { user } }) => {
        let { name, username, email, password, role } = input;
        try {
          let newUser = new user({
            name,
            username,
            email,
            password: bcrypt.hashSync(password, 10),
            role,
          });

          await newUser.save();

          // Active eventTrigger
          pubsub.publish("NEW_USER", { newUser });

          return {
            ok: true,
            message: "Created correctly",
            data: { newUser },
          };
        } catch (err) {
          return { ok: false, message: err.message };
        }
      }
    ),

    updateInfoUser: isAuth.createResolver(
      async (root, { id, input }, { models: { user } }) => {
        const { name, username, email, role } = input;
        let query = { _id: id, status: true };
        let update = {
          $set: {
            name,
            username,
            email,
            role,
            updated_at: Date.now(),
          },
        };
        let props = {
          new: true,
          runValidators: true,
          context: "query",
        };

        try {
          //let confUserName = user.findOne({ username: username });
          let updateInfoUser = await user.findOneAndUpdate(
            query,
            update,
            props
          );

          // Active eventTrigger
          pubsub.publish("UPDATE_INFO_USER", { updateInfoUser });

          return {
            ok: true,
            message: "Updated successfully",
            data: { updateInfoUser },
          };
        } catch (err) {
          return { ok: false, message: err.message };
        }
      }
    ),

    updatePhotoUser: isAuth.createResolver(
      async (root, { id, input }, { models: { user } }) => {
        const { photo } = input;
        let query = { _id: id, status: true };
        let update = {
          $set: {
            photo,
            updated_at: Date.now(),
          },
        };
        let props = {
          new: true,
          runValidators: true,
          context: "query",
        };

        try {
          let updateUser = await user.findOneAndUpdate(query, update, props);

          return {
            ok: true,
            message: "Updated successfully",
            data: { updateUser },
          };
        } catch (err) {
          return { ok: false, message: err.message };
        }
      }
    ),

    updatePasswordUser: isAuth.createResolver(
      async (root, { id, input }, { models: { user } }) => {
        const { password } = input;
        let query = { _id: id, status: true };
        let update = {
          $set: {
            password: bcrypt.hashSync(password, 10),
            updated_at: Date.now(),
          },
        };
        let props = {
          new: true,
          runValidators: true,
          context: "query",
        };

        try {
          let updateUser = await user.findOneAndUpdate(query, update, props);

          return {
            ok: true,
            message: "Updated successfully",
            data: { updateUser },
          };
        } catch (err) {
          return { ok: false, message: err.message };
        }
      }
    ),

    deleteUser: isAdmin.createResolver(
      async (root, { id }, { user: { role }, models: { user } }) => {
        // If the user does not have the permissions to create more users, we return an error
        if (role !== "ADMIN") throw new ForbiddenError();

        try {
          let query = { _id: id, status: true };
          //let update = { $set: { status: false } };
          //var User = await user.findOneAndUpdate(query, update);
          let User = await user.findOneAndRemove(query);

          if (!User) return { ok: false, message: "It was previously removed" };
          return { ok: true, message: "Removed correctly" };
        } catch (err) {
          return { ok: false, message: "The id does not exist" };
        }
      }
    ),
  },
};

/* // Edit full user
updateUser: isAuth.createResolver(
      async (root, { id, input }, { models: { user } }) => {
        const { name, username, email, photo, password, role } = input;
        let query = { _id: id, status: true };
        let update = {
          $set: {
            name,
            username,
            email,
            photo,
            password: bcrypt.hashSync(password, 10),
            updated_at: Date.now(),
            role,
          },
        };
        let props = {
          new: true,
          runValidators: true,
          context: "query",
        };

        try {
          let updateUser = await user.findOneAndUpdate(query, update, props);

          // Active eventTrigger
          pubsub.publish("UPDATE_USER", { updateUser });

          return {
            ok: true,
            message: "Updated successfully",
            data: { updateUser },
          };
        } catch (err) {
          return { ok: false, message: err.message };
        }
      }
    ),
*/
//suscripcion
//updateUser: { subscribe: () => pubsub.asyncIterator("UPDATE_USER") },