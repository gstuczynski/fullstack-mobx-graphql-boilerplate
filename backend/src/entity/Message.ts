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

  @Column("time", { default: "00:00:00" })
  timestamp: string;

  @ManyToOne(type => User, user => user.messages)
  user: User;

  @Column("varchar", { length: 255, nullable: true })
  text: string;

  @ManyToMany(type => User, user => user.likes)
  likes: User[];
}
