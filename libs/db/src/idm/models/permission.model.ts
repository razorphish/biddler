import { DataTypes, Model, Optional } from 'sequelize';
import BeastLibrary from '../../global/beast';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { TimestampAttributes } from '../interfaces/timeStampAttributes.interface';
import Status from './status.model';

interface PermissionAttributes extends TimestampAttributes {
  // Primary Key
  id: string;

  // Foreign keys
  statusId: string;

  // Properties
  description?: string;
}

export interface PermissionInput extends Optional<PermissionAttributes, 'createdDate'> {}
export interface PermissionOutput extends PermissionAttributes {}

class Permission
  extends Model<PermissionAttributes, PermissionInput>
  implements PermissionAttributes
{
  public id!: string;
  public statusId!: string;
  public description!: string;

  // User stamps
  public createdBy!: string;
  public lastUpdatedBy!: string;

  // Timestamps
  public readonly createdDate!: Date;
  public readonly lastUpdatedDate!: Date;
  public readonly deletedAt!: Date;
}

Permission.init(
  {
    id: {
      type: DataTypes.STRING(24),
      allowNull: false,
      field: 'PERMSN_ID',
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
      field: 'PERMSN_DESC',
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
    tableName: 'PERMSN_INFO',
    modelName: 'Permission',
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
Permission.hasOne(Status, {
  foreignKey: 'id',
  sourceKey: 'statusId',
  as: 'status'
});

export default Permission;
