import { TwitterAuthStrategy } from './twitter.strategy';
import { TwitterAuthModuleOptions } from './twitter.types';
import { TWITTER_HYBRID_AUTH_OPTIONS } from './twitter.constants';
import { INestHybridAuthModule, createHybridAuthModule } from '../../../../common/helpers/modules';

export const TwitterAuthModule: INestHybridAuthModule<TwitterAuthModuleOptions> =
  createHybridAuthModule<TwitterAuthModuleOptions>(
    TWITTER_HYBRID_AUTH_OPTIONS,
    TwitterAuthStrategy
  );
