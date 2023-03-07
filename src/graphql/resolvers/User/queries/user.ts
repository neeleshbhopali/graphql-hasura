import { Resolver, Query, Arg, Mutation, UseMiddleware } from 'type-graphql';
import User from '../types/objects/user';
import axios from "axios";
import Location from '../types/objects/location';
import config from '../../../../config';
import { sign } from 'jsonwebtoken';
import LoginResponse from '../types/objects/login';
import { isAuth } from '../../../../utils/jwt';
import bcrypt from 'bcryptjs';
import AuthenticationError from '../../../../errors/error';

@Resolver()
class UserResolver {

  @Mutation(() => LoginResponse)
  async Login(@Arg("username") username: string, @Arg("password") password: string) {
    const result = await bcrypt.compare(password, config.admin_pass)
    if (username !== 'admin' || !result) throw new AuthenticationError('Please enter a valid username and password', 402)
    return {
      accessToken: sign({ username }, config.secret, {
        expiresIn: "30d"
      })
    };
  }

  @Query(() => [User], { description: 'list the users with pagination' })
  @UseMiddleware(isAuth)
  async fetchUsers(@Arg("limit") limit: number = 10, @Arg("offset") offset: number = 0): Promise<User[]> {
    const graphqlQuery = {
      "operationName": "fetchUsers",
      "query": `query fetchUsers($offset: Int!, $limit: Int!) {
         user(offset: $offset, limit: $limit) {
            id,
            first_name,
            last_name,
            gender
          }
        }`,
      "variables": { limit, offset },
    };

    const response = await axios({
      url: config.hasura_url,
      method: 'post',
      data: graphqlQuery
    });
    return response.data.data.user;
  }

  @Query(() => [Location], { description: 'find users within specific geo radius' })
  @UseMiddleware(isAuth)
  async findUsers(@Arg("radius") radius: number = 1, @Arg("lat") lat: number = 0, @Arg("long") long: number = 0): Promise<Location[]> {
    const graphqlQuery = {
      "operationName": "fetchNearbyUsers",
      "query": `query fetchNearbyUsers($radius: float8!, $lat: float8!, $long: float8!) {
        get_near_users(args: {radius: $radius, lat: $lat, long: $long}) {
          id
          first_name
          last_name
          gender
          lat
          long
        }
      }`,
      "variables": {
        radius,
        lat,
        long
      },
    };

    const response = await axios({
      url: config.hasura_url,
      method: 'post',
      data: graphqlQuery
    });
    return response.data.data.get_near_users;
  }
}

export default UserResolver;
