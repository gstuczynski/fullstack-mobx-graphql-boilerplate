import * as bcrypt from "bcryptjs";
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToMany,
  ManyToOne
} from "typeorm";
import { User } from "./User";

@Entity("messages")
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("time")
  timestamp: string;

  @ManyToOne(type => User)
  user: User;

  @Column("varchar", { length: 255 })
  text: string;

  @ManyToOne(type => User)
  likes: [User];
}
