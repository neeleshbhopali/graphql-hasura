import { ObjectType, Field } from 'type-graphql';
import Location from './location';

@ObjectType()
export default class User {
  @Field()
  id!: string;

  @Field()
  first_name!: string;

  @Field()
  last_name!: string;

  @Field()
  gender!: string;
}
