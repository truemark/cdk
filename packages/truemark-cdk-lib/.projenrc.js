const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Erik Jensen',
  authorAddress: 'ejensen@truemark.io',
  cdkVersion: '2.29.1',
  defaultReleaseBranch: 'main',
  name: 'truemark-cdk-lib',
  repositoryUrl: 'https://github.com/truemark/cdk',
  description: 'TrueMark CDK Library',
  packageName: 'truemark-cdk-lib',
  typescriptVersion: '~4.7.4',

  /* We need to exclude JEST for now as sinclair/typebox was causing JSII compilation errors */
  jest: false,
  jestOptions: null,

  /* Runtime dependencies of this module. */
  deps: [
    'cdk-monitoring-constructs@1.13.0',
    '@aws-cdk/aws-apigatewayv2-alpha@^2.18.0-alpha.0',
    '@aws-cdk/aws-apigatewayv2-integrations-alpha@^2.18.0-alpha.0',
    '@aws-cdk/aws-appsync-alpha@^2.18.0-alpha.0',
    '@aws-cdk/aws-lambda-go-alpha@^2.18.0-alpha.0',
    '@aws-cdk/aws-lambda-python-alpha@^2.18.0-alpha.0',
    '@aws-cdk/aws-redshift-alpha@^2.18.0-alpha.0',
    '@aws-cdk/aws-synthetics-alpha@^2.18.0-alpha.0',
  ],
  devDeps: [
    // '@types/jest@^28.1.3',
    'cdk-monitoring-constructs@1.13.0',
  ],
  peerDeps: [
    'cdk-monitoring-constructs@1.13.0',
  ],
  bundledDeps: [
    // '@types/jest@^28.1.3',
    '@aws-cdk/aws-apigatewayv2-alpha@^2.18.0-alpha.0',
    '@aws-cdk/aws-apigatewayv2-integrations-alpha@^2.18.0-alpha.0',
    '@aws-cdk/aws-appsync-alpha@^2.18.0-alpha.0',
    '@aws-cdk/aws-lambda-go-alpha@^2.18.0-alpha.0',
    '@aws-cdk/aws-lambda-python-alpha@^2.18.0-alpha.0',
    '@aws-cdk/aws-redshift-alpha@^2.18.0-alpha.0',
    '@aws-cdk/aws-synthetics-alpha@^2.18.0-alpha.0',
    // 'cdk-monitoring-constructs@^1.13.0'
  ],
  // publishToMaven: {
  //   javaPackage: 'io.truemark.cdk',
  //   mavenArtifactId: 'cdklib',
  //   mavenGroupId: 'io.truemark.cdk',
  //   serverId: 'github',
  //   repositoryUrl: 'https://maven.pkg.github.com/truemark/cdk',
  // },
  // python: {
  //   distName: 'truemark-cdk-lib',
  //   module: 'truemark.cdk',
  // },
  dotnet: {
    dotNetNamespace: 'TrueMark.CDK',
    packageId: 'TrueMark.CDK',
  },

});
project.gitignore.exclude('node_modules', 'dist', 'lib');
project.synth();