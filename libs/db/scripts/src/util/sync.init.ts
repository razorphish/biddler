// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import * as idm from '../idm/models';
import * as biddler from '../biddler/models';

const isDev = process.env.NODE_ENV === 'dev';
const isTest = process.env.NODE_ENV === 'test';

const dbInit = () =>
  Promise.all([
    biddler.Complaint.sync({ alter: isDev || isTest }),
    biddler.ComplaintIntake.sync({ alter: isDev || isTest }),
    biddler.ComplaintResponse.sync({ alter: isDev || isTest }),
    biddler.ComplaintScope.sync({ alter: isDev || isTest }),
    biddler.ComplaintScore.sync({ alter: isDev || isTest }),
    biddler.ComplaintScoreSummary.sync({ alter: isDev || isTest }),
    biddler.ComplaintTestAreaSummary.sync({ alter: isDev || isTest }),
    biddler.DataLake.sync({ alter: isDev || isTest }),
    biddler.DataSource.sync({ alter: isDev || isTest }),
    biddler.DataSourceType.sync({ alter: isDev || isTest }),
    biddler.Status.sync({ alter: isDev || isTest }),
    biddler.User.sync({ alter: isDev || isTest }),
    idm.AccessToken.sync({ alter: isDev || isTest })
  ]);

export default dbInit;
