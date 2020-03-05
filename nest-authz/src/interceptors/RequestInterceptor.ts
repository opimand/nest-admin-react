import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
import { tap, map } from 'rxjs/operators';
import { Users } from '../interfaces/users.interface'

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    request: CallHandler,
  ): Observable<Users> {
    type IParams = {
      include_totals: boolean;
      per_page?: string;
      sort?: string;
    }
    const req  = context.switchToHttp().getRequest();
    const queryParams: IParams = { include_totals: true };
    if (req.query.hasOwnProperty('_end')) {
      queryParams.per_page = req.query._end;
    }

    if (req.query.hasOwnProperty('_sort')) {
      queryParams.sort = `${req.query._sort}:1`;
    }

    if (req.query.hasOwnProperty('_order')) {
      if (req.query._order === 'DESC') {
        queryParams.sort = `${req.query._sort}:-1`;
      } else queryParams.sort = `${req.query._sort}:1`;
    }

    req.auth0Query = stringify(queryParams);
    console.log('req.query:  ',req.query)
    return request.handle().pipe(
      tap(data => {
        context
          .switchToHttp()
          .getResponse()
          .header('X-Total-Count', data.total)
          .header('Access-Control-Expose-Headers', 'X-Total-Count');
      }),
      map(data =>  data.data ),
    );
  }
}