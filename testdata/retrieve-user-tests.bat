echo off
echo This will retrieve User tests from the cloud; all User tests existing locally will be removed and replaced with the ones on the cloud
echo AWS profile "delta" will be used, and if it doesn't exist it the operation will fail.
echo For Windows, check profiles in C:\Users\(username)\.aws
pause
echo on
:: fails with illegal chars in folder names, such as |
call aws s3 sync s3://delta-tap-starter-user-tests/users ./users --delete --profile delta
pause