import { Field, ObjectType } from "type-graphql";
import User from "./user";

@ObjectType()
export default class Location extends User {
    @Field({ defaultValue: 0 })
    lat!: Number;
    @Field({ defaultValue: 0 })
    long!: Number;
}