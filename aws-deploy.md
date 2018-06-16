### AWS Deployment

Here is a guide to deploy functions to AWS Lambda, to use buckets with AWS S3, and the starter [project](https://github.com/donpedro/tap-ts-starter). 

I followed this [guide](https://docs.aws.amazon.com/cli/latest/userguide/installing.html) for configuring the aws-cli

Download and Install "Windows x86-64 executable installer" for [Python](https://www.python.org/downloads/release/python-365/) 

- Add "C:\Python36" and "C:\Python36\Scripts" to PATH environment variable
- Add "C:\Users\\\[user]\AppData\Roaming\Python\Python36\Scripts" to PATH env var
- Run command "pip install awscli"

AWS stores credentials in two files in folder "{userprofile}\\.aws"

- to add a named profile to credential folder use "aws configure --profile [a profile name]" command. You will then be prompted to enter access key, secret key, region, and output type

- To get this information 

  - Create your own AWS account (aws.amazon.com)
  - Find security credentials on the dropdown menu when you click your profile name
  - Go to users, add new user, select programmatic access
  - Create group and add the new user to the newly created group
  - Finish creating the user and it will give you the access and secret key, copy those keys to the cli after running "aws configure --profile [a profile name]", for region use "us-west-2" and for output press enter and it will default to json
  - Now you can look in the .aws/configure and .aws/credentials files and see that the profile was added

- You now have a named profile to run the "serverless deploy --aws-profile [profilename]" cmd, but it will still fail because you do not have 'permission' to use the AWS services. To fix:

  - Go to the IAM Management Console" for AWS

  - Go to policies, create policy, name it 'cloudformation', select json, and copy this into it:

    - ```json
      {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Sid": "Stmt1449904348000",
                  "Effect": "Allow",
                  "Action": [
                      "cloudformation:CreateStack",
                      "cloudformation:CreateChangeSet",
                      "cloudformation:ListStacks",
                      "cloudformation:UpdateStack",
                      "cloudformation:DescribeChangeSet",
                      "cloudformation:ExecuteChangeSet"
      ,
      "cloudformation:DescribeStacks",
                      "cloudformation:DescribeStackResource",
                      "cloudformation:ValidateTemplate"            ],
                  "Resource": [
                      "*"
                  ]
              }
          ]
      }
      ```

  - Create another policy, name it FullAccess_APIGatewayRec" and copy this to it:

    - ```json
      {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Sid": "Stmt1467321765000",
                  "Effect": "Allow",
                  "Action": [
                      "apigateway:*"
                  ],
                  "Resource": [
                      "*"
                  ]
              }
          ]
      }
      ```

  - Go to group that you created for your user, go to permissions, attach policy, and attach the following policies:

    - "cloudformation" //manually created
    - "FullAccess_APIGatewayRec" //manually created
    - "AWSLambdaFullAccess"
    - "IAMFullAccess"
    - "AmazonS3FullAccess"
    - "CloudWatchFullAccess"
    - "CloudFrontFullAccess"
    - "AWSCloudFormationReadOnlyAccess"

- Deployment:

  - In file "serverless.yml" change bucket name to something unique. Example: "fdsa-trigger-bucket12" in any place you see "fdsa-trigger-bucket"
  - In file "serverless.yml", under functions, for each function (filetrigger, hello), change handler to "dist/es/handler.[functionname]"
  - Navigate to project folder then run "npm run build" and then run "serverless deploy --aws-profile [profilename]" command
  - Go to AWS Lambda service, change region to oregon, select manage functions
  - There should be two functions which are also found in your "handler.ts" source file
  - One of these functions listens for an event from AWS S3, this event happens when a file is dropped into a specific bucket in S3.
    - Go to AWS S3 service
    - You should find a bucket called "fdsa-trigger-bucket", this is where you can drop a file that will be processed by the Lambda function.
    - Drop a file, Go to AWS CloudWatch, go to logs, go to the correct function, and you should see a log of the file that was dropped.

