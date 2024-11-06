import {
  ModuleOptionsFactory as IdentityModuleOptionsFactory,
  ModuleAsyncOptions as IdentityModuleAsyncOptions
} from '../../common/helpers/modules';

import { FacebookAuthModuleOptions } from './strategy/facebook/facebook.types';
import { GithubAuthModuleOptions } from './strategy/github/github.types';
import { LinkedinAuthModuleOptions } from './strategy/linkedIn/linkedin.types';
import { OktaAuthModuleOptions } from './strategy/okta/okta.types';
import { TwitterAuthModuleOptions } from './strategy/twitter/twitter.types';

export interface HybridAuthModuleOptions {
  twitter?: TwitterAuthModuleOptions;
  linkedin?: LinkedinAuthModuleOptions;
  facebook?: FacebookAuthModuleOptions;
  github?: GithubAuthModuleOptions;
  okta?: OktaAuthModuleOptions;
}

export interface HybridAuthModuleAsyncOptions {
  twitter?: IdentityModuleAsyncOptions<
    IdentityModuleOptionsFactory<TwitterAuthModuleOptions>,
    TwitterAuthModuleOptions
  >;
  linkedin?: IdentityModuleAsyncOptions<
    IdentityModuleOptionsFactory<LinkedinAuthModuleOptions>,
    LinkedinAuthModuleOptions
  >;
  facebook?: IdentityModuleAsyncOptions<
    IdentityModuleOptionsFactory<FacebookAuthModuleOptions>,
    FacebookAuthModuleOptions
  >;
  github?: IdentityModuleAsyncOptions<
    IdentityModuleOptionsFactory<GithubAuthModuleOptions>,
    GithubAuthModuleOptions
  >;
  okta?: IdentityModuleAsyncOptions<
    IdentityModuleOptionsFactory<OktaAuthModuleOptions>,
    OktaAuthModuleOptions
  >;
}
