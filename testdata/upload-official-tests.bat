echo off
echo This will upload Official tests to the cloud, ADDING to existing official tests already there
echo AWS profile "delta" will be used, and if it doesn't exist it the operation will fail.
echo For Windows, check profiles in C:\Users\(username)\.aws
pause
echo on
call aws s3 sync ./tests s3://delta-tap-starter-user-tests/official/tests --profile delta
call aws s3 sync ./expectedResults s3://delta-tap-starter-user-tests/official/expectedResults --profile delta
pause