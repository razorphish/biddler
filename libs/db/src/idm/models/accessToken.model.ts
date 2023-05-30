import { DataTypes, Model, Optional } from 'sequelize';
import WhooshLibrary from '../../global/whoosh';
import { Status, User } from '../../whoosh/models';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';
import {
  COLUMN_ALIAS,
  COLUMN_NAME,
  COLUMN_VALIDATION,
  DEFAULT_VALUE
} from '../../common/db.enum';

interface AccessTokenAttributes extends TimestampAttributes {
  // Primary Key(s)
  id: number;

  // Foreign Key(s)
  userId: number;
  statusId: string;

  // Attribute(s)
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
  'id' | 'accessToken' | 'createdDate' | 'lastUpdatedDate'
>;
export type AccessTokenOutput = Required<AccessTokenAttributes>;

class AccessToken
  extends Model<AccessTokenAttributes, AccessTokenInput>
  implements AccessTokenAttributes
{
  // Primary Key(s)
  public id!: number;

  // Foreign Key(s)
  public userId!: number;
  public statusId!: string;

  // Attribute(s)
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

  // User stamp(s)
  public createdBy!: string;
  public lastUpdatedBy!: string;

  // Timestamp(s)
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
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'USER_ID',
      allowNull: false
    },
    statusId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: COLUMN_NAME.STATUS_ID
    },
    name: {
      type: DataTypes.STRING(32),
      field: 'ACS_NAME',
      allowNull: false
    },
    accessToken: {
      type: DataTypes.STRING(256),
      field: 'ACS_TOKN',
      allowNull: false,
      validate: {
        len: {
          args: [0, 256],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    timeToLive: {
      type: DataTypes.DECIMAL,
      field: 'TTL'
    },
    scope: {
      type: DataTypes.STRING(256),
      field: 'SCOPES',
      validate: {
        len: {
          args: [0, 256],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    type: {
      type: DataTypes.STRING(32),
      field: 'ACS_TYPE',
      validate: {
        len: {
          args: [0, 128],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    expiresIn: {
      type: DataTypes.INTEGER,
      field: 'ACS_EXPRS_IN'
    },
    origin: {
      type: DataTypes.STRING(256),
      field: 'ACS_ORGN',
      validate: {
        len: {
          args: [0, 128],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    forceRefresh: {
      type: DataTypes.BOOLEAN,
      field: 'FORCE_RFRSH',
      defaultValue: true
    },
    cookie: {
      type: DataTypes.STRING(256),
      field: 'CKIE',
      validate: {
        len: {
          args: [0, 128],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    ipAddress: {
      type: DataTypes.STRING(1024),
      field: 'IP_ADDR'
    },
    expireDate: {
      type: DataTypes.DATE,
      field: 'EXP_DT'
    },
    createdBy: {
      type: DataTypes.STRING(48),
      validate: {
        len: {
          args: [0, 48],
          msg: COLUMN_VALIDATION.LENGTH
        }
      },
      field: COLUMN_NAME.CREATED_BY,
      defaultValue: DEFAULT_VALUE.BY
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(48),
      field: COLUMN_NAME.LAST_UPDATED_BY,
      defaultValue: DEFAULT_VALUE.BY,
      validate: {
        len: {
          args: [0, 48],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: COLUMN_NAME.CREATED_DT
    },
    lastUpdatedDate: {
      type: DataTypes.DATE,
      field: COLUMN_NAME.LAST_UPDATED_DATE
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: COLUMN_NAME.DELETED_AT
    }
  },
  {
    sequelize: WhooshLibrary.dbs.whoosh_idm_db,
    tableName: 'ACS_TOKN',
    modelName: 'AccessToken',
    schema: 'WHOOSH_IDM_DB',
    freezeTableName: true,
    timestamps: true,
    deletedAt: COLUMN_ALIAS.DLTD_AT,
    updatedAt: COLUMN_ALIAS.LAST_UPDATED_DATE,
    createdAt: COLUMN_ALIAS.CREATD_DT,
    paranoid: true
  }
);

//Hooks
//references
AccessToken.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'userId',
  as: 'user'
});

AccessToken.belongsTo(Status, {
  foreignKey: 'id',
  targetKey: 'statusId',
  as: 'status'
});

export default AccessToken;
