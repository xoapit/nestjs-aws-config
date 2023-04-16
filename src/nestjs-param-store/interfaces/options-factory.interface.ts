import { AWSParameterStoreOptions } from './config-options.interface';

export interface AWSParameterStoreOptionsFactory {
  createOptions(): Promise<AWSParameterStoreOptions> | AWSParameterStoreOptions;
}
