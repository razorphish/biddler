/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Sequelize } from 'sequelize';
import WhooshLibrary from '../../global/whoosh';
import { COLUMN_ALIAS, COLUMN_NAME } from '../../common/db.enum';
import { TimestampAttributes } from '../interfaces/timestampAttributes.interface';

interface AddressTypeAttributes
  extends Omit<TimestampAttributes, 'lastUpdatedDate' | 'lastUpdatedBy'> {
  id: string;
  description?: string;
}

export interface AddressTypeInput extends AddressTypeAttributes {}
export interface AddressTypeOutput extends AddressTypeAttributes {}

class AddressType
  extends Model<AddressTypeAttributes, AddressTypeInput>
  implements AddressTypeAttributes
{
  public id!: string;
  public description!: string;

  // timestamps
  public readonly createdDate!: Date;
  public readonly createdBy!: string;

  // Timestamp(s)
  public readonly deletedAt!: Date;
}

AddressType.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ADDR_TYPE_CD',
      primaryKey: true,
      validate: {
        max: {
          args: [32],
          msg: 'String length is over size limit'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'TYPE_DESC',
      validate: {
        len: {
          args: [0, 64],
          msg: 'String length is not in this range'
        }
      }
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'CREATD_DT',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    createdBy: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 48],
          msg: 'String length is not in this range'
        }
      },
      field: 'CREATD_BY',
      defaultValue: 'SYSTEM'
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: COLUMN_NAME.DELETED_AT
    }
  },
  {
    sequelize: WhooshLibrary.dbs.whoosh_db,
    tableName: 'ADDR_TYPE_LKP',
    modelName: 'AddressType',
    freezeTableName: true,
    timestamps: true,
    createdAt: COLUMN_ALIAS.CREATD_DT,
    updatedAt: false,
    deletedAt: COLUMN_ALIAS.DLTD_AT,
    paranoid: true
  }
);
// Hooks
// References
export default AddressType;
