# Employee App
This repository contains the frontend code for the employee app which doesn't have the backend. This app is built for demonstrating only the frontend features following the industry best practices. The app should allow login to employees, ability to view their data, update their profile.

## Tech Stack
- React - 19.x
- Node - 24.x

## Code Structure
The project follows a standard React project structure:
- `src/`: Contains the source code of the application.
- `src/components/`: Contains the re-useable components.
- `src/pages/`: Contains the pages of the app which won't be re-used and are specific to the app.
- `src/utils/`: Contains the utility functions.

## Coding Instructions
1. Always create functional component with separate `export defaut` at the end of the file.
2. No component should have more than 500 lines of code.
3. Always ask which dependency to use if same use-case can be addressed via different dependencies. For example, global states can be managed via redux and context APIs, so you must ask which one to use instead of assuming what to use.
4. Before implementing any feature, ask clariying questions. Prepare implementation plan before writing even a single line of code and only after I approve, proceed with writing the code.
