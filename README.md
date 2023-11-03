# BallastLaneTestAdo

## Overview

Technical test from Adonay Porras.

## Prerequisites

- Node.js installed on your machine for the Angular app
- Java and Gradle installed for the Spring Boot app

## Running the Angular App

1. Open a terminal.

2. Navigate to the `frontend` directory:
    ```bash
    cd /frontend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the Angular app:
    ```bash
    ng serve
    ```

5. Open your browser and visit [http://localhost:4200](http://localhost:4200) to access the Angular app.

## Running the Spring Boot App

1. Open a new terminal.

2. Navigate to the `backend` directory:
    ```bash
    cd test
    ```

3. Run the Spring Boot app:
    ```bash
    ./gradlew bootRun
    ```

4. Alternatively, you can run the main class directly:
    ```bash
    ./gradlew build
    java -jar build/libs/test-0.0.1-SNAPSHOT.jar
    ```

5. The Spring Boot app will be accessible at [http://localhost:8080](http://localhost:8080)

## Stopping the Apps

To stop the Angular app, press `Ctrl + C` in the terminal where it's running.

To stop the Spring Boot app, press `Ctrl + C` in the terminal where it's running.

## Notes

- Make sure you have the required tools installed as mentioned in the prerequisites.
- If you encounter any issues or need additional configurations, refer to the respective README or documentation in each app's directory.

