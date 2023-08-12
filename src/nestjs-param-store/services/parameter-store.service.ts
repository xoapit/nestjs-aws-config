import { Injectable, Inject } from '@nestjs/common';
import {
  SSMClient,
  GetParametersByPathCommand,
  Parameter,
} from '@aws-sdk/client-ssm';
import { SSM_PS_CLIENT } from '../constants';

@Injectable()
export class ParameterStoreService {
  public constructor(
    @Inject(SSM_PS_CLIENT) private readonly client: SSMClient,
  ) {}

  public async getParametersByPath(
    path: string,
    decrypt = false,
  ): Promise<Parameter[]> {
    const params: Parameter[] = [];
    let nextToken;

    do {
      const getParameters = new GetParametersByPathCommand({
        Path: path,
        WithDecryption: decrypt,
        Recursive: true,
        NextToken: nextToken,
      });

      const { Parameters = [], NextToken } = await this.client.send(
        getParameters,
      );
      nextToken = NextToken;
      params.push(...Parameters);
    } while (!!nextToken);

    return params;
  }
}
