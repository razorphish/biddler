import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { DataSource, Status } from '.';
import BeastLibrary from '../../global/beast';
import { onAfterCreateDataLake } from '../hooks/dataLake.hook';

interface DataLakeAttributes {
  id: number;
  dataSourceId: number;
  statusId: string;
  parentId?: number;
  json?: string;
  meta?: string;
  raw?: string;

  //Timestamps
  createdDate: Date;
  createdBy?: string;
  lastUpdatedDate?: Date;
  lastUpdatedBy?: string;
}

export interface DataLakeInput
  extends Optional<DataLakeAttributes, 'id' | 'createdDate'> {}
export interface DataLakeOutput extends Required<DataLakeAttributes> {}

class DataLake
  extends Model<DataLakeAttributes, DataLakeInput>
  implements DataLakeAttributes
{
  public id!: number;
  public dataSourceId!: number;
  public statusId!: string;
  public parentId!: number;
  public json!: string;
  public meta!: string;
  public raw: string;

  // timestamps
  public readonly createdDate!: Date;
  public readonly createdBy!: string;
  public readonly lastUpdatedDate!: Date;
  public readonly lastUpdatedBy!: string;

  static byStatusId = async (statusId: string): Promise<DataLakeOutput[]> => {
    const _include = [
      { model: DataSource, as: 'dataSource' },
      { model: Status, as: 'status' }
    ];

    const _query = {
      statusId: statusId
    };

    const _logging = false;
    const _attributes: string[] = [];

    return this.findAll({
      include: _include,
      logging: _logging,
      where: _query,
      attributes: _attributes
    });
  };
}

DataLake.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'DATA_SRC_DTL_ID',
      primaryKey: true,
      autoIncrement: true
    },
    dataSourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'DATA_SRC_ID'
    },
    statusId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'STUS_TYPE_CD'
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'PRNT_ID'
    },
    json: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'JSON_DATA'
    },
    meta: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'META_INFO'
    },
    raw: {
      type: DataTypes.BLOB,
      allowNull: true,
      field: 'RAW_DATA'
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
    tableName: 'DATA_SRC_DTL',
    modelName: 'DataLake',
    freezeTableName: true,
    timestamps: false
  }
);

// Hooks

// MUST BE CALLED so that 'afterCreate' hook
// can be called
DataLake.beforeBulkUpdate(async (options) => {
  options.individualHooks = true;
});

DataLake.afterCreate(async (dataLake) => {
  await onAfterCreateDataLake(dataLake);
});

// References
DataLake.hasOne(DataSource, {
  foreignKey: 'id',
  sourceKey: 'dataSourceId',
  as: 'dataSource',
  constraints: false
});

DataLake.hasOne(Status, {
  foreignKey: 'id',
  sourceKey: 'statusId',
  as: 'status',
  constraints: false
});

DataLake.hasOne(DataLake, {
  foreignKey: 'id',
  sourceKey: 'parentId',
  as: 'parent',
  constraints: false
});

DataLake.hasMany(DataLake, {
  foreignKey: 'parentId',
  as: 'children',
  constraints: false
});

export default DataLake;
