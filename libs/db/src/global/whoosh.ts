/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize } from 'sequelize';

import connections from '../config/connections.config';

class WhooshLibrary {
  public dbs;

  constructor() {
    // Initialize all providers
    this.dbs = Object.entries(connections).reduce((agg: any, db: any) => {
      agg[db[0]] = new Sequelize(db[1].path);

      // [Schemas:1]
      // Determine if schemas are supported
      if (db[1].path.meta.useSchemas) {
        agg[db[0]].dialect.supports.schemas = true;
      }

      return agg[db[0]] && agg;
    }, {});
  }
}

export default new WhooshLibrary();
