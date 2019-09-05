import { IResolvers } from "graphql-middleware/dist/types";
import { GraphQLBoolean } from "graphql";
import { v1 } from "uuid";
import { User } from "./entity/User";
import { Message } from "./entity/Message";
import { chainResolvers } from "graphql-tools";

export const resolvers: IResolvers = {
  //   Mutation: {
  //     register: (
  //       _: any,
  //       { email, password }: GQL.IRegisterOnMutationArguments
  //     ) => {
  //       User.create({
  //         email,
  //         password
  //       }).save();
  //       return true;
  //     }
  //   },
  Query: {
    messages: async (_: any, { offset, count, replyTo }: any) => {
      let mes = await Message.find();
      const x = await User.findOne();
      mes[0].likes = [x];
      mes[0].user = x;
      console.log(x, "x");
      console.log(mes);
      return mes;
    },
    message: async (_: any, {}) => {
      return await Message.findOne();
    },
    dupa: async () => {
      const x = await Message.findOne();
      const y = await Message.find();
      console.log(y);
      console.log(x);
      return x;
    },
    me: async (_: any, {}) => await User.findOne()
  },
  Subscription: {
    newMessages: {
      subscribe: () => (_: any, {}) => Message.findOne()
    }
  },
  Mutation: {
    changeName: () => (_: any, {}) => Message.findOne(),
    like: () => (_: any, {}) => Message.findOne(),
    postTweet: () => (_: any, {}) => Message.findOne(),
    addUser: (_: any, { name, avatar }: GQL.IUser) => {
      const id = v1();
      let user = new User();
      user.id = id;
      user.name = name;
      user.avatar = avatar;
      console.log(user);
      user.save();
      return user;
    }
  }
};
