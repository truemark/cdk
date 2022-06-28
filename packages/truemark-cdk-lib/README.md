# replace this


# v0.0.2 - Projen:

## Setup Projen

projen completion >> ~/.bashrc
projen completion >> ~/.zshrc


npx projen --help 
projen [command]

Commands:
  projen new [PROJECT-TYPE-NAME] [OPTIONS]  Creates a new projen project
  projen build                              Full release build
  projen bump                               Bumps version based on latest git tag and generates a changelog entry
  projen clobber                            hard resets to HEAD of origin and cleans the local repo
  projen compat                             Perform API compatibility check against latest version
  projen compile                            Only compile
  projen default                            Synthesize project files
  projen docgen                             Generate API.md from .jsii manifest
  projen eject                              Remove projen from the project
  projen eslint                             Runs eslint against the codebase
  projen package                            Creates the distribution package
  projen package-all                        Packages artifacts for all target languages
  projen package:dotnet                     Create dotnet language bindings
  projen package:js                         Create js language bindings
  projen post-compile                       Runs after successful compilation
  projen post-upgrade                       Runs after upgrading dependencies
  projen pre-compile                        Prepare the project for compilation
  projen release                            Prepare a release from "main" branch
  projen test                               Run tests
  projen test:update                        Update jest snapshots
  projen test:watch                         Run jest in watch mode
  projen unbump                             Restores version to 0.0.0
  projen upgrade                            upgrade dependencies
  projen watch                              Watch & compile in the background
  projen completion                         generate completion script

Options:
      --post     Run post-synthesis steps such as installing dependencies. Use --no-post to skip                                                                                                                                [boolean] [default: true]
  -w, --watch    Keep running and resynthesize when projenrc changes                                                                                                                                                           [boolean] [default: false]
      --debug    Debug logs                                                                                                                                                                                                    [boolean] [default: false]
      --rc       path to .projenrc.js file                                                                                               [string] [default: "/Users/briancabbott/dev_space/TrueMark/CDK/JSII/cdk/packages/truemark-cdk-lib/.projenrc.js"]
      --help     Show help                                                                                                                                                                                                                      [boolean]
      --version  Show version number    

## Setup/init blank project cdk project.

    npx projen new awscdk-construct


