import { DataTypes, Model, Optional } from 'sequelize';
import { Status } from '.';
import Whoosh from '../../global/whoosh';
import {
  COLUMN_ALIAS,
  COLUMN_NAME,
  COLUMN_VALIDATION,
  DEFAULT_VALUE,
} from '../common/db.enum';
import { TimestampAttributes } from '../interfaces/timestampAttributes.interface';
import { ruleMapRegionByState } from '../rules/address.rule';

interface AddressAttributes extends TimestampAttributes {
  id: number;
  typeId: string;
  statusId: string;
  line1: string;
  line2?: string;
  line3?: string;
  city?: string;
  state?: string;
  stateFips?: string;
  stateId?: string;
  postalCode?: string;
  postalCode4?: string;
  county?: string;
  countyFips?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  density?: string;

  /**
   * @description Automatically created in hook
   * @memberof AddressAttributes
   */
  cmsRegion?: string;
}

export interface AddressInput
  extends Optional<AddressAttributes, 'id' | 'cmsRegion'> {}
export interface AddressOutput extends Required<AddressAttributes> {}

class Address
  extends Model<AddressAttributes, AddressInput>
  implements AddressAttributes
{
  public id!: number;
  public typeId!: string;
  public statusId!: string;
  public line1!: string;
  public line2!: string;
  public line3!: string;
  public city!: string;
  public state!: string;
  public stateFips!: string;
  public stateId!: string;
  public postalCode!: string;
  public postalCode4!: string;
  public county!: string;
  public countyFips!: string;
  public country!: string;
  public latitude!: number;
  public longitude!: number;
  public density!: string;
  public cmsRegion!: string;

  // User stamps
  public createdBy!: string;
  public lastUpdatedBy!: string;

  // Timestamps
  public readonly createdDate!: Date;
  public readonly lastUpdatedDate!: Date;
  public readonly deletedAt!: Date;
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ADR_ID',
      primaryKey: true,
      autoIncrement: true,
    },
    typeId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: 'ADDR_TYPE_CD',
    },
    statusId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: COLUMN_NAME.STATUS_ID,
    },
    line1: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ADR_LINE_1',
      validate: {
        len: {
          args: [0, 128],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    line2: {
      type: DataTypes.STRING(128),
      field: 'ADR_LINE_2',
      validate: {
        len: {
          args: [0, 128],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    line3: {
      type: DataTypes.STRING(128),
      field: 'ADR_LINE_3',
      validate: {
        len: {
          args: [0, 128],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    city: {
      type: DataTypes.STRING(56),
      field: 'CITY',
      validate: {
        len: {
          args: [0, 56],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    state: {
      type: DataTypes.STRING(48),
      field: 'STATE',
      validate: {
        len: {
          args: [0, 48],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    stateFips: {
      type: DataTypes.STRING(32),
      field: 'STATE_FIPS',
      validate: {
        len: {
          args: [0, 32],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    stateId: {
      type: DataTypes.STRING(32),
      field: 'STATE_ID',
      validate: {
        len: {
          args: [0, 32],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    county: {
      type: DataTypes.STRING(96),
      field: 'CNTY',
      validate: {
        len: {
          args: [0, 96],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    countyFips: {
      type: DataTypes.STRING(32),
      field: 'CNTY_FIPS',
      validate: {
        len: {
          args: [0, 32],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    country: {
      type: DataTypes.STRING(96),
      field: 'CNTRY',
      validate: {
        len: {
          args: [0, 96],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    postalCode: {
      type: DataTypes.STRING(20),
      field: 'PSTL_CD',
      validate: {
        len: {
          args: [0, 20],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    postalCode4: {
      type: DataTypes.STRING(4),
      field: 'PSTL_CD_4',
      validate: {
        len: {
          args: [0, 4],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    latitude: {
      type: DataTypes.DECIMAL(8, 6),
      field: 'LAT',
    },
    longitude: {
      type: DataTypes.DECIMAL(8, 6),
      field: 'LON',
    },
    density: {
      type: DataTypes.STRING(32),
      field: 'AREA_DNSTY',
      validate: {
        isIn: {
          args: [['Urban', 'Rural']],
          msg: 'Value can only be Urban or Rural',
        },
      },
    },
    cmsRegion: {
      type: DataTypes.STRING(32),
      field: 'CMS_RGN_CD',
      validate: {
        len: {
          args: [0, 32],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    createdBy: {
      type: DataTypes.STRING(48),
      validate: {
        len: {
          args: [0, 48],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
      field: COLUMN_NAME.CREATED_BY,
      defaultValue: DEFAULT_VALUE.BY,
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(48),
      field: COLUMN_NAME.LAST_UPDATED_BY,
      defaultValue: DEFAULT_VALUE.BY,
      validate: {
        len: {
          args: [0, 48],
          msg: COLUMN_VALIDATION.LENGTH,
        },
      },
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: COLUMN_NAME.CREATED_DT,
    },
    lastUpdatedDate: {
      type: DataTypes.DATE,
      field: COLUMN_NAME.LAST_UPDATED_DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: COLUMN_NAME.DELETED_AT,
    },
  },
  {
    sequelize: Whoosh.dbs.whoosh_db,
    tableName: 'ADDR_INFO',
    modelName: 'Address',
    freezeTableName: true,
    timestamps: true,
    deletedAt: COLUMN_ALIAS.DLTD_AT,
    updatedAt: COLUMN_ALIAS.LAST_UPDATED_DATE,
    createdAt: COLUMN_ALIAS.CREATD_DT,
    paranoid: true,
  }
);

// Hooks
Address.beforeBulkUpdate(async (options) => {
  options.individualHooks = true;
});

Address.beforeCreate((address) => {
  address.cmsRegion = ruleMapRegionByState(address.state);
});

Address.beforeUpdate((address) => {
  address.cmsRegion = ruleMapRegionByState(address.state);
});

// References
Address.hasOne(Status, {
  foreignKey: 'id',
  sourceKey: 'statusId',
  as: 'status',
  constraints: false,
});

export default Address;
