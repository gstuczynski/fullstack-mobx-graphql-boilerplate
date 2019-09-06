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
    messages: async () => await Message.find(),
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
    me: async (_: any, {}) => await User.findOne(),
    users: async () => await User.find()
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
    },
    addMessage: async (_: any, { userId, text }: any) => {
      let m = new Message();
      const u = await User.findOne();
      console.log(u, "sss");
      m.id = v1();
      m.timestamp = "00:00:00";
      m.user = u;
      m.text = text;
      m.likes = u;
      console.log(m);
      m.save();
      return m;
    }
  }
};
