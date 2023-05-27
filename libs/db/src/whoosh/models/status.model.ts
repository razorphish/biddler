/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional } from 'sequelize';
import WhooshLibrary from '../../global/whoosh';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE, COLUMN_ALIAS } from '../../common/db.enum';
import { TimestampAttributes } from '../interfaces/timestampAttributes.interface';

interface StatusAttributes extends Omit<TimestampAttributes, 'lastUpdatedDate' | 'lastUpdatedBy'> {
  id: string;
  description?: string;
}

export interface StatusInput extends Optional<StatusAttributes, 'id'> {}
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
        len: {
          args: [1, 32],
          msg: COLUMN_VALIDATION.LENGTH
        }
      }
    },
    description: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'TYPE_DESC',
      validate: {
        len: {
          args: [0, 64],
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
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: COLUMN_NAME.CREATED_DT
    }
  },
  {
    sequelize: WhooshLibrary.dbs.whoosh_db,
    tableName: 'STUS_TYPE_LKP',
    modelName: 'Status',
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
export default Status;
