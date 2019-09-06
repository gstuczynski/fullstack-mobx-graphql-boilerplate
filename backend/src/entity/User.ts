import * as bcrypt from "bcryptjs";
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Message } from "./Message";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity("user")
export class User extends BaseEntity {
  @Field(() => ID) //exposing to graphql
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("varchar", { length: 255 })
  name: string;

  @Field()
  @Column("varchar", { length: 255 })
  avatar: string;

  @OneToMany(type => Message, message => message.user)
  @Field(() => [Message])
  messages: Promise<Message[]>;

  @ManyToMany(type => Message)
  @JoinTable()
  likes: Promise<Message[]>;
}
