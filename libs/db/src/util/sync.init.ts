// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import * as idm from '../idm/models';
import * as whoosh from '../whoosh/models';

const isDev = process.env.NODE_ENV === 'dev';
const isTest = process.env.NODE_ENV === 'test';

const dbInit = () =>
  Promise.all([
    whoosh.Complaint.sync({ alter: isDev || isTest }),
    whoosh.ComplaintIntake.sync({ alter: isDev || isTest }),
    whoosh.ComplaintResponse.sync({ alter: isDev || isTest }),
    whoosh.ComplaintScope.sync({ alter: isDev || isTest }),
    whoosh.ComplaintScore.sync({ alter: isDev || isTest }),
    whoosh.ComplaintScoreSummary.sync({ alter: isDev || isTest }),
    whoosh.ComplaintTestAreaSummary.sync({ alter: isDev || isTest }),
    whoosh.DataLake.sync({ alter: isDev || isTest }),
    whoosh.DataSource.sync({ alter: isDev || isTest }),
    whoosh.DataSourceType.sync({ alter: isDev || isTest }),
    whoosh.Status.sync({ alter: isDev || isTest }),
    whoosh.User.sync({ alter: isDev || isTest }),
    idm.AccessToken.sync({ alter: isDev || isTest })
  ]);

export default dbInit;
