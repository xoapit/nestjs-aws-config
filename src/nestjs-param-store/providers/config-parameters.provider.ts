import { FactoryProvider } from '@nestjs/common';
import {
  AWSParameterStoreOptions,
  AWSParameterStoreParameters,
} from '../interfaces';
import { ParameterStoreService } from '../services';
import { PS_CONFIG_OPTIONS, PS_CONFIG_PARAMETERS } from '../constants';

export const configParametersProvider: FactoryProvider<AWSParameterStoreParameters> =
  {
    provide: PS_CONFIG_PARAMETERS,
    useFactory: (
      configOptions: AWSParameterStoreOptions,
      psService: ParameterStoreService,
    ): Promise<AWSParameterStoreParameters> => {
      return psService.getParametersByPath(
        configOptions.ssmParamStorePath,
        configOptions.ssmDecryptParams ?? false,
      );
    },
    inject: [PS_CONFIG_OPTIONS, ParameterStoreService],
  };
