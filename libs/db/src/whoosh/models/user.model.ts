import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import BeastLibrary from '../../global/beast';

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;

  //Timestamps
  createdDate: Date;
  createdBy?: string;
  lastUpdatedDate?: Date;
  lastUpdatedBy?: string;
}

export interface UserInput
  extends Optional<UserAttributes, 'id' | 'createdDate'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;

  // timestamps
  public readonly createdDate!: Date;
  public readonly createdBy!: string;
  public readonly lastUpdatedDate!: Date;
  public readonly lastUpdatedBy!: string;


  static byId = async (id: string | number) => {
    return this.findOne({
      where: {
        id: id
      }
    });
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'USER_ID',
      primaryKey: true,
      autoIncrement: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'FIRST_NAME',
      validate: {
        len: {
          args: [0, 32],
          msg: 'String length is not in this range'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'LAST_NAME',
      validate: {
        len: {
          args: [0, 64],
          msg: 'String length is not in this range'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'EMAIL',
      validate: {
        len: {
          args: [0, 64],
          msg: 'String length is not in this range'
        }
      }
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
    tableName: 'USER_INFO',
    modelName: 'User',
    freezeTableName: true,
    timestamps: false,
    schema: 'HPT_DB'
  }
);

// Hooks
// References
export default User;
