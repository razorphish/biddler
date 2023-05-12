import { DataTypes, Model, Optional } from 'sequelize';
import WhooshLibrary from '../../global/whoosh';
import {
  COLUMN_NAME,
  COLUMN_VALIDATION,
  DEFAULT_VALUE,
} from '../../common/db.enum';
import { TimestampAttributes } from '../interfaces/timeStampAttributes.interface';
import Status from './status.model';

interface ApplicationAttributes extends TimestampAttributes {
  // Primary Key
  id: string;

  // Foreign keys
  statusId: string;

  // Properties
  name: string;
  description?: string;
}

export type ApplicationInput = Optional<
  ApplicationAttributes,
  'createdDate' | 'lastUpdatedDate'
>;
export type ApplicationOutput = ApplicationAttributes;

class Application
  extends Model<ApplicationAttributes, ApplicationInput>
  implements ApplicationAttributes
{
  public id!: string;
  public statusId!: string;
  public name!: string;
  public description!: string;

  // User stamps
  public createdBy!: string;
  public lastUpdatedBy!: string;

  // Timestamps
  public readonly createdDate!: Date;
  public readonly lastUpdatedDate!: Date;
  public readonly deletedAt!: Date;
}

Application.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'APLCTN_ID',
      primaryKey: true,
      autoIncrement: true,
    },
    statusId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: COLUMN_NAME.STATUS_ID,
    },
    name: {
      type: DataTypes.STRING(64),
      field: 'APLCTN_NAME',
      allowNull: false,
      validate: {
        max: {
          args: [64],
          msg: COLUMN_VALIDATION.MAX,
        },
      },
    },
    description: {
      type: DataTypes.STRING(128),
      field: 'APLCTN_DESC',
      allowNull: true,
      validate: {
        len: {
          args: [0, 128],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    createdBy: {
      type: DataTypes.STRING(48),
      validate: {
        len: {
          args: [0, 48],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
      field: COLUMN_NAME.CREATED_BY,
      defaultValue: DEFAULT_VALUE.BY,
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(48),
      field: COLUMN_NAME.LAST_UPDATED_BY,
      defaultValue: DEFAULT_VALUE.BY,
      validate: {
        len: {
          args: [0, 48],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
  },
  {
    sequelize: WhooshLibrary.dbs.hpt_idm_db,
    tableName: 'PERMSN_INFO',
    modelName: 'Application',
    freezeTableName: true,
    timestamps: true,
    deletedAt: COLUMN_NAME.DELETED_AT,
    updatedAt: COLUMN_NAME.LAST_UPDATED_DATE,
    createdAt: COLUMN_NAME.CREATED_DT,
    paranoid: true,
  }
);

// Hooks

// References
Application.hasOne(Status, {
  foreignKey: 'id',
  sourceKey: 'statusId',
  as: 'status',
});

export default Application;
