/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional } from 'sequelize';
import BiddlerLibrary from '../../global/biddler';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { TimestampAttributes } from '../../global/interfaces';

interface SystemAttributes extends TimestampAttributes {
  // Primary Key(s)
  id: string;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  name: string;
  slug: string;
  description?: string;
  url?: string;
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;
}

export interface SystemInput extends Optional<SystemAttributes, 'id'> {}
export interface SystemOutput extends SystemAttributes {}

class System extends Model<SystemAttributes, SystemInput> implements SystemAttributes {
  // Primary Key(s)
  public id!: string;

  // Foreign Key(s)
  public statusId!: string;

  // Attribute(s)
  public name!: string;
  public slug!: string;
  public description!: string;
  public url!: string;
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

System.init(
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: 'SYS_ID',
      primaryKey: true,
      autoIncrement: true
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
          msg: COLUMN_VALIDATION.LENGTH('name')
        }
      }
    },
    slug: {
      type: DataTypes.STRING(96),
      field: 'SYS_NAME_SLUG',
      validate: {
        len: {
          args: [0, 96],
          msg: COLUMN_VALIDATION.LENGTH('slug')
        }
      }
    },
    description: {
      type: DataTypes.STRING(256),
      field: 'SYS_DESC',
      validate: {
        len: {
          args: [0, 64],
          msg: COLUMN_VALIDATION.LENGTH('description')
        }
      }
    },
    url: {
      type: DataTypes.STRING(256),
      field: 'SYS_URL',
      validate: {
        len: {
          args: [0, 256],
          msg: COLUMN_VALIDATION.LENGTH('url')
        }
      }
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
    sequelize: BiddlerLibrary.dbs.biddler_idm_db,
    tableName: 'SYS_INFO',
    modelName: 'System',
    schema: 'BIDDLER_IDM_DB',
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
export default System;
