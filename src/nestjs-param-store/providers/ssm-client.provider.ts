import { FactoryProvider } from '@nestjs/common';
import { SSMClient } from '@aws-sdk/client-ssm';
import { AWSParameterStoreOptions } from '../interfaces';
import { PS_CONFIG_OPTIONS, SSM_PS_CLIENT } from '../constants';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';

export const ssmClientProvider: FactoryProvider<SSMClient> = {
  provide: SSM_PS_CLIENT,
  useFactory: async (options: AWSParameterStoreOptions): Promise<SSMClient> => {
    const credentials = fromNodeProviderChain({
      clientConfig: {},
    });

    return new SSMClient(
      options.ssmClientOptions ?? {
        credentials,
      },
    );
  },
  inject: [PS_CONFIG_OPTIONS],
};
