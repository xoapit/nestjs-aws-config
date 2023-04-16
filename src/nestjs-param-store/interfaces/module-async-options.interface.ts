import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { AWSParameterStoreOptionsFactory } from './options-factory.interface';
import { AWSParameterStoreOptions } from './config-options.interface';

export interface AWSParameterStoreModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<AWSParameterStoreOptionsFactory>;
  useClass?: Type<AWSParameterStoreOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AWSParameterStoreOptions> | AWSParameterStoreOptions;
}
