import { GithubAuthStrategy } from './github.strategy';
import { GithubAuthModuleOptions } from './github.types';
import { GITHUB_HYBRID_AUTH_OPTIONS } from './github.constants';
import { INestHybridAuthModule, createHybridAuthModule } from '../../../../common/helpers/modules';

export const GithubAuthModule: INestHybridAuthModule<GithubAuthModuleOptions> =
  createHybridAuthModule<GithubAuthModuleOptions>(GITHUB_HYBRID_AUTH_OPTIONS, GithubAuthStrategy);
