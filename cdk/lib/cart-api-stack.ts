import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGw from 'aws-cdk-lib/aws-apigateway';
import 'dotenv/config';

export class CartApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cartAPILambda = new NodejsFunction(this, 'CartApiLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: 'nest-app/dist/main.js',
      functionName: 'CartApiLambda',
      timeout: cdk.Duration.seconds(10),
      environment: {
        POSTGRES_HOST: process.env.POSTGRES_HOST!,
        POSTGRES_PORT: process.env.POSTGRES_PORT!,
        POSTGRES_USERNAME: process.env.POSTGRES_USERNAME!,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD!,
        POSTGRES_DATABASE: process.env.POSTGRES_DATABASE!,
      }
    });

    new apiGw.LambdaRestApi(this, 'CardApiGateway', {
      restApiName: 'CartApi',
      handler: cartAPILambda,
    });
  }
}
