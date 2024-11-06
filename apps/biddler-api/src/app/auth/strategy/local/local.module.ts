import { LocalAuthStrategy } from './local.strategy';
import { LocalAuthModuleOptions } from './local.types';
import { LOCAL_HYBRID_AUTH_OPTIONS } from './local.constants';
import { INestHybridAuthModule, createHybridAuthModule } from '../../../../common/helpers/modules';

export const LocalAuthModule: INestHybridAuthModule<LocalAuthModuleOptions> =
  createHybridAuthModule<LocalAuthModuleOptions>(LOCAL_HYBRID_AUTH_OPTIONS, LocalAuthStrategy);
