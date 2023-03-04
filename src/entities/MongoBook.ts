import { ObjectId } from '@mikro-orm/mongodb';
import {
  Entity, PrimaryKey, Property, SerializedPrimaryKey,
  Collection, Enum, OneToMany
} from '@mikro-orm/core';

// import { Book } from '.';

@Entity()
export class MongoBook {

  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  name: string;

  @Property()
  age: number;

  // @ManyToOne()
  // author: Author;

  // @ManyToMany()
  // tags = new Collection<BookTag>(this);

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getOlder() {
    this.age++
  }

}