import { DataTypes, Model, Optional } from 'sequelize';
import BiddlerLibrary from '../../global/biddler';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { PermissionInput, PermissionOutput } from './permission.model';
import { RoleInput, RoleOutput } from './role.model';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';
import { Status, Permission, Role } from '.';

interface RolePermissionAttributes extends TimestampAttributes {
  // Primary Key(s)
  roleId: string;
  permissionId: string;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
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
  // Primary Key(s)
  // Foreign Key(s)
  roleId!: string;
  permissionId!: string;

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
    tableName: 'ROLE_PERMSN',
    modelName: 'RolePermission',
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

RolePermission.belongsTo(Status, {
  foreignKey: 'id',
  targetKey: 'statusId',
  as: 'status'
});

export default RolePermission;
