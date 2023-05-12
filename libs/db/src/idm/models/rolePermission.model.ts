import { DataTypes, Model, Optional } from 'sequelize';
import BeastLibrary from '../../global/beast';
import { Permission, Role } from '.';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { PermissionInput, PermissionOutput } from './permission.model';
import { RoleInput, RoleOutput } from './role.model';
import { TimestampAttributes } from '../interfaces/timeStampAttributes.interface';

interface RolePermissionAttributes extends TimestampAttributes {
  // Primary Key
  roleId: string;
  permissionId: string;

  // Foreign Key
  statusId: string;

  // Attributes
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;
}

export interface RolePermissionInput extends Optional<RolePermissionAttributes, 'createdDate'> {
  role?: RoleInput;
  permission?: PermissionInput;
}

export interface RolePermissionOutput extends RolePermissionInput {
  role?: RoleOutput;
  permission?: PermissionOutput;
}

class RolePermission
  extends Model<RolePermissionAttributes, RolePermissionInput>
  implements RolePermissionAttributes
{
  // Primary Key
  roleId!: string;
  permissionId!: string;

  // Foreign keys
  public statusId!: string;

  // Attributes
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

RolePermission.init(
  {
    roleId: {
      type: DataTypes.STRING(24),
      allowNull: false,
      field: 'ROLE_ID',
      primaryKey: true
    },
    permissionId: {
      type: DataTypes.STRING(24),
      allowNull: false,
      field: 'PERMSN_ID',
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
    tableName: 'ROLE_PERMSN',
    modelName: 'RolePermission',
    freezeTableName: true,
    timestamps: true,
    deletedAt: COLUMN_NAME.DELETED_AT,
    updatedAt: COLUMN_NAME.LAST_UPDATED_DATE,
    createdAt: COLUMN_NAME.CREATED_DT,
    paranoid: true
  }
);

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: 'roleId',
  as: 'roles',
  constraints: false
});

Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: 'permissionId',
  as: 'Permissions',
  constraints: false
});

// Hooks
// References
export default RolePermission;
