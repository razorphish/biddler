/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional } from 'sequelize';
import BiddlerLibrary from '../../global/biddler';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { TimestampAttributes } from '../../global/interfaces';

interface SystemIssuerAttributes extends TimestampAttributes {
  // Primary Key(s)
  id: string;

  // Foreign Key(s)
  statusId: string;
  systemId: number;
  tokenTypeId: string;

  // Attribute(s)
  name: string;
  tokenTimeToLive: number;
  refreshTokenTimeToLive?: number;
  hashAlgorithm?: string;
  origin?: string;
  restrictedIps?: string;
  allowedIps?: string;
  methods?: string;
  allowedHeaders?: string;
  exposedHeaders?: string;
  allowCredentials?: boolean;
  maxAgeInSeconds?: number;
}

export interface SystemIssuerInput extends Optional<SystemIssuerAttributes, 'id'> {}
export interface SystemIssuerOutput extends SystemIssuerAttributes {}

class SystemIssuer
  extends Model<SystemIssuerAttributes, SystemIssuerInput>
  implements SystemIssuerAttributes
{
  // Primary Key(s)
  id!: string;

  // Foreign Key(s)
  statusId!: string;
  systemId!: number;
  tokenTypeId!: string;

  // Attribute(s)
  name!: string;
  tokenTimeToLive!: number;
  refreshTokenTimeToLive!: number;
  hashAlgorithm!: string;
  origin!: string;
  restrictedIps!: string;
  allowedIps!: string;
  methods!: string;
  allowedHeaders!: string;
  exposedHeaders!: string;
  allowCredentials!: boolean;
  maxAgeInSeconds!: number;

  // User stamp(s)
  public createdBy!: string;
  public lastUpdatedBy!: string;

  // Timestamp(s)
  public readonly createdDate!: Date;
  public readonly lastUpdatedDate!: Date;
  public readonly deletedAt!: Date;
}

SystemIssuer.init(
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: 'SYS_ISSUER_ID',
      primaryKey: true,
      autoIncrement: true
    },
    systemId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: 'SYS_ID'
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
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      field: 'ISSUER_NAME',
      validate: {
        len: {
          args: [0, 128],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    tokenTimeToLive: {
      type: DataTypes.NUMBER,
      field: 'TKN_TTL',
      allowNull: false
    },
    refreshTokenTimeToLive: {
      type: DataTypes.NUMBER,
      field: 'RFRSH_TKN_TTL'
    },
    hashAlgorithm: {
      type: DataTypes.STRING(32),
      field: 'HASH_ALGORITHM',
      validate: {
        len: {
          args: [0, 32],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    origin: {
      type: DataTypes.STRING(1024),
      field: 'ORIGIN',
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
      validate: {
        len: {
          args: [0, 1024],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    allowedIps: {
      type: DataTypes.STRING(1024),
      field: 'ALLOWED_IPS',
      validate: {
        len: {
          args: [0, 1024],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    methods: {
      type: DataTypes.STRING(512),
      field: 'METHODS',
      validate: {
        len: {
          args: [0, 512],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    allowedHeaders: {
      type: DataTypes.STRING(512),
      field: 'ALLOWED_HEADERS',
      validate: {
        len: {
          args: [0, 512],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    exposedHeaders: {
      type: DataTypes.STRING(512),
      field: 'EXPOSED_HEADERS',
      validate: {
        len: {
          args: [0, 512],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    allowCredentials: {
      type: DataTypes.BOOLEAN,
      field: 'ALLOW_CREDENTIALS',
      defaultValue: true
    },
    maxAgeInSeconds: {
      type: DataTypes.NUMBER,
      field: 'MAX_AGE_SECONDS'
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
    tableName: 'SYS_ISSUER',
    modelName: 'SystemIssuer',
    schema: 'BIDDLER_IDM_DB',
    freezeTableName: true,
    timestamps: true,
    deletedAt: COLUMN_NAME.DELETED_AT,
    updatedAt: COLUMN_NAME.LAST_UPDATED_DATE,
    createdAt: COLUMN_NAME.CREATED_DT,
    paranoid: true
  }
);
// Hooks
// References
export default SystemIssuer;
