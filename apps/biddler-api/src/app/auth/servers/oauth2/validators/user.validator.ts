import { Injectable } from '@nestjs/common';
import { InvalidUserException, UserInterface, UserValidatorInterface } from '../domain';
import { IDM } from '@biddler/db';

@Injectable()
export class UserValidator implements UserValidatorInterface {
  constructor(private readonly _service: IDM.services.UserService) {}
  async validate(username, password): Promise<UserInterface> {
    // check if the user exists with the given username and password
    // ...
    // or
    try {
      const validated = await this._service.authenticate(username, password);
      if (!validated) {
        throw InvalidUserException.withUsernameAndPassword(username, password);
      }

      return {
        id: validated.id,
        username: validated.username,
        email: validated.email
      };
    } catch (error) {
      throw InvalidUserException.withUsernameAndPassword(username, password);
    }
  }
}
