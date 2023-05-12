import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import BeastLibrary from '../../global/beast';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { TimestampAttributes } from '../interfaces/timeStampAttributes.interface';
import { RoleInput, RoleOutput } from './role.model';
import Status from './status.model';
import { UserInput, UserOutput } from './user.model';

interface UserRoleAttributes extends TimestampAttributes {
  // Primary Key
  userId: number;
  roleId: string;

  //Foreign keys
  statusId: string;

  //Attributes
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;
}

export interface UserRoleInput extends Optional<UserRoleAttributes, 'createdDate'> {
  role?: RoleInput;
  user?: UserInput;
}
export interface UserRoleOutput extends UserRoleInput {
  role?: RoleOutput;
  user?: UserOutput;
}

class UserRole extends Model<UserRoleAttributes, UserRoleInput> implements UserRoleAttributes {
  public userId!: number;
  public roleId!: string;

  public statusId!: string;

  public effectiveStartDate!: Date;
  public effectiveEndDate!: Date;

  // User stamps
  public createdBy!: string;
  public lastUpdatedBy!: string;

  // Timestamps
  public readonly createdDate!: Date;
  public readonly lastUpdatedDate!: Date;
  public readonly deletedAt!: Date;
}

UserRole.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'USER_ID',
      primaryKey: true
    },
    roleId: {
      type: DataTypes.STRING(24),
      allowNull: false,
      field: 'ROLE_ID',
      primaryKey: true
    },
    statusId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: COLUMN_NAME.STATUS_ID
    },
    effectiveStartDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: COLUMN_NAME.EFFECTIVE_START_DATE
    },
    effectiveEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: COLUMN_NAME.EFFECTIVE_END_DATE
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
    }
  },
  {
    sequelize: BeastLibrary.dbs.hpt_idm_db,
    tableName: 'USER_ROLES',
    modelName: 'UserRole',
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
UserRole.hasOne(Status, {
  foreignKey: 'id',
  sourceKey: 'statusId',
  as: 'status'
});

export default UserRole;
