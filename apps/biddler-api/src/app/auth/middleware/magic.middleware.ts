import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { MagicStrategy } from '../strategy/magic/magic.strategy';

@Injectable()
export class MagicMiddleware implements NestMiddleware {
  constructor(private _magicStrategy: MagicStrategy) {}
  use(req: Request, res: Response) {
    // no need for NextFunction param here since the 'send' will call directly
    this._magicStrategy.send(req, res);
  }
}
