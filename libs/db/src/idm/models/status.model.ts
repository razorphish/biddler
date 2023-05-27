/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model } from 'sequelize';
import WhooshLibrary from '../../global/whoosh';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

interface StatusAttributes extends Omit<TimestampAttributes, 'lastUpdatedDate' | 'lastUpdatedBy'> {
  // Primary Key(s)
  id: string;

  // Attribute(s)
  description?: string;
}

export interface StatusInput extends StatusAttributes {}
export interface StatusOutput extends StatusAttributes {}

class Status extends Model<StatusAttributes, StatusInput> implements StatusAttributes {
  // Primary Key(s)
  public id!: string;

  // Attribute(s)
  public description!: string;

  // User stamp(s)
  public readonly createdBy!: string;

  // Timestamp(s)
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
    sequelize: WhooshLibrary.dbs.whoosh_idm_db,
    tableName: 'STUS_TYPE_LKP',
    modelName: 'Status',
    schema: 'WHOOSH_IDM_DB',
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
