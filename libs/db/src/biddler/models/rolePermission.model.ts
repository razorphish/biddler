import { DataTypes, Model, Optional } from 'sequelize';
import BiddlerLibrary from '../../global/biddler';
import { Lookup } from '.';
import { COLUMN_ALIAS, COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

interface RolePermissionAttributes extends TimestampAttributes {
  // Primary Key(s)
  roleId: string;
  permissionId: string;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  effectiveStartDate: Date;
  effectiveEndDate: Date;
}

export type RolePermissionInput = Optional<
  RolePermissionAttributes,
  'createdDate' | 'lastUpdatedDate'
>;
export type RolePermissionOutput = Required<RolePermissionAttributes>;

class RolePermission
  extends Model<RolePermissionAttributes, RolePermissionInput>
  implements RolePermissionAttributes
{
  // Primary Key(s)
  public roleId!: string;
  public permissionId!: string;

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
      type: DataTypes.INTEGER,
      field: 'ROLE_ID',
      allowNull: false,
      primaryKey: true
    },
    permissionId: {
      type: DataTypes.INTEGER,
      field: 'PERMSN_ID',
      allowNull: false,
      primaryKey: true
    },
    statusId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: COLUMN_NAME.STATUS_ID
    },
    effectiveStartDate: {
      type: DataTypes.DATE,
      field: COLUMN_NAME.EFFECTIVE_START_DATE
    },
    effectiveEndDate: {
      type: DataTypes.DATE,
      field: COLUMN_NAME.EFFECTIVE_END_DATE
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
    sequelize: BiddlerLibrary.dbs.biddler_db,
    tableName: 'ROLE_PERSN',
    modelName: 'RolePermission',
    schema: 'BIDDLER_DB',
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
RolePermission.belongsTo(Lookup, {
  foreignKey: 'statusId',
  targetKey: 'id',
  as: 'status'
});

export default RolePermission;
