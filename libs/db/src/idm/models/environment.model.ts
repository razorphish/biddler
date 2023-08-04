import { DataTypes, Model, Optional } from 'sequelize';
import BiddlerLibrary from '../../global/biddler';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';
import Lookup from './lookup.model';

interface EnvironmentAttributes extends TimestampAttributes {
  // Primary Key(s)
  id: string;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  aliases: string;
  description?: string;
}

export type EnvironmentInput = Optional<
  EnvironmentAttributes,
  'id' | 'createdDate' | 'lastUpdatedDate'
>;
export type EnvironmentOutput = EnvironmentAttributes;

class Environment
  extends Model<EnvironmentAttributes, EnvironmentInput>
  implements EnvironmentAttributes
{
  // Primary Key(s)
  public id!: string;

  // Foreign Key(s)
  public statusId!: string;

  // Attribute(s)
  public aliases!: string;
  public description!: string;

  // User stamp(s)
  public createdBy!: string;
  public lastUpdatedBy!: string;

  // Timestamp(s)
  public readonly createdDate!: Date;
  public readonly lastUpdatedDate!: Date;
  public readonly deletedAt!: Date;
}

Environment.init(
  {
    id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: 'ENV_INFO_CD',
      primaryKey: true,
      autoIncrement: true
    },
    statusId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: COLUMN_NAME.STATUS_ID
    },
    description: {
      type: DataTypes.STRING(64),
      field: 'ENV_DESC',
      defaultValue: 'Environment Description',
      validate: {
        len: {
          args: [0, 64],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    aliases: {
      type: DataTypes.STRING(512),
      field: 'ENV_ALIASES',
      allowNull: false,
      validate: {
        len: {
          args: [0, 512],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
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
    sequelize: BiddlerLibrary.dbs.biddler_idm_db,
    tableName: 'ENV_INFO',
    modelName: 'Environment',
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
Environment.belongsTo(Lookup, {
  foreignKey: 'statusId',
  targetKey: 'id',
  as: 'status'
});

export default Environment;
