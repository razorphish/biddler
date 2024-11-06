import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { OktaAuthStrategy } from '../strategy/okta/okta.strategy';

@Injectable()
export class OktaMiddleware implements NestMiddleware {
  constructor(private _strategy: OktaAuthStrategy) {}
  use(req: Request, res: Response, next: NextFunction) {
    // no need for NextFunction param here since the 'send' will call directly
    console.log(
      'OktaMiddleware...',
      this._strategy.name,
      this._strategy.authorizationParams,
      this._strategy.options
    );
    this._strategy.name;
    return next();
  }
}
