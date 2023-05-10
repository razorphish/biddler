import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

const {
  WHOOSH_DB_DATABASE,
  WHOOSH_DB_DATABASE_USERNAME,
  WHOOSH_DB_DATABASE_PASSWORD,
  WHOOSH_DB_DATABASE_SERVER,
  WHOOSH_DB_DATABASE_PORT,
  WHOOSH_DB_DIALECT,
  WHOOSH_IDM_DB_DATABASE,
  WHOOSH_IDM_DB_DATABASE_USERNAME,
  WHOOSH_IDM_DB_DATABASE_PASSWORD,
  WHOOSH_IDM_DB_DATABASE_SERVER,
  WHOOSH_IDM_DB_DATABASE_PORT,
  WHOOSH_IDM_DB_DIALECT,
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
      database: WHOOSH_DB_DATABASE,
      dialect: WHOOSH_DB_DIALECT,
      username: WHOOSH_DB_DATABASE_USERNAME,
      password: WHOOSH_DB_DATABASE_PASSWORD,
      host: WHOOSH_DB_DATABASE_SERVER,
      port: WHOOSH_DB_DATABASE_PORT,
      dialectOptions: {
        connectTimeout: 60000,
      },
      pool: {
        max: 100,
        min: 0,
        acquire: 100 * 1000,
        idle: 120000,
        evict: 120000,
      },
      meta: {
        useSchemas: true,
      },
    },
  },
  whoosh_idm_db: {
    path: {
      database: WHOOSH_IDM_DB_DATABASE,
      dialect: WHOOSH_IDM_DB_DIALECT,
      username: WHOOSH_IDM_DB_DATABASE_USERNAME,
      password: WHOOSH_IDM_DB_DATABASE_PASSWORD,
      host: WHOOSH_IDM_DB_DATABASE_SERVER,
      port: WHOOSH_IDM_DB_DATABASE_PORT,
      dialectOptions: {
        connectTimeout: 60000,
      },
      pool: {
        max: 100,
        min: 0,
        acquire: 100 * 1000,
        idle: 120000,
        evict: 120000,
      },
      meta: {
        useSchemas: true,
        customCert: '',
      },
    },
  },
};
