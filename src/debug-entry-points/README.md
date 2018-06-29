### Debug Entry Points
Code modules in this folder are used to facilitate local debugging for scenarios that might otherwise be difficult to run locally. This may include:

* Code designed to run on AWS Lambda (aws-*.ts), where debugging is a huge pain
* Picking specific Test files which to use as input for certain scenarios (debug-parseItem.ts)

These modules are referred to by .vscode/launch.json, allowing you to select them as a debug configuration in ```vscode``` and run using them as the entry point.