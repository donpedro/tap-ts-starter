echo off
echo This will upload User tests to the cloud, ADDING to existing tests already there
echo AWS profile "delta" will be used, and if it doesn't exist it the operation will fail.
echo For Windows, check profiles in C:\Users\(username)\.aws
pause
echo on
call aws s3 sync ./users s3://delta-tap-starter-user-tests/users --profile delta
pause