import { OktaAuthStrategy } from './okta.strategy';
import { OktaAuthModuleOptions } from './okta.types';
import { OKTA_HYBRID_AUTH_OPTIONS } from './okta.constants';
import { INestHybridAuthModule, createHybridAuthModule } from '../../../../common/helpers/modules';

export const OktaAuthModule: INestHybridAuthModule<OktaAuthModuleOptions> =
  createHybridAuthModule<OktaAuthModuleOptions>(OKTA_HYBRID_AUTH_OPTIONS, OktaAuthStrategy);
