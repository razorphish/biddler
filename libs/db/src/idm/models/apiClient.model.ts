/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional } from 'sequelize';
import BiddlerLibrary from '../../global/biddler';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { COLUMN_ALIAS } from '../../common/db.enum';
import Lookup from './lookup.model';
import { generateRandomID, generateSecretKeyWithHash } from '../../common/helpers/crypt.helper';

interface ApiClientAttributes extends TimestampAttributes {
  // Primary Key(s)
  id: string;

  // Foreign Key(s)
  applicationId: number;
  systemIssuerId: number;
  tokenTypeId: string;
  statusId: string;

  // Attribute(s)
  homepageURL?: string;
  clientID?: string;
  clientSecret?: string;
  clientSecretHash?: string;
  salt?: string;
  scopes?: string;
}

export interface ApiClientInput
  extends Optional<ApiClientAttributes, 'id' | 'createdDate' | 'lastUpdatedDate'> {}
export interface ApiClientOutput extends Required<ApiClientAttributes> {
  key?: string;
}

class ApiClient extends Model<ApiClientAttributes, ApiClientInput> implements ApiClientAttributes {
  // Primary Key(s)
  public id!: string;

  // Foreign Key(s)
  public applicationId!: number;
  public systemIssuerId!: number;
  public tokenTypeId!: string;
  public statusId!: string;

  // Attribute(s)
  public homepageURL!: string;
  public clientID!: string;
  public clientSecret!: string;
  public clientSecretHash!: string;
  public salt!: string;
  public scopes!: string;

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
      type: DataTypes.INTEGER,
      field: 'API_CLIENT_ID',
      primaryKey: true,
      autoIncrement: true,
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
          msg: COLUMN_VALIDATION.LENGTH('tokenTypeId')
        }
      }
    },
    statusId: {
      type: DataTypes.STRING(32),
      field: COLUMN_NAME.STATUS_ID,
      allowNull: false
    },
    homepageURL: {
      type: DataTypes.STRING(256),
      field: 'HOME_PG_URL',
      validate: {
        len: {
          args: [0, 256],
          msg: COLUMN_VALIDATION.LENGTH('homepageURL')
        }
      }
    },
    clientID: {
      type: DataTypes.STRING(36),
      field: 'CLIENT_ID',
      set() {
        this.setDataValue('clientID', generateRandomID());

        const { key, salt, hash } = generateSecretKeyWithHash();
        this.setDataValue('salt', salt);
        this.setDataValue('clientSecretHash', hash);
        this.setDataValue('clientSecret', key);
      }
    },
    clientSecret: {
      type: DataTypes.VIRTUAL()
    },
    clientSecretHash: {
      type: DataTypes.STRING(256),
      field: 'CLIENT_SECRET_HASH',
      validate: {
        len: {
          args: [0, 256],
          msg: COLUMN_VALIDATION.LENGTH('clientSecretHash')
        }
      }
    },
    salt: {
      type: DataTypes.STRING(256),
      field: 'SALT',
      validate: {
        len: {
          args: [0, 256],
          msg: COLUMN_VALIDATION.LENGTH('salt')
        }
      }
    },
    scopes: {
      type: DataTypes.STRING(2048),
      field: 'SCOPES',
      validate: {
        len: {
          args: [0, 2048],
          msg: COLUMN_VALIDATION.LENGTH('scopes')
        }
      }
    },
    createdBy: {
      type: DataTypes.STRING(48),
      validate: {
        len: {
          args: [0, 48],
          msg: COLUMN_VALIDATION.LENGTH('createdBy')
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
          msg: COLUMN_VALIDATION.LENGTH('lastUpdatedBy')
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
    defaultScope: {
      attributes: {
        exclude: ['clientSecretHash', 'salt']
      }
    },
    scopes: {
      withPasswordAndSalt: {}
    },
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
  targetKey: 'id',
  foreignKey: 'statusId',
  as: 'status'
});

export default ApiClient;
