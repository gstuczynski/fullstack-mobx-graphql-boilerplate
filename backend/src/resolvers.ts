import { IResolvers } from "graphql-middleware/dist/types";
import { GraphQLBoolean } from "graphql";
import { v1 } from "uuid";
import { User } from "./entity/User";
import { Message } from "./entity/Message";
import { chainResolvers } from "graphql-tools";
import { getRepository } from "typeorm";

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
    message: async (_: any, {}) => {
      return await Message.findOne();
    },
    messages: async (_: any, {}) =>
      await getRepository(Message)
        .createQueryBuilder("message")
        .leftJoinAndSelect("message.user", "user")
        .getMany(),
    dupa: async () => {
      const x = await Message.findOne();
      const y = await User.findOne();

      //console.log(getRepository(User));
      const z = await getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.messages", "message")
        //.where("")
        .getMany();
      console.log(z);

      return z;
    },
    me: async (_: any, {}) => await User.findOne(),
    users: async (_: any, {}) =>
      await getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.messages", "message")
        .getMany()
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
    createUser: (_: any, { name, avatar }: GQL.IUser) => {
      return User.create({
        id: v1(),
        //@ts-ignore
        namssse: 1,
        avatar
      })
        .then(user => user.save())
        .catch(err => {
          throw new Error("dupa");
        });
    },
    addUser: async (_: any, { name, avatar }: GQL.IUser) => {
      const id = v1();
      let user = await new User();
      user.id = id;
      //@ts-ignore
      user.name = name;
      user.avatar = avatar;
      user.messages = [];
      user.likes = [];
      return user
        .save()
        .then(user => {
          console.log(user);
          return user;
        })
        .catch(err => "dupa");
    },
    addMessage: async (_: any, { text }: GQL.IMessage) => {
      const id = v1();
      const user = await User.findOne();
      let message = await Message.create({
        id,
        user,
        text
      });

      console.log("1", user, "2", message);
      message.likes ? message.likes.push(user) : (message.likes = [user]);
      message = await message.save();

      user.likes ? user.likes.push(message) : (user.likes = [message]);
      user.messages ? user.messages.push(message) : (user.messages = [message]);
      await user.save();
      return message;
    }
  }
};
