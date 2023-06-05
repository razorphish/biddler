import { DataTypes, Model } from 'sequelize';
import BiddlerLibrary from '../../global/biddler';
import { COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

interface TokenTypeAttributes
  extends Omit<TimestampAttributes, 'lastUpdatedDate' | 'lastUpdatedBy'> {
  // Primary Key(s)
  id: string;

  // Attribute(s)
  description?: string;
}

export type TokenTypeInput = TokenTypeAttributes;
export type TokenTypeOutput = TokenTypeAttributes;

class TokenType extends Model<TokenTypeAttributes, TokenTypeInput> implements TokenTypeAttributes {
  // Primary Key(s)
  public id!: string;

  // Attribute(s)
  public description!: string;

  // User stamp(s)
  public readonly createdBy!: string;

  // Timestamp(s)
  public readonly createdDate!: Date;
}

TokenType.init(
  {
    id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: 'TOKN_TYPE_CD',
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
    sequelize: BiddlerLibrary.dbs.hpt_idm_db,
    tableName: 'TOKN_TYPE_LKP',
    modelName: 'TokenType',
    schema: 'BIDDLER_IDM_DB',
    freezeTableName: true,
    timestamps: true,
    deletedAt: false,
    updatedAt: false,
    createdAt: COLUMN_NAME.CREATED_DT,
    paranoid: false
  }
);

// Hooks
// References
export default TokenType;
