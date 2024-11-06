/* eslint-disable @typescript-eslint/no-explicit-any */
import { BindOrReplacements, QueryTypes, Sequelize } from 'sequelize';
import BiddlerLibrary from '../../../global/biddler';

/**
 * @description Get view by name (SELECT ONLY)
 * @author Antonio Marasco
 * @date 04/18/2023
 * @param name Name of view
 * @param [replacements]
 * @returns {*}
 */
export const byView = async (name: string, replacements?: BindOrReplacements): Promise<any> => {
  const sequelize: Sequelize = BiddlerLibrary.dbs.hpt_db;
  const query = `SELECT * FROM HPT_DB.${name}`;

  return await sequelize.query(query, {
    type: QueryTypes.SELECT,
    ...(replacements && { replacements: replacements })
  });
};

/**
 * @description Get data from query (SELECT ONLY)
 * @author Antonio Marasco
 * @date 04/18/2023
 * @param name Query to execute
 * @param [replacements]
 * @returns {*}
 * @summary **CAUTION**
 */
export const byQuery = async (query: string, replacements?: BindOrReplacements): Promise<any> => {
  const sequelize: Sequelize = BiddlerLibrary.dbs.hpt_db;
  return await sequelize.query(`${query}`, {
    type: QueryTypes.SELECT,
    ...(replacements && { replacements: replacements })
  });
};

/**
 * @description Gets data by stored procedure
 * @author Antonio Marasco
 * @date 04/18/2023
 * @param name
 * @param [parameters]
 * @param [replacements]
 * @returns {*}
 */
export const byStoredProcedure = async (
  name: string,
  parameters?: string,
  replacements?: BindOrReplacements
): Promise<any> => {
  const sequelize: Sequelize = BiddlerLibrary.dbs.hpt_db;

  sequelize.query(`EXEC ${name} ${parameters}`, {
    type: QueryTypes.SELECT,
    ...(replacements && { replacements: replacements })
  });
};
