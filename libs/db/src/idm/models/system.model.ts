import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import BeastLibrary from '../../global/beast';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { TimestampAttributes } from '../interfaces/timeStampAttributes.interface';
import Status from './status.model';

interface SystemAttributes extends TimestampAttributes {
  id: number;
  statusId: string;
  name: string;
  slug: string;
  description?: string;
  url?: string;
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;
}

export interface SystemInput extends Optional<SystemAttributes, 'id' | 'createdDate'> {}
export interface SystemOutput extends Required<SystemAttributes> {}

class System extends Model<SystemAttributes, SystemInput> implements SystemAttributes {
  public id!: number;
  public statusId!: string;
  public name!: string;
  public slug!: string;
  public description!: string;
  public url!: string;
  public effectiveStartDate!: Date;
  public effectiveEndDate!: Date;

  // timestamps!
  public readonly createdDate!: Date;
  public readonly createdBy!: string;
  public readonly lastUpdatedDate!: Date;
  public readonly lastUpdatedBy!: string;
  public readonly deletedAt!: Date;
}

System.init(
  {
    id: {
      type: DataTypes.NUMBER,
      field: 'SYS_ID',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    statusId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: COLUMN_NAME.STATUS_ID
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'SYS_NAME',
      validate: {
        len: {
          args: [0, 64],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    slug: {
      type: DataTypes.STRING(96),
      field: 'SYS_NAME_SLUG',
      allowNull: false,
      validate: {
        len: {
          args: [0, 96],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    description: {
      type: DataTypes.STRING(256),
      field: 'SYS_DESC',
      allowNull: true,
      validate: {
        len: {
          args: [0, 256],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    url: {
      type: DataTypes.STRING(256),
      field: 'SYS_URL',
      allowNull: true,
      validate: {
        len: {
          args: [0, 256],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    effectiveStartDate: {
      type: DataTypes.DATE,
      field: COLUMN_NAME.EFFECTIVE_START_DATE,
      allowNull: true
    },
    effectiveEndDate: {
      type: DataTypes.DATE,
      field: COLUMN_NAME.EFFECTIVE_END_DATE,
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
    }
  },
  {
    sequelize: BeastLibrary.dbs.hpt_db,
    tableName: 'SYS_INFO',
    modelName: 'System',
    schema: 'HPT_IDM_DB',
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
System.hasOne(Status, {
  foreignKey: 'id',
  sourceKey: 'statusId',
  as: 'status'
});

export default System;
