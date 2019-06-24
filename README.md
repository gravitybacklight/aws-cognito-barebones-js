# aws-cognito-barebones-js
basic aws cognito and javascript example

No jquery, just a basic html form, javascript and amazon-cognito-identity.min.js.

Bit of duplication in the code, but this allows you to walkthrough what is happening.

## Getting started

Assuming you have an AWS account, you need to create a cognito user pool.
The pool is configured to allow email login also.

1. Create user pool
1. Give it a name and select "step through settings"
1. Leave Username radio button selected and also tick "Also allow sign in with verified email address" beheath it
1. Tick the required tickbox against "preferred username"
1. Choose a password policy, leave "Allow users to sign themselves up" selected
1. Leave MFA & verifications as defaults
1. If preferred, choose an SES region closer to you, leave the rest as default for now
1. Add tags if you want
1. Leave "Do you want to remember your user's devices" as default
1. Click "Add an app client"
1. Give app client a name, untick "Generate client secret"
1. Click "Create app client", then click "next step"
1. Click through Triggers & Review & click "Create pool"

## Configuration

1. Within your user pool under "General Settings", copy the "Pool Id"
1. Under "App clients", copy the "App client id"
1. Paste both of these values into user.js into the placeholders under the getPoolData function

## Test

You should now be able to run load all 3 html files locally and successfully communicate with cognito.
Use your browsers developer tools to see the console whilst you test as all output goes there.

register.html = create a user within your userpool and it will sent you a verification code via email
verify.html = the emailed verification code can be entered with your username
login.html = your username/email and password are used here, the console will show your access token

## Thanks
(https://github.com/RomanKosobrodov/aws-cognito-js-example) - Gave a brilliant kickstart in figuring out where i was going wrong with my testing
