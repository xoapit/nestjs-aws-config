import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

export interface AWSSecretsManagerModuleOptions {
  secretsManager: SecretsManagerClient;
  isSetToEnv?: boolean;
  secretsSource?: string | string[];
  isDebug?: boolean;
}

export interface AWSSecretsManagerModuleOptionsFactory {
  createAWSSecretsManagerModuleOptions():
    | Promise<AWSSecretsManagerModuleOptions>
    | AWSSecretsManagerModuleOptions;
}

export interface AWSSecretsManagerModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<AWSSecretsManagerModuleOptions> | AWSSecretsManagerModuleOptions;
  inject?: any[];
  useClass?: Type<AWSSecretsManagerModuleOptionsFactory>;
}
