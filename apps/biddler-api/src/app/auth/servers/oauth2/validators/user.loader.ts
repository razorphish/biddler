import { Injectable } from '@nestjs/common';
import { UserLoaderInterface, UserInterface, InvalidUserException } from '../domain';

@Injectable()
export class UserLoader implements UserLoaderInterface {
  async load(userId: number): Promise<UserInterface> {
    // Load the user from the database
    // ...
    // or throw and
    console.log('Loading user');
    throw InvalidUserException.withId(userId);
  }
}
