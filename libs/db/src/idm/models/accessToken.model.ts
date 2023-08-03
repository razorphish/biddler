import { DataTypes, Model, Optional } from 'sequelize';
import BiddlerLibrary from '../../global/biddler';
import { Lookup, User } from '../../idm/models';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';
import { COLUMN_ALIAS, COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';

interface AccessTokenAttributes extends TimestampAttributes {
  // Primary Key(s)
  id: number;

  // Foreign Key(s)
  userId?: number;
  statusId: string;
  tokenTypeId: string;
  schemeTypeId: string;

  // Attribute(s)
  token: string;
  secret?: string;
  scope?: string;
  expiresIn?: number;
  origin?: string;
  forceRefresh?: boolean;
  ipAddress?: string;
  cookie?: string;
  expireDate?: Date;
}

export type AccessTokenInput = Optional<
  AccessTokenAttributes,
  'id' | 'token' | 'createdDate' | 'lastUpdatedDate'
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
  public tokenTypeId!: string;
  public schemeTypeId!: string;

  // Attribute(s)
  public token!: string;
  public secret!: string;
  public scope!: string;
  public expiresIn!: number;
  public origin!: string;
  public forceRefresh!: boolean;
  public ipAddress!: string;
  public cookie!: string;
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
      field: 'ACS_TOKN_ID',
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'USER_ID'
    },
    statusId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: COLUMN_NAME.STATUS_ID
    },
    tokenTypeId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: COLUMN_NAME.TOKEN_TYPE_ID
    },
    schemeTypeId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: 'SCHM_TYP_LKP_ID',
      defaultValue: 'ascii'
    },
    token: {
      type: DataTypes.STRING(1024),
      field: 'TKN',
      allowNull: false,
      validate: {
        len: {
          args: [0, 1024],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    secret: {
      type: DataTypes.STRING(512),
      field: 'TKN_SCRT',
      validate: {
        len: {
          args: [0, 512],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    scope: {
      type: DataTypes.STRING(256),
      field: 'SCOPE',
      validate: {
        len: {
          args: [0, 256],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    expiresIn: {
      type: DataTypes.INTEGER,
      field: 'EXPIRS_IN',
      defaultValue: 3600
    },
    origin: {
      type: DataTypes.STRING(256),
      field: 'ORIGN',
      defaultValue: '*',
      validate: {
        len: {
          args: [0, 256],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    forceRefresh: {
      type: DataTypes.BOOLEAN,
      field: 'FRCE_RFRSH',
      defaultValue: true
    },
    ipAddress: {
      type: DataTypes.STRING(64),
      field: 'IP_ADRS'
    },
    cookie: {
      type: DataTypes.STRING(512),
      field: 'COOKIE',
      validate: {
        len: {
          args: [0, 512],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
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
    sequelize: BiddlerLibrary.dbs.biddler_idm_db,
    tableName: 'ACS_TOKN',
    modelName: 'AccessToken',
    schema: 'BIDDLER_IDM_DB',
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

AccessToken.belongsTo(Lookup, {
  foreignKey: 'id',
  targetKey: 'statusId',
  as: 'status'
});

AccessToken.belongsTo(Lookup, {
  foreignKey: 'id',
  targetKey: 'tokenTypeId',
  as: 'tokenType'
});

AccessToken.belongsTo(Lookup, {
  foreignKey: 'id',
  targetKey: 'schemeTypeId',
  as: 'schemeType'
});

export default AccessToken;
