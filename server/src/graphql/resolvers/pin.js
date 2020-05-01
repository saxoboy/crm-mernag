import { pubsub } from "../../config/apollo";
import { isAuth } from "../../config/errors/authentication";

// Exporto mis suscripciones, querys y mutations para unirme con los otros resolvers
export default {
  Subscription: {
    newPin: {
      subscribe: () => pubsub.asyncIterator("PIN_ADDED")
    },
    pinUpdated: {
      subscribe: () => pubsub.asyncIterator("PIN_UPDATED")
    },
    pinDeleted: {
      subscribe: () => pubsub.asyncIterator("PIN_DELETE")
    }
  },

  Query: {
    getPins: async (root, { since = 0, limit = 10 }, { models: { pin } }) => {
      try {
        return await pin
          .find({})
          .skip(since)
          .limit(limit)
          .populate("author")
          .populate("comments.author");
      } catch (err) {
        return { ok: false, message: err.message };
      }
    }
  },

  Mutation: {
    createPin: isAuth.createResolver(
      async (root, { input }, { user: { id }, models: { pin } }) => {
        let { title, image, content, latitude, longitude } = input;
        try {
          let newPin = new pin({
            title,
            image,
            content,
            latitude,
            longitude,
            author: id
          });
          await newPin.save();
          // Active eventTrigger
          pubsub.publish("PIN_ADDED", { newPin });

          return {
            ok: true,
            message: "Pin Created correctly"
          };
        } catch (err) {
          return { ok: false, message: err.message };
        }
      }
    ),

    createComment: isAuth.createResolver(
      async (root, { pinId, text }, { user: { id }, models: { pin } }) => {
        let query = { _id: pinId };
        let newComment = {
          author: id,
          text: text
        };
        let props = {
          new: true,
          runValidators: true,
          context: "query"
        };
        try {
          const pinUpdated = await pin
            .findOneAndUpdate(query, { $push: { comments: newComment } }, props)
            .populate("author")
            .populate("comments.author");

          pubsub.publish(PIN_UPDATED, { pinUpdated });
          console.log(" esto es: " + pinUpdated);
          return {
            ok: true,
            message: "Coment Pin Created correctly"
          };
        } catch (err) {
          return { ok: false, message: "The Pin ID does not exist" };
        }
      }
    ),

    deletePin: isAuth.createResolver(
      async (root, { id }, { models: { pin } }) => {
        try {
          let query = { _id: id };
          let pinDeleted = await pin.findByIdAndRemove(query);

          // Active eventTrigger
          pubsub.publish("PIN_DELETE", { pinDeleted });

          if (!pinDeleted)
            return { ok: false, message: "It was previously removed" };
          return { ok: true, message: "Removed correctly" };
        } catch (err) {
          return { ok: false, message: "The id does not exist" };
        }
      }
    )
  }
};
