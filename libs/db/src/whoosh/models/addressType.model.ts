import { DataTypes, Model, Sequelize } from 'sequelize';
import BeastLibrary from '../../global/beast';

interface AddressTypeAttributes {
  id: string;
  description?: string;

  createdDate: Date;
  createdBy?: string;
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
    }
  },
  {
    sequelize: BeastLibrary.dbs.hpt_db,
    tableName: 'ADDR_TYPE_LKP',
    modelName: 'AddressType',
    freezeTableName: true,
    timestamps: false
  }
);
// Hooks
// References
export default AddressType;
