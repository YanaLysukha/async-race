# Async-race application
This application is designed to manage a garage of cars, simulate races, and display winning statistics. It consists of two main views: "Garage" and "Winners". The app provides a range of functionalities, including CRUD operations for cars, animated racing, and persistent view state.

## Setup and Running the Server:
To test the app functionality, please clone [repo](https://github.com/mikhama/async-race-api.git) with a server and keep the server running during functionality review.

- Use node 14.x or higher.
- Clone this repo: git clone https://github.com/mikhama/async-race-api.git.
- Go to downloaded folder: cd async-race-api.
- Install dependencies: npm install.
- Start server: npm start.

## Installation:
1. Clone the repository:
   ```bash
   git clone https://github.com/YanaLysukha/async-race
   ```
2. Switch to the async-race branch:
    ```bash
   git checkout async-race
   ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the application:
    ```bash
    npm start
    ```

## Technology stack:
- React
- Redux Toolkit
- React Redux
- React Router DOM
- TypeScript
- Vite
- Sass
- ESLint
- Prettier

## Features:

### Two Main Views:

- **Garage** — view for managing cars.
- **Winners** — view displaying winning cars and their statistics.
- Each view shows the page number and the total item count from the database.

### Persistent View State:

- The app maintains user input and pagination states when switching between views.

### Garage View:

- **CRUD Operations**: create, update, and delete cars with "name" and "color" attributes.
- **Color Selection**: choose a car's color using an RGB palette with a live preview.
- **Pagination**: displays 7 cars per page with the option to generate 100 random cars.
- **Car Animation**: start/stop engine buttons with corresponding animations and engine state handling, supporting adaptive animations for screens as small as 500px.
- **Race Animation**:
  - Start a race for all cars on the current page.
  - Reset all cars to their starting positions.
  - Display the winner's name when the race ends.

### Winners View
- Displays car images, names, number of wins, and best race times.
- Sorting options by number of wins and best times.
- Pagination for navigating through the list of winners.