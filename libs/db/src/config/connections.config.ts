import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env'
});

const {
  BIDDLER_DB_DATABASE,
  BIDDLER_DB_DATABASE_USERNAME,
  BIDDLER_DB_DATABASE_PASSWORD,
  BIDDLER_DB_DATABASE_SERVER,
  BIDDLER_DB_DATABASE_PORT,
  BIDDLER_DB_DIALECT,
  BIDDLER_IDM_DB_DATABASE,
  BIDDLER_IDM_DB_DATABASE_USERNAME,
  BIDDLER_IDM_DB_DATABASE_PASSWORD,
  BIDDLER_IDM_DB_DATABASE_SERVER,
  BIDDLER_IDM_DB_DATABASE_PORT,
  BIDDLER_IDM_DB_DIALECT
} = process.env;

type DatabasePath = {
  database: string;
  dialect: string;
  username: string;
  password: string;
};
export type DatabaseConnection = {
  path: DatabasePath;
};

export default {
  whoosh_db: {
    path: {
      database: BIDDLER_DB_DATABASE,
      dialect: BIDDLER_DB_DIALECT,
      username: BIDDLER_DB_DATABASE_USERNAME,
      password: BIDDLER_DB_DATABASE_PASSWORD,
      host: BIDDLER_DB_DATABASE_SERVER,
      port: BIDDLER_DB_DATABASE_PORT,
      dialectOptions: {
        connectTimeout: 60000
      },
      pool: {
        max: 100,
        min: 0,
        acquire: 100 * 1000,
        idle: 120000,
        evict: 120000
      },
      meta: {
        useSchemas: true
      }
    }
  },
  whoosh_idm_db: {
    path: {
      database: BIDDLER_IDM_DB_DATABASE,
      dialect: BIDDLER_IDM_DB_DIALECT,
      username: BIDDLER_IDM_DB_DATABASE_USERNAME,
      password: BIDDLER_IDM_DB_DATABASE_PASSWORD,
      host: BIDDLER_IDM_DB_DATABASE_SERVER,
      port: BIDDLER_IDM_DB_DATABASE_PORT,
      dialectOptions: {
        connectTimeout: 60000
      },
      pool: {
        max: 100,
        min: 0,
        acquire: 100 * 1000,
        idle: 120000,
        evict: 120000
      },
      meta: {
        useSchemas: true
      }
    }
  }
};
