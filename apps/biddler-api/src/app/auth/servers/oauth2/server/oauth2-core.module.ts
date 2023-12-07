import { DynamicModule, Global, Inject, Module, OnModuleInit, Provider } from '@nestjs/common';
import { Oauth2GrantStrategyRegistry, StrategyExplorer } from '../domain';
import {
  Oauth2AsyncOptionsInterface,
  OAuth2Options,
  Oauth2OptionsFactoryInterface
} from './interfaces';
import { OAUTH2_SERVER_OPTIONS } from './oauth2.constants';
import { CreateAccessTokenHandler, CreateClientHandler } from './command';
// import { AccessTokenRepository, ClientRepository } from '../infrastructure/typeorm';
import {
  ClientCredentialsStrategy,
  PasswordStrategy,
  RefreshTokenStrategy
} from '../infrastructure/oauth2-grant-strategy';
import { AccessTokenStrategy } from '../infrastructure/strategy';
import { Oauth2Controller } from '../ui/controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { IDM } from '@biddler/db';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const CommandHandlers = [CreateClientHandler, CreateAccessTokenHandler];

export const EventHandlers = [];

export const QueryHandlers = [];

export const Sagas = [];

export const Services = [
  { provide: 'ApiClientService', useClass: IDM.services.ApiClientService },
  { provide: 'AccessTokenService', useClass: IDM.services.AccessTokenService },
  { provide: 'UserService', useClass: IDM.services.UserService }
];

export const ServiceNames = ['ApiClientService', 'AccessTokenService', 'UserService'];

export const Resolvers = [];

export const Oauth2Strategies = [ClientCredentialsStrategy, RefreshTokenStrategy, PasswordStrategy];

export const Providers = [StrategyExplorer, Oauth2GrantStrategyRegistry];

@Global()
@Module({})
export class Oauth2CoreModule implements OnModuleInit {
  constructor(
    @Inject(OAUTH2_SERVER_OPTIONS)
    private readonly options: OAuth2Options,
    private readonly explorerService: StrategyExplorer,
    private readonly strategyRegistry: Oauth2GrantStrategyRegistry
  ) {}

  /**
   * Create the static for Root Options
   *
   * @param options
   */
  public static forRoot(options: OAuth2Options): DynamicModule {
    const oAuth2OptionsProvider = {
      provide: OAUTH2_SERVER_OPTIONS,
      useValue: options
    };

    const userLoaderProvider = {
      provide: 'UserLoaderInterface',
      useFactory: async (options) => {
        return options.userLoader;
      },
      inject: [OAUTH2_SERVER_OPTIONS]
    };

    const userValidatorProvider = {
      provide: 'UserValidatorInterface',
      useFactory: async (options) => {
        return options.userValidator;
      },
      inject: [OAUTH2_SERVER_OPTIONS]
    };

    return {
      module: Oauth2CoreModule,
      imports: [
        CqrsModule,
        //TypeOrmModule.forFeature([ClientEntity, AccessTokenEntity])
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            return {
              secret: configService.getOrThrow('auth.jwtSecret'),
              signOptions: { expiresIn: configService.getOrThrow('auth.jwtExpiresIn') }
            };
          }
        })
      ],
      controllers: [Oauth2Controller],
      providers: [
        oAuth2OptionsProvider,
        userValidatorProvider,
        userLoaderProvider,
        ...Providers,
        ...Services,
        ...Resolvers,
        ...Oauth2Strategies,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        ...Sagas,
        AccessTokenStrategy
      ],
      exports: [...Providers, ...ServiceNames, userValidatorProvider, userLoaderProvider]
    };
  }

  public static forRootAsync(options: Oauth2AsyncOptionsInterface): DynamicModule {
    const providers: Provider[] = this.createAsyncProviders(options);

    const userLoaderProvider = {
      provide: 'UserLoaderInterface',
      useFactory: async (options) => {
        return options.userLoader;
      },
      inject: [OAUTH2_SERVER_OPTIONS]
    };

    const userValidatorProvider = {
      provide: 'UserValidatorInterface',
      useFactory: async (options) => {
        return options.userValidator;
      },
      inject: [OAUTH2_SERVER_OPTIONS]
    };

    return {
      module: Oauth2CoreModule,
      imports: [
        ...(options.imports || []),
        CqrsModule,
        // TypeOrmModule.forFeature([ClientEntity, AccessTokenEntity])
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            return {
              secret: configService.getOrThrow('auth.jwtSecret'),
              signOptions: { expiresIn: configService.getOrThrow('auth.jwtExpiresIn') }
            };
          }
        })
      ],
      providers: [
        ...providers,
        userValidatorProvider,
        userLoaderProvider,
        ...Providers,
        ...Services,
        ...Resolvers,
        ...Oauth2Strategies,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        ...Sagas,
        IDM.services.UserService,
        AccessTokenStrategy
      ],
      controllers: [Oauth2Controller],
      exports: [...Providers, ...ServiceNames, userValidatorProvider, userLoaderProvider]
    };
  }

  private static createAsyncProviders(options: Oauth2AsyncOptionsInterface): Provider[] {
    const providers: Provider[] = [this.createAsyncOptionsProvider(options)];

    return providers;
  }

  private static createAsyncOptionsProvider(options: Oauth2AsyncOptionsInterface): Provider {
    if (options.useFactory) {
      return {
        provide: OAUTH2_SERVER_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }

    return {
      provide: OAUTH2_SERVER_OPTIONS,
      useFactory: async (optionsFactory: Oauth2OptionsFactoryInterface) => {
        return optionsFactory.createOauth2Options();
      },
      inject: [options.useExisting || options.useClass]
    };
  }

  onModuleInit() {
    const { strategies } = this.explorerService.explore();
    this.strategyRegistry.register(strategies);
  }
}
