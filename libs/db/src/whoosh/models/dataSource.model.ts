import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { DataSourceType } from '.';
import BeastLibrary from '../../global/beast';

interface DataSourceAttributes {
  id: number;
  dataSource: string;
  displayName?: string;
  module?: string;
  typeId: string;
  effectiveEndDate: Date;

  //Timestamps
  createdDate: Date;
  createdBy?: string;
  lastUpdatedDate?: Date;
  lastUpdatedBy?: string;
}

export interface DataSourceInput extends Optional<DataSourceAttributes, 'id'> {}
export interface DataSourceOutput extends Required<DataSourceAttributes> {}

class DataSource
  extends Model<DataSourceAttributes, DataSourceInput>
  implements DataSourceAttributes
{
  public id!: number;
  public dataSource!: string;
  public displayName!: string;
  public module!: string;
  public typeId!: string;
  public effectiveEndDate!: Date;

  // timestamps
  public readonly createdDate!: Date;
  public readonly createdBy!: string;
  public readonly lastUpdatedDate!: Date;
  public readonly lastUpdatedBy!: string;
}

DataSource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'DATA_SRC_ID',
      primaryKey: true
    },
    dataSource: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'DATA_SRC',
      validate: {
        len: {
          args: [0, 48],
          msg: 'String length is not in this range'
        }
      }
    },
    displayName: {
      type: DataTypes.STRING,
      field: 'DSPLY_NAME',
      validate: {
        len: {
          args: [0, 48],
          msg: 'String length is not in this range'
        }
      }
    },
    effectiveEndDate: {
      type: DataTypes.DATE,
      field: 'EFCTV_END_DT'
    },
    module: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MOD_INFO',
      validate: {
        len: {
          args: [0, 48],
          msg: 'String length is not in this range'
        }
      }
    },
    typeId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'DATA_SRC_TYPE_CD',
      validate: {
        len: {
          args: [0, 24],
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
    lastUpdatedDate: {
      type: DataTypes.DATE,
      field: 'LAST_UPDATD_DT',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    lastUpdatedBy: {
      type: DataTypes.STRING,
      field: 'LAST_UPDATD_BY',
      defaultValue: 'SYSTEM',
      validate: {
        len: {
          args: [0, 48],
          msg: 'String length is not in this range'
        }
      }
    }
  },
  {
    sequelize: BeastLibrary.dbs.hpt_db,
    tableName: 'DATA_SRC_LKP',
    modelName: 'DataSource',
    freezeTableName: true,
    timestamps: false
  }
);

// Hooks
// References
DataSource.hasOne(DataSourceType, {
  foreignKey: 'id',
  sourceKey: 'typeId',
  as: 'type',
  constraints: false
});

export default DataSource;
