import { pubsub } from "../../config/apollo";
import { isAuth } from "../../config/errors/authentication";

// Exporto mis suscripciones, querys y mutations para unirme con los otros resolvers
export default {
  Subscription: {
    newClient: { subscribe: () => pubsub.asyncIterator("NEW_CLIENT") },
    updateClient: { subscribe: () => pubsub.asyncIterator("UPDATE_CLIENT") },
  },

  //Query: {}, 

  Mutation: {
    clientCreate: isAuth.createResolver(
      async (root, { input }, { user: { user }, models: { client } }) => {
        let { name, lastname, empresa, email, phone } = input;
        try {
          let newClient = new client({
            name,
            lastname,
            empresa,
            email,
            phone,
            user,
          });
          await newClient.save();
          // Active eventTrigger
          pubsub.publish("NEW_CLIENT", { newClient });
          return {
            ok: true,
            message: "Client Created correctly",
            data: { newClient },
          };
        } catch (err) {
          return { ok: false, message: err.message };
        }
      }
    ),
  },
};
