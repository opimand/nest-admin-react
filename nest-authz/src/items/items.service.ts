import {
  Injectable,
  HttpService,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { RequestInterceptor } from '../interceptors/RequestInterceptor';
import { map } from 'rxjs/operators';
import * as dotenv from 'dotenv';
import { Users } from '../interfaces/users.interface';
import { User } from '../interfaces/User';
import { log } from 'util';

dotenv.config();

// const TOKEN =
//   'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1FRTVSa1pHT0RRd1JFUTVNMFU1UkVZM1FqUXpOREF4TWtRd1FrWTRNamMwTjBNeFEwVkdOUSJ9.eyJpc3MiOiJodHRwczovL2Rldi1wZzl6bmozdi5hdXRoMC5jb20vIiwic3ViIjoiSzVJeTJtUm9QTW1sOEVzVTdNM1ByU0YyM3l0dEFGc2dAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LXBnOXpuajN2LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTgwODA1MTM4LCJleHAiOjE1ODMzOTcxMzgsImF6cCI6Iks1SXkybVJvUE1tbDhFc1U3TTNQclNGMjN5dHRBRnNnIiwic2NvcGUiOiJyZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.4iHvYw76KPztt1f9G4JPm612AcnXyu77-_w6602pvvWhFm3ijq05eU4SUmDvJcQ0eWSknMfc__uuhkHK1KzEuEL5HPe1GzwsGeXoOq7AVxP9sxX-81FNY6aXN7hncfGPeSMLAA53WIi-M9CNIfvBPS99uej9MLpFHRBF0xvoJ8sWKsg4GBVl_aL-VyxWIKU4lH36DIECX74jHIh1p1_XbgX87_hF8MyiTa1cUJZJoCFZnimRU6FGAu091qrTUnIYJiyBxd-CSFdShhfWiBDVTf4njglZFa0ADTL_Ardi9P1dCnhzjv3nBn5RAPhPUQE3ngDrdqy0L-feUUE1B4uSfg';

const URL = `https://${process.env.AUTH0_DOMAIN}auth0.com/api/v2/users`;

export interface IUsers {
  created_at: string;
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  nickname: string;
}

export interface IUsersData {
  results: Array<IUsers>;
  total: number;
}

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  headersRequest = {
    // authorization: token,
    'Content-Type': 'application/json',
    'Access-Control-Expose-Headers': 'X-Total-Count'
  };
  URL = `${process.env.AUTH0_DOMAIN}api/v2/users`
  @UseInterceptors(RequestInterceptor)
  getUsers(auth0Query: string, token: string): Promise<Users | null> {
    console.log('auth0Query: ', auth0Query);
    return this.httpService
      .get(`${this.URL}?${auth0Query}`,
        {
          headers: {
            authorization: token,
            'Content-Type': 'application/json',
            'Access-Control-Expose-Headers': 'X-Total-Count'
            }
          },
      )
      .pipe(
        map((response) => {
          const newData = response.data.map(user =>
            ({...user, id: user.user_id})
          );
          console.log('response.data.total', response.data.total)
         return {
            data: newData.data,
            total: response.data.total,
          };
        })
      )
      .toPromise()
        .then(data => data)
        .catch(e => {
          console.log('ERROR' ,e.message);
          throw (e);
        })

  }

  // getUser(userID): Promise<IUser> {
  //   return this.httpService
  //     .get(`${URL}/${userID}`, { headers: this.headersRequest })
  //     .pipe(map(response => response.data))
  //     .toPromise();
  // }
  //
  addUser(user): Promise<User> {
    return this.httpService
      .post(
        URL,
        { ...user, connection: 'Username-Password-Authentication' },
        { headers: this.headersRequest },
      )
      .pipe(map(response => response.data))
      .toPromise()
      .then(data => {
        return data;
      })
      .catch(data => {
        return data;
      });
  }
  //
  // deleteUser(userID): Promise<void> {
  //   return this.httpService
  //     .delete(`${URL}/${userID}`, {
  //       headers: this.headersRequest,
  //     })
  //     .pipe(map(response => response.data))
  //     .toPromise()
  //     .then(data => {
  //       return data;
  //     })
  //     .catch(data => {
  //       return data;
  //     });
  // }
  //
  // updateUser(userID, user): Promise<IUser[]> {
  //   return this.httpService
  //     .patch(
  //       `${URL}/${userID}`,
  //       { user },
  //       {
  //         headers: this.headersRequest,
  //       },
  //     )
  //     .pipe(map(response => response.data))
  //     .toPromise()
  //     .then(data => {
  //       return data;
  //     })
  //     .catch(data => {
  //       return data;
  //     });
  // }
}