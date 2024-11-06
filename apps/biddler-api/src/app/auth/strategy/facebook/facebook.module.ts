import { FacebookAuthStrategy } from './facebook.strategy';
import { FacebookAuthModuleOptions } from './facebook.types';
import { FACEBOOK_HYBRID_AUTH_OPTIONS } from './facebook.constants';
import { INestHybridAuthModule, createHybridAuthModule } from '../../../../common/helpers/modules';

export const FacebookAuthModule: INestHybridAuthModule<FacebookAuthModuleOptions> =
  createHybridAuthModule<FacebookAuthModuleOptions>(
    FACEBOOK_HYBRID_AUTH_OPTIONS,
    FacebookAuthStrategy
  );
