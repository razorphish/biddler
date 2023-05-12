import { DataTypes, Model } from 'sequelize';
import BeastLibrary from '../../global/beast';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { TimestampAttributes } from '../interfaces/timeStampAttributes.interface';

interface StatusAttributes extends Omit<TimestampAttributes, 'lastUpdatedDate' | 'lastUpdatedBy'> {
  id: string;
  description?: string;
}

export interface StatusInput extends StatusAttributes {}
export interface StatusOutput extends StatusAttributes {}

class Status extends Model<StatusAttributes, StatusInput> implements StatusAttributes {
  public id!: string;
  public description!: string;

  // User stamps
  public readonly createdBy!: string;

  // Timestamps
  public readonly createdDate!: Date;
}

Status.init(
  {
    id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: COLUMN_NAME.STATUS_ID,
      primaryKey: true,
      validate: {
        max: {
          args: [32],
          msg: COLUMN_VALIDATION.MAX
        }
      }
    },
    description: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'TYPE_DESC',
      validate: {
        max: {
          args: [64],
          msg: COLUMN_VALIDATION.MAX
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
    }
  },
  {
    sequelize: BeastLibrary.dbs.hpt_idm_db,
    tableName: 'STUS_TYPE_LKP',
    modelName: 'Status',
    freezeTableName: true,
    timestamps: true,
    createdAt: COLUMN_NAME.CREATED_DT,
    updatedAt: false,
    deletedAt: false,
    paranoid: false
  }
);
// Hooks
// References
export default Status;
