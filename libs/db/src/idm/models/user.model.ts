import { DataTypes, Model, Optional } from 'sequelize';
import WhooshLibrary from '../../global/whoosh';
import {
  COLUMN_NAME,
  COLUMN_VALIDATION,
  DEFAULT_VALUE,
} from '../../common/db.enum';
import { TimestampAttributes } from '../interfaces/timeStampAttributes.interface';
import Status from './status.model';
import { UserRoleInput, UserRoleOutput } from './userRole.model';

interface UserAttributes extends TimestampAttributes {
  // Primary Key
  id: number;

  // Foreign keys
  statusId: string;

  // Attributes
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  username: string;
  password?: string;
}

export interface UserInput
  extends Optional<UserAttributes, 'id' | 'createdDate'> {
  userRoles?: UserRoleInput[];
}
export interface UserOutput extends Required<UserAttributes> {
  userRoles?: UserRoleOutput[];
}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  // Primary Keys
  public id!: number;

  // Foreign Keys
  public statusId!: string;

  // Attributes
  public username!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phone!: string;

  // User stamps
  public createdBy!: string;
  public lastUpdatedBy!: string;

  // Timestamps
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
      autoIncrement: false,
    },
    statusId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: COLUMN_NAME.STATUS_ID,
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
      field: 'USER_NAME',
      validate: {
        max: {
          args: [128],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: true,
      field: 'USER_PW',
      validate: {
        len: {
          args: [0, 256],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    firstName: {
      type: DataTypes.STRING(48),
      allowNull: false,
      field: 'FIRST_NAME',
      validate: {
        len: {
          args: [0, 48],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    lastName: {
      type: DataTypes.STRING(96),
      allowNull: false,
      field: 'LAST_NAME',
      validate: {
        len: {
          args: [0, 64],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: 'EMAIL',
      validate: {
        max: {
          args: [256],
          msg: COLUMN_VALIDATION.MAX,
        },
      },
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: 'PHNE',
      validate: {
        len: {
          args: [0, 15],
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
    tableName: 'USER_INFO',
    modelName: 'User',
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
User.hasOne(Status, {
  foreignKey: 'id',
  sourceKey: 'statusId',
  as: 'status',
});

export default User;
