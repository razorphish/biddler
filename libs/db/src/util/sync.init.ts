// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import * as idm from '../idm/models';
import * as hpt from '../hpt/models';

const isDev = process.env.NODE_ENV === 'dev';
const isTest = process.env.NODE_ENV === 'test';

const dbInit = () =>
  Promise.all([
    hpt.Complaint.sync({ alter: isDev || isTest }),
    hpt.ComplaintIntake.sync({ alter: isDev || isTest }),
    hpt.ComplaintResponse.sync({ alter: isDev || isTest }),
    hpt.ComplaintScope.sync({ alter: isDev || isTest }),
    hpt.ComplaintScore.sync({ alter: isDev || isTest }),
    hpt.ComplaintScoreSummary.sync({ alter: isDev || isTest }),
    hpt.ComplaintTestAreaSummary.sync({ alter: isDev || isTest }),
    hpt.DataLake.sync({ alter: isDev || isTest }),
    hpt.DataSource.sync({ alter: isDev || isTest }),
    hpt.DataSourceType.sync({ alter: isDev || isTest }),
    hpt.Status.sync({ alter: isDev || isTest }),
    hpt.User.sync({ alter: isDev || isTest }),
    idm.AccessToken.sync({ alter: isDev || isTest })
  ]);

export default dbInit;
