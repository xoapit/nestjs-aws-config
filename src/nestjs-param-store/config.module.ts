import { Module, Global, DynamicModule, Provider } from '@nestjs/common';
import {
  AWSParameterStoreOptions,
  AWSParameterStoreModuleAsyncOptions,
  AWSParameterStoreOptionsFactory,
} from './interfaces';
import {
  createOptionsProvider,
  configParametersProvider,
  ssmClientProvider,
} from './providers';
import { AWSParameterStoreService, ParameterStoreService } from './services';
import { PS_CONFIG_OPTIONS, PS_CONFIG_PARAMETERS } from './constants';

@Global()
@Module({})
export class AWSParameterStoreModule {
  public static register(options: AWSParameterStoreOptions): DynamicModule {
    const optionsProvider = createOptionsProvider(options);

    return {
      module: AWSParameterStoreModule,
      providers: [
        optionsProvider,
        configParametersProvider,
        ssmClientProvider,
        AWSParameterStoreService,
        ParameterStoreService,
      ],
      exports: [AWSParameterStoreService, PS_CONFIG_PARAMETERS],
    };
  }

  public static registerAsync(
    options: AWSParameterStoreModuleAsyncOptions,
  ): DynamicModule {
    const providers = this.createAsyncProviders(options);

    return {
      module: AWSParameterStoreModule,
      imports: options.imports || [],
      providers,
      exports: [AWSParameterStoreService, PS_CONFIG_PARAMETERS],
    };
  }

  private static createAsyncProviders(
    options: AWSParameterStoreModuleAsyncOptions,
  ): Provider[] {
    const optionsProvider = this.createAsyncOptionsProvider(options);
    const reqProviders = [
      optionsProvider,
      configParametersProvider,
      ssmClientProvider,
      AWSParameterStoreService,
      ParameterStoreService,
    ];

    if (options.useExisting || options.useFactory || !options.useClass) {
      return reqProviders;
    }

    return [
      ...reqProviders,
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: AWSParameterStoreModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: PS_CONFIG_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = options.useExisting || options.useClass;

    return {
      provide: PS_CONFIG_OPTIONS,
      useFactory: async (optionsFactory: AWSParameterStoreOptionsFactory) => {
        return optionsFactory.createOptions();
      },
      inject: inject ? [inject] : [],
    };
  }
}
