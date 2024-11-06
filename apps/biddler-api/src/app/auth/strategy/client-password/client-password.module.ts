import { INestHybridAuthModule, createHybridAuthModule } from '../../../../common/helpers/modules';
import { CLIENTPASSWORD_HYBRID_AUTH_OPTIONS } from './client-password.constants';
import { ClientPasswordAuthStrategy } from './client-password.strategy';
import { ClientPasswordAuthModuleOptions } from './client-password.types';

export const ClientPasswordAuthModule: INestHybridAuthModule<ClientPasswordAuthModuleOptions> =
  createHybridAuthModule<ClientPasswordAuthModuleOptions>(
    CLIENTPASSWORD_HYBRID_AUTH_OPTIONS,
    ClientPasswordAuthStrategy
  );
