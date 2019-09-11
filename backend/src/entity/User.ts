import * as bcrypt from "bcryptjs";
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne
} from "typeorm";
import { Message } from "./Message";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("varchar", { length: 255 })
  avatar: string;

  @OneToMany(type => Message, message => message.user)
  messages: Message[];

  @ManyToMany(type => Message, message => message.likes)
  @JoinTable()
  likes: Message[];
}
