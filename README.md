TESTING LABORATORY - LEMONCODE MASTER FRONT END

# First steps

- Create remote repository in GitHub
- Clone repository in local machine
- Create a branch for your work

## TODO

1. Add test to the mapper `./src/pods/project/project.mapper.ts`

2. Add test to the component `./src/common/components/confirmation-dialog/confirmation-dialog.component.tsx`

3. Add test to hook: `./src/common/components/confirmation-dialog/confirmation-dialog.hook.ts`

## Installation and testing commands

- Install dependencies: `npm install`
- Run tests: `npm test`

## Configuration and additional libraries

## What to test in the mapper

- When the input is null or undefined, the output is an empty project.
- When the input has employees, they are correctly mapped to the output project.
- The fn createEmptyProject is called when the input is null or undefined.
- The fn createEmptyProject is not called when the input has employees.
- Return a project with empty employees when the input project has no employees.
- The output project is correctly mapped from the input project, when data is provided.
