import { DataTypes, Model, Optional } from 'sequelize';
import WhooshLibrary from '../../global/whoosh';
import { User } from '../../whoosh/models';
import { TimestampAttributes } from '../interfaces/timeStampAttributes.interface';
import { COLUMN_ALIAS } from '../../whoosh/common/db.enum';

interface AccessTokenAttributes extends TimestampAttributes {
  // Primary Key
  id: number;

  // Foreign Keys
  userId: number;

  // Properties
  name: string;
  accessToken: string;
  timeToLive?: number;
  scope?: string;
  type?: string;
  expiresIn?: number;
  origin?: string;
  forceRefresh?: boolean;
  cookie?: string;
  ipAddress?: string;
  expireDate?: Date;
}

export type AccessTokenInput = Optional<
  AccessTokenAttributes,
  'id' | 'accessToken'
>;
export type AccessTokenOutput = Required<AccessTokenAttributes>;

class AccessToken
  extends Model<AccessTokenAttributes, AccessTokenInput>
  implements AccessTokenAttributes
{
  // Primary Key
  public id!: number;

  // Foreign Key
  public userId!: number;

  public name!: string;
  public accessToken!: string;
  public timeToLive!: number;
  public scope!: string;
  public type!: string;
  public expiresIn!: number;
  public origin!: string;
  public forceRefresh!: boolean;
  public cookie!: string;
  public ipAddress!: string;
  public expireDate!: Date;

  // User stamps
  public createdBy!: string;
  public lastUpdatedBy!: string;

  // Timestamps
  public readonly createdDate!: Date;
  public readonly lastUpdatedDate!: Date;
  public readonly deletedAt!: Date;
}

AccessToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      field: 'ACS_ID',
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'USER_ID',
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(32),
      field: 'ACS_NAME',
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.STRING(256),
      field: 'ACS_TOKN',
      allowNull: false,
      validate: {
        len: {
          args: [0, 256],
          msg: 'String length is not in this range',
        },
      },
    },
    timeToLive: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'TTL',
    },
    scope: {
      type: DataTypes.STRING(256),
      field: 'SCOPES',
      validate: {
        len: {
          args: [0, 256],
          msg: 'String length is not in this range',
        },
      },
    },
    type: {
      type: DataTypes.STRING(32),
      field: 'ACS_TYPE',
      validate: {
        len: {
          args: [0, 32],
          msg: 'String length is not in this range',
        },
      },
    },
    expiresIn: {
      type: DataTypes.INTEGER,
      field: 'ACS_EXPRS_IN',
    },
    origin: {
      type: DataTypes.STRING(256),
      field: 'ACS_ORGN',
      validate: {
        len: {
          args: [0, 256],
          msg: 'String length not in this range',
        },
      },
    },
    forceRefresh: {
      type: DataTypes.BOOLEAN,
      field: 'FORCE_RFRSH',
    },
    cookie: {
      type: DataTypes.STRING(256),
      field: 'CKIE',
      validate: {
        len: {
          args: [0, 256],
          msg: 'String length not in this range',
        },
      },
    },
    ipAddress: {
      type: DataTypes.STRING(1024),
      field: 'IP_ADDR',
    },
    expireDate: {
      type: DataTypes.DATE,
      field: 'EXP_DT',
    },
    createdDate: {
      type: DataTypes.DATE,
      field: 'CREATD_DT',
    },
    createdBy: {
      type: DataTypes.STRING,
      field: 'CREATD_BY',
      validate: {
        len: {
          args: [0, 48],
          msg: 'String length not in this range',
        },
      },
    },
  },
  {
    sequelize: WhooshLibrary.dbs.hpt_db,
    tableName: 'ACS_TOKN',
    modelName: 'AccessToken',
    freezeTableName: true,
    timestamps: true,
    deletedAt: COLUMN_ALIAS.DLTD_AT,
    updatedAt: COLUMN_ALIAS.LAST_UPDATED_DATE,
    createdAt: COLUMN_ALIAS.CREATD_DT,
    paranoid: true,
  }
);

//Hooks
//references
AccessToken.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'userId',
  as: 'user',
  constraints: false,
});

export default AccessToken;
