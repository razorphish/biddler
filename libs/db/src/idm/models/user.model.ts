/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional } from 'sequelize';
import BiddlerLibrary from '../../global/biddler';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';
import Lookup from './lookup.model';

interface UserAttributes extends TimestampAttributes {
  // Primary Key(s)
  id: number;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  salt: string;
  password?: string;
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'createdDate'> {
  //userRoles?: UserRoleInput[];
}
export interface UserOutput extends Required<UserAttributes> {
  //userRoles?: UserRoleOutput[];
}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  // Primary Key(s)
  public id!: number;

  // Foreign Key(s)
  public statusId!: string;

  // Attribute(s)
  public firstName!: string;
  public lastName!: string;
  public username!: string;
  public email!: string;
  public salt!: string;
  public password!: string;

  // User stamp(s)
  public createdBy!: string;
  public lastUpdatedBy!: string;

  // Timestamp(s)
  public readonly createdDate!: Date;
  public readonly lastUpdatedDate!: Date;
  public readonly deletedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'USER_ID',
      primaryKey: true,
      autoIncrement: false
    },
    statusId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: COLUMN_NAME.STATUS_ID
    },
    firstName: {
      type: DataTypes.STRING(32),
      field: 'FIRST_NAME',
      validate: {
        len: {
          args: [0, 32],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    lastName: {
      type: DataTypes.STRING(64),
      field: 'LAST_NAME',
      validate: {
        len: {
          args: [0, 64],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    username: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: 'USER_NAME',
      validate: {
        len: {
          args: [0, 256],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: 'EMAIL',
      validate: {
        len: {
          args: [0, 256],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    salt: {
      type: DataTypes.STRING(64),
      field: 'SALT',
      allowNull: false,
      validate: {
        len: {
          args: [0, 64],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'PWD',
      validate: {
        len: {
          args: [0, 64],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
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
    tableName: 'USER_INFO',
    modelName: 'User',
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
User.belongsTo(Lookup, {
  foreignKey: 'id',
  targetKey: 'statusId',
  as: 'status'
});

export default User;
