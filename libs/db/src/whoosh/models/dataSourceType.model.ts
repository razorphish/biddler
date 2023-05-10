import { DataTypes, Model, Sequelize } from 'sequelize';
import BeastLibrary from '../../global/beast';

interface DataSourceTypeAttributes {
  id: string;
  description?: string;

  createdDate: Date;
  createdBy?: string;
}

export interface DataSourceTypeInput extends DataSourceTypeAttributes {}
export interface DataSourceTypeOutput extends DataSourceTypeAttributes {}

class DataSourceType
  extends Model<DataSourceTypeAttributes, DataSourceTypeInput>
  implements DataSourceTypeAttributes
{
  public id!: string;
  public description!: string;

  // timestamps
  public readonly createdDate!: Date;
  public readonly createdBy!: string;
}

DataSourceType.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'DATA_SRC_TYPE_CD',
      primaryKey: true,
      validate: {
        max: {
          args: [24],
          msg: 'String length is not in this range'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'DATA_SRC_TYPE_DESC',
      validate: {
        len: {
          args: [0, 256],
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
      defaultValue: 'SYSTEM',
      validate: {
        len: {
          args: [0, 48],
          msg: 'String length is not in this range'
        }
      },
      field: 'CREATD_BY'
    }
  },
  {
    sequelize: BeastLibrary.dbs.hpt_db,
    tableName: 'DATA_SRC_TYPE_LKP',
    modelName: 'DataSourceType',
    freezeTableName: true,
    timestamps: false
  }
);

// Hooks
// References

export default DataSourceType;
