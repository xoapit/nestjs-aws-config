import { ValueProvider } from '@nestjs/common';
import { AWSParameterStoreOptions } from '../interfaces';
import { PS_CONFIG_OPTIONS } from '../constants';

export const createOptionsProvider = (
  options: AWSParameterStoreOptions,
): ValueProvider<AWSParameterStoreOptions> => {
  return {
    provide: PS_CONFIG_OPTIONS,
    useValue: options,
  };
};
