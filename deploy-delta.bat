echo off
echo This will deploy to the Delta account
echo AWS profile "delta" will be used, and if it doesn't exist the operation will fail.
echo For Windows, check profiles in C:\Users\(username)\.aws
pause
echo on
call serverless deploy --profile delta --prefix delta --accountId 540471531016 --verbose
pause