import { Resolver, Query, Mutation, Arg } from "type-graphql";

@Resolver()
export class MessageResolver {
  @Query(() => String)
  async Me() {
    return "Hello World!";
  }
  @Mutation(() => String)
  async createUser(@Arg("firstName") firstName: string) {
    return firstName;
  }
}
