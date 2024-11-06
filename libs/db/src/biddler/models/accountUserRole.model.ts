import { DataTypes, Model, Optional } from 'sequelize';
import BiddlerLibrary from '../../global/biddler';
import { Lookup } from '.';
import { COLUMN_ALIAS, COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

interface AccountUserRoleAttributes extends TimestampAttributes {
  // Primary Key(s)
  accountId: number;
  userId: number;
  roleId: string;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  effectiveStartDate: Date;
  effectiveEndDate: Date;
}

export type AccountUserRoleInput = Optional<
  AccountUserRoleAttributes,
  'createdDate' | 'lastUpdatedDate'
>;
export type AccountUserRoleOutput = Required<AccountUserRoleAttributes>;

class AccountUserRole
  extends Model<AccountUserRoleAttributes, AccountUserRoleInput>
  implements AccountUserRoleAttributes
{
  // Primary Key(s)
  public accountId!: number;
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

AccountUserRole.init(
  {
    accountId: {
      type: DataTypes.INTEGER,
      field: 'ACNT_ID',
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'USER_ID',
      allowNull: false,
      primaryKey: true
    },
    roleId: {
      type: DataTypes.STRING(32),
      field: 'ROLE_ID',
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
    tableName: 'ACNT_USER_ROLE',
    modelName: 'AccountUserRole',
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
AccountUserRole.belongsTo(Lookup, {
  foreignKey: 'statusId',
  targetKey: 'id',
  as: 'status'
});

export default AccountUserRole;
