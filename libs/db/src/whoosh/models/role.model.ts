import { DataTypes, Model, Optional } from 'sequelize';
import WhooshLibrary from '../../global/whoosh';
import { Status } from '../../whoosh/models';
import { COLUMN_ALIAS, COLUMN_NAME, COLUMN_VALIDATION, DEFAULT_VALUE } from '../../common/db.enum';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

interface RoleAttributes extends Omit<TimestampAttributes, 'lastUpdatedDate' | 'lastUpdatedBy'> {
  // Primary Key(s)
  id: number;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  description: string;
}

export type RoleInput = Optional<RoleAttributes, 'createdDate'>;
export type RoleOutput = Required<RoleAttributes>;

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
  // Primary Key(s)
  public id!: number;

  // Foreign Key(s)
  public statusId!: string;

  // Attribute(s)
  public description!: string;

  // User stamp(s)
  public createdBy!: string;

  // Timestamp(s)
  public readonly createdDate!: Date;
  public readonly deletedAt!: Date;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      field: 'ROLE_ID',
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    statusId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: COLUMN_NAME.STATUS_ID
    },
    description: {
      type: DataTypes.STRING(128),
      field: 'ROLE_DESC',
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
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: COLUMN_NAME.CREATED_DT
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: COLUMN_NAME.DELETED_AT
    }
  },
  {
    sequelize: WhooshLibrary.dbs.whoosh_db,
    tableName: 'ROLE_INFO',
    modelName: 'Role',
    schema: 'WHOOSH_DB',
    freezeTableName: true,
    timestamps: true,
    deletedAt: COLUMN_ALIAS.DLTD_AT,
    updatedAt: false,
    createdAt: COLUMN_ALIAS.CREATD_DT,
    paranoid: true
  }
);

//Hooks
//references
Role.belongsTo(Status, {
  foreignKey: 'id',
  targetKey: 'statusId',
  as: 'status'
});

export default Role;
