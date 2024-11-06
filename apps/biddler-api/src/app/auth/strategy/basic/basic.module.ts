import { BasicAuthStrategy } from './basic.strategy';
import { BasicAuthModuleOptions } from './basic.types';
import { BASIC_HYBRID_AUTH_OPTIONS } from './basic.constants';
import { INestHybridAuthModule, createHybridAuthModule } from '../../../../common/helpers/modules';

export const BasicAuthModule: INestHybridAuthModule<BasicAuthModuleOptions> =
  createHybridAuthModule<BasicAuthModuleOptions>(BASIC_HYBRID_AUTH_OPTIONS, BasicAuthStrategy);
