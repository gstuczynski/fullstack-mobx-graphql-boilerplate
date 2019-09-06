import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root
} from "type-graphql";
import { v1 } from "uuid";
import { User } from "../entity/User";
import { Message } from "../entity/Message";

@Resolver()
export class UserResolver {
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }

  @Query(() => User)
  async me() {
    return await User.findOne();
  }
  @Mutation(() => User)
  async createUser(@Arg("name") name: string, @Arg("avatar") avatar: string) {
    const user = await User.create({
      id: v1(),
      name,
      avatar,
      messages: null
    }).save();
    return user;
  }
}
