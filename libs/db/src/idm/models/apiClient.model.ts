import { DataTypes, Model, Optional } from 'sequelize';
import WhooshLibrary from '../../global/whoosh';

interface ApiClientAttributes {
  // Primary key
  id: string;

  // Foreign Keys relationships
  applicationId: number;
  systemIssuerId: number;
  tokenTypeId: string;
  statusId: string;

  // Properties
  audience: string;
  secret: string;
  salt?: string;
  scopes: string;

  // Timestamps
  createdDate: Date;
  createdBy?: string;
  lastUpdatedDate?: Date;
  lastUpdatedBy?: string;
  deletedAt?: Date;
}

export type ApiClientInput = Optional<
  ApiClientAttributes,
  'id' | 'createdDate'
>;
export type ApiClientOutput = Required<ApiClientAttributes>;

class ApiClient
  extends Model<ApiClientAttributes, ApiClientInput>
  implements ApiClientAttributes
{
  public id!: string;

  public applicationId!: number;
  public systemIssuerId!: number;
  public tokenTypeId!: string;
  public statusId!: string;

  public audience!: string;
  public secret!: string;
  public salt!: string;
  public scopes!: string;

  // timestamps!
  public readonly createdDate!: Date;
  public readonly createdBy!: string;
  public readonly lastUpdatedDate!: Date;
  public readonly lastUpdatedBy!: string;
  public readonly deletedAt!: Date;
}

ApiClient.init(
  {
    id: {
      type: DataTypes.STRING,
      field: 'API_CLIENT_ID',
      primaryKey: true,
      validate: {
        len: {
          args: [0, 128],
          msg: 'String length is not in this range',
        },
      },
      allowNull: false,
    },
    applicationId: {
      type: DataTypes.INTEGER,
      field: 'APLCTN_ID',
      allowNull: false,
    },
    systemIssuerId: {
      type: DataTypes.INTEGER,
      field: 'APLCTN_ISSUER_ID',
      allowNull: false,
    },
    tokenTypeId: {
      type: DataTypes.STRING(32),
      field: 'TOKEN_TYPE',
      validate: {
        len: {
          args: [0, 128],
          msg: 'String length is not in this range',
        },
      },
    },
    statusId: {
      type: DataTypes.STRING(32),
      field: 'STUS_TYPE_CD',
      validate: {
        len: {
          args: [0, 32],
          msg: 'String length is not in this range',
        },
      },
    },
    audience: {
      type: DataTypes.STRING,
      field: 'SCOPES',
      validate: {
        len: {
          args: [0, 2000],
          msg: 'String length is not in this range',
        },
      },
    },
    secret: {
      type: DataTypes.STRING,
      field: 'RESTRICTED_IPS',
      allowNull: false,
      validate: {
        len: {
          args: [0, 1000],
          msg: 'String length is not in this range',
        },
      },
    },
    salt: {
      type: DataTypes.STRING,
      field: 'KEY_SECRET_HASH',
      allowNull: false,
      validate: {
        len: {
          args: [0, 128],
          msg: 'String length not in this range',
        },
      },
    },
    scopes: {
      type: DataTypes.STRING,
      field: 'KEY_SALT',
      allowNull: false,
      validate: {
        len: {
          args: [0, 128],
          msg: 'String length not in this range',
        },
      },
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
    lastUpdatedDate: {
      type: DataTypes.DATE,
      field: 'LAST_UPDATD_DT',
    },
    lastUpdatedBy: {
      type: DataTypes.STRING,
      field: 'LAST_UPDATD_BY',
      validate: {
        len: {
          args: [0, 48],
          msg: 'String length not in this range',
        },
      },
    },
    deletedAt: 'DLTD_DT',
  },
  {
    sequelize: WhooshLibrary.dbs.hpt_db,
    tableName: 'API_CLIENTS',
    modelName: 'ApiClient',
    schema: 'HPT_IDM_SERVICE_DB',
    freezeTableName: true,
    timestamps: false,
    paranoid: true,
  }
);

export default ApiClient;
