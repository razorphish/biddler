import { DataTypes, Model, Optional } from 'sequelize';
import BiddlerLibrary from '../../global/biddler';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { COLUMN_ALIAS } from '../../common/db.enum';
import Lookup from './lookup.model';

interface ApiClientAttributes extends TimestampAttributes {
  // Primary Key(s)
  id: string;

  // Foreign Key(s)
  applicationId: number;
  systemIssuerId: number;
  tokenTypeId: string;
  statusId: string;

  // Attribute(s)
  audience?: string;
  subject?: string;
  secret?: string;
  salt?: string;
  scopes?: string;
  allowedIps?: string;
  restrictedIps?: string;
  timeToLive?: number;
  refreshTimeToLive?: number;
}

export type ApiClientInput = Optional<
  ApiClientAttributes,
  'id' | 'createdDate' | 'lastUpdatedDate'
>;
export type ApiClientOutput = Required<ApiClientAttributes>;

class ApiClient extends Model<ApiClientAttributes, ApiClientInput> implements ApiClientAttributes {
  // Primary Key(s)
  public id!: string;

  // Foreign Key(s)
  public applicationId!: number;
  public systemIssuerId!: number;
  public tokenTypeId!: string;
  public statusId!: string;

  // Attribute(s)
  public audience!: string;
  public subject!: string;
  public secret!: string;
  public salt!: string;
  public scopes!: string;
  public allowedIps!: string;
  public restrictedIps!: string;
  public timeToLive!: number;
  public refreshTimeToLive!: number;

  // User stamp(s)
  public createdBy!: string;
  public lastUpdatedBy!: string;

  // Timestamp(s)
  public readonly createdDate!: Date;
  public readonly lastUpdatedDate!: Date;
  public readonly deletedAt!: Date;
}

ApiClient.init(
  {
    id: {
      type: DataTypes.STRING(128),
      field: 'API_CLIENT_ID',
      primaryKey: true,
      validate: {
        len: {
          args: [0, 128],
          msg: COLUMN_VALIDATION.LENGTH
        }
      },
      allowNull: false
    },
    applicationId: {
      type: DataTypes.INTEGER,
      field: 'APLCTN_ID',
      allowNull: false
    },
    systemIssuerId: {
      type: DataTypes.INTEGER,
      field: 'SYS_ISSUER_ID',
      allowNull: false
    },
    tokenTypeId: {
      type: DataTypes.STRING(32),
      field: COLUMN_NAME.TOKEN_TYPE_ID,
      allowNull: false,
      validate: {
        len: {
          args: [0, 128],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    statusId: {
      type: DataTypes.STRING(32),
      field: COLUMN_NAME.STATUS_ID,
      allowNull: false
    },
    audience: {
      type: DataTypes.STRING(48),
      field: 'CLIENT_AUD',
      validate: {
        len: {
          args: [0, 48],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    subject: {
      type: DataTypes.STRING(36),
      field: 'CLIENT_SUB',
      validate: {
        len: {
          args: [0, 36],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    secret: {
      type: DataTypes.STRING(128),
      field: 'KEY_SECRET_HASH',
      validate: {
        len: {
          args: [0, 128],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    salt: {
      type: DataTypes.STRING(256),
      field: 'KEY_SALT',
      validate: {
        len: {
          args: [0, 256],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    scopes: {
      type: DataTypes.STRING(2048),
      field: 'SCOPES',
      validate: {
        len: {
          args: [0, 2048],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    allowedIps: {
      type: DataTypes.STRING(1024),
      field: 'ALLOWED_IPS',
      defaultValue: '*',
      validate: {
        len: {
          args: [0, 1024],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    restrictedIps: {
      type: DataTypes.STRING(1024),
      field: 'RESTRICTED_IPS',
      defaultValue: '-',
      validate: {
        len: {
          args: [0, 1024],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    timeToLive: {
      type: DataTypes.NUMBER,
      field: 'TKN_TTL'
    },
    refreshTimeToLive: {
      type: DataTypes.NUMBER,
      field: 'RFRSH_TKN_TTL'
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
    tableName: 'API_CLIENT',
    modelName: 'ApiClient',
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
ApiClient.belongsTo(Lookup, {
  foreignKey: 'id',
  targetKey: 'statusId',
  as: 'status'
});

export default ApiClient;
