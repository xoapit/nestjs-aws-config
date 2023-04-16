import { SSMClientConfig } from '@aws-sdk/client-ssm';

export interface AWSParameterStoreOptions {
  ssmParamStorePath: string;
  ssmDecryptParams?: boolean;
  ssmClientOptions?: SSMClientConfig;
}
