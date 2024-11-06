/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional } from 'sequelize';
import BiddlerLibrary from '../../global/biddler';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE, COLUMN_ALIAS } from '../../common/db.enum';
import { TimestampAttributes } from '../../global/interfaces';

interface LookupAttributes extends TimestampAttributes {
  // Primary Key(s)
  id: string;

  // Foreign Key(s)
  // Attribute(s)
  code: string;
  group: string;
  title?: string;
  description?: string;
  isDefault?: boolean;
  sortOrder?: number;
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;
}

export interface LookupInput extends Optional<LookupAttributes, 'id'> {}
export interface LookupOutput extends LookupAttributes {}

class Lookup extends Model<LookupAttributes, LookupInput> implements LookupAttributes {
  // Primary Key(s)
  public id!: string;

  // Attribute(s)
  public code!: string;
  public group!: string;
  public title!: string;
  public description!: string;
  public isDefault!: boolean;
  public sortOrder!: number;
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

Lookup.init(
  {
    id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: 'LKP_ID',
      primaryKey: true,
      validate: {
        len: {
          args: [1, 32],
          msg: COLUMN_VALIDATION.LENGTH('id')
        }
      }
    },
    code: {
      type: DataTypes.STRING(64),
      field: 'LKP_CD',
      validate: {
        len: {
          args: [0, 64],
          msg: COLUMN_VALIDATION.LENGTH('code')
        }
      }
    },
    group: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'LKP_GRP_NAME',
      validate: {
        len: {
          args: [0, 64],
          msg: COLUMN_VALIDATION.LENGTH('group')
        }
      }
    },
    title: {
      type: DataTypes.STRING(128),
      field: 'LKP_TITLE',
      validate: {
        len: {
          args: [0, 128],
          msg: COLUMN_VALIDATION.LENGTH('title')
        }
      }
    },
    description: {
      type: DataTypes.STRING(256),
      field: 'LKP_DESC',
      validate: {
        len: {
          args: [0, 64],
          msg: COLUMN_VALIDATION.LENGTH('description')
        }
      }
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      field: 'LKP_DFLT',
      defaultValue: false
    },
    sortOrder: {
      type: DataTypes.DECIMAL(4, 2),
      field: 'SORT_ORDR'
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
    tableName: 'STUS_TYPE_LKP',
    modelName: 'Lookup',
    schema: 'BIDDLER_IDM_DB',
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
export default Lookup;
