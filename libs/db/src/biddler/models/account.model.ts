import { DataTypes, Model, Optional } from 'sequelize';
import BiddlerLibrary from '../../global/biddler';
import { Status } from '.';
import { COLUMN_ALIAS, COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

interface AccountAttributes extends TimestampAttributes {
  // Primary Key(s)
  id: number;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  name: string;
}

export type AccountInput = Optional<AccountAttributes, 'id' | 'createdDate' | 'lastUpdatedDate'>;
export type AccountOutput = Required<AccountAttributes>;

class Account extends Model<AccountAttributes, AccountInput> implements AccountAttributes {
  // Primary Key(s)
  public id!: number;

  // Foreign Key(s)
  public statusId!: string;

  // Attribute(s)
  public name!: string;

  // User stamp(s)
  public createdBy!: string;
  public lastUpdatedBy!: string;

  // Timestamp(s)
  public readonly createdDate!: Date;
  public readonly lastUpdatedDate!: Date;
  public readonly deletedAt!: Date;
}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      field: 'ACNT_ID',
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    statusId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: COLUMN_NAME.STATUS_ID
    },
    name: {
      type: DataTypes.STRING(32),
      field: 'ACS_NAME',
      allowNull: false
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
    sequelize: BiddlerLibrary.dbs.biddler_db,
    tableName: 'ACNT_INFO',
    modelName: 'Account',
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
Account.belongsTo(Status, {
  foreignKey: 'id',
  targetKey: 'statusId',
  as: 'status'
});

export default Account;
