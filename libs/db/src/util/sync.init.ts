// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import * as idm from '../idm/models';
import * as biddler from '../biddler/models';

const isDev = process.env['NODE_ENV'] === 'dev';
const isTest = process.env['NODE_ENV'] === 'test';

const dbInit = () =>
  Promise.all([
    biddler.Account.sync({ alter: isDev || isTest }),
    biddler.AccountUser.sync({ alter: isDev || isTest }),
    biddler.AccountUserRole.sync({ alter: isDev || isTest }),
    biddler.Lookup.sync({ alter: isDev || isTest }),
    biddler.Permission.sync({ alter: isDev || isTest }),
    biddler.Role.sync({ alter: isDev || isTest }),
    biddler.RolePermission.sync({ alter: isDev || isTest }),
    biddler.User.sync({ alter: isDev || isTest }),

    // IDM
    idm.AccessToken.sync({ alter: isDev || isTest })
  ]);

export default dbInit;
