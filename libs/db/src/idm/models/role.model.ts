import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { DataTypes, Model, Optional } from 'sequelize';
import BeastLibrary from '../../global/beast';
import { PermissionInput, PermissionOutput } from './permission.model';
import Status from './status.model';
import { TimestampAttributes } from '../interfaces/timeStampAttributes.interface';

interface RoleAttributes extends TimestampAttributes {
  // Primary key
  id: string;

  // Foreign key
  statusId: string;

  //Properties
  description?: string;
}

export interface RoleInput extends Optional<RoleAttributes, 'createdDate'> {
  permissions?: PermissionInput[];
}
export interface RoleOutput extends Required<RoleAttributes> {
  permissions?: PermissionOutput[];
}

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
  id!: string;
  description!: string;
  statusId!: string;

  // timestamps
  public createdBy!: string;
  public lastUpdatedBy!: string;

  public readonly createdDate!: Date;
  public readonly lastUpdatedDate!: Date;
  public readonly deletedAt!: Date;
}

Role.init(
  {
    id: {
      type: DataTypes.STRING(24),
      allowNull: false,
      field: 'ROLE_ID',
      primaryKey: true,
      validate: {
        max: {
          args: [24],
          msg: COLUMN_VALIDATION.MAX
        }
      }
    },
    statusId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: COLUMN_NAME.STATUS_ID
    },
    description: {
      type: DataTypes.STRING(128),
      field: 'ROLE_DESC',
      allowNull: true,
      validate: {
        len: {
          args: [0, 128],
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
    }
  },
  {
    sequelize: BeastLibrary.dbs.hpt_idm_db,
    tableName: 'ROLE_INFO',
    modelName: 'Role',
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
Role.hasOne(Status, {
  foreignKey: 'id',
  sourceKey: 'statusId',
  as: 'status'
});

export default Role;
