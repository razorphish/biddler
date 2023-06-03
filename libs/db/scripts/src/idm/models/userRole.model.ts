import { DataTypes, Model, Optional } from 'sequelize';
import BiddlerLibrary from '../../global/biddler';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';
import { RoleInput, RoleOutput } from './role.model';
import Status from './status.model';
import { UserInput, UserOutput } from './user.model';

interface UserRoleAttributes extends TimestampAttributes {
  // Primary Key(s)
  // Foreign Key(s)
  userId: number;
  roleId: string;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
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
  // Primary Key(s)
  // Foreign Key(s)
  public userId!: number;
  public roleId!: string;

  // Foreign Key(s)
  public statusId!: string;

  // Attribute(s)
  public effectiveStartDate!: Date;
  public effectiveEndDate!: Date;

  // User stamp(s)
  public createdBy!: string;
  public lastUpdatedBy!: string;

  // Timestamp(s)
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
    sequelize: BiddlerLibrary.dbs.biddler_idm_db,
    tableName: 'USER_ROLES',
    modelName: 'UserRole',
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
UserRole.belongsTo(Status, {
  foreignKey: 'id',
  targetKey: 'statusId',
  as: 'status'
});

export default UserRole;
