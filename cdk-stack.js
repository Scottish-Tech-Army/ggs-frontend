#!/usr/bin/env node

const cdk = require("aws-cdk-lib");
const { Bucket } = require("aws-cdk-lib/aws-s3");
const cloudfront = require("aws-cdk-lib/aws-cloudfront");
const origins = require("aws-cdk-lib/aws-cloudfront-origins");
const s3deploy = require("aws-cdk-lib/aws-s3-deployment");

const app = new cdk.App();
const envStageName = app.node.tryGetContext("env");

if (!envStageName) {
  throw new Error(
    `run with parameters:
  --context env=ENVIRONMENT_NAME (i.e. dev, test, live, etc.)`
  );
}


const stackId = "GGS-Frontend-" + envStageName;

// S3 has a global name restriction per region.
// If someone grabs the default bucket name, change it here.
const BUCKET_NAME = stackId;
const DISTRIBUTION_NAME = stackId + "-Distribution";
const DEPLOY_NAME = stackId + "-DeployWithInvalidation";


class CdkFrontendStack extends cdk.Stack {

  constructor(scope) {
    super(scope, stackId);

    // S3 bucket to host web client files

    const bucket = new Bucket(this, BUCKET_NAME, {});

    // CloudFront distribution for website

    const distribution = new cloudfront.Distribution(
      this,
      DISTRIBUTION_NAME,
      {
        defaultBehavior: {
          origin: new origins.S3Origin(bucket),
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: "index.html",
      }
    );

    new s3deploy.BucketDeployment(this, DEPLOY_NAME, {
      sources: [s3deploy.Source.asset("./build")],
      destinationBucket: bucket,
      distribution,
    });

    new cdk.CfnOutput(this, stackId + " URL", {
      value: "https://" + distribution.domainName,
      description: "External URL for " + stackId + " website",
    });
  }
}


const frontendStack = new CdkFrontendStack(app);

cdk.Tags.of(frontendStack).add("DeployEnvironment", envStageName);
