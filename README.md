# WebP Image Converter

This is a simple web application built with Node.js (Express) and React that allows you to convert JPEG and PNG images to WebP format. It also provides an option to edit EXIF metadata for the output WebP files.

## Features

*   Convert JPEG and PNG images to optimized WebP format.
*   Add or modify EXIF data (Artist, Copyright, User Comment) for the converted WebP files.
*   Supports single and batch image conversion.

## Project Structure

The project is organized as a monorepo with two main parts:

*   `backend/`: A Node.js (Express) application that handles image processing and EXIF data manipulation.
*   `frontend/`: A React application that provides the user interface.

## Technologies Used

**Backend:**
*   Node.js
*   Express.js
*   Sharp (for image processing)
*   Multer (for handling multipart/form-data uploads)
*   Piexifjs (for EXIF data manipulation)
*   CORS

**Frontend:**
*   React.js
*   Axios (for HTTP requests)

## Setup and Installation

To set up and run the application, follow these steps:

1.  **Navigate to the project root:**
    ```bash
    cd /Volumes/HomeX/Users/alemarvaldi/Code/WebP
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    cd ..
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd frontend
    npm install
    cd ..
    ```

## Running the Application

To start both the backend and frontend servers, use the provided shell script:

1.  **Make the script executable (if not already):**
    ```bash
    chmod +x start_app.sh
    ```

2.  **Run the application:**
    ```bash
    ./start_app.sh
    ```

    This script will:
    *   Start the backend server (on `http://localhost:3001`).
    *   Wait for a few seconds.
    *   Start the frontend development server (on `http://localhost:3000`).

    You will see the Process IDs (PIDs) for both processes. The script will remain active until you stop it.

## How to Use

1.  **Open your web browser** and navigate to `http://localhost:3000`.
2.  **Select Images:** Click the "Choose Files" button to select one or more JPEG or PNG images from your computer.
3.  **Edit EXIF Data (Optional):** In the "EXIF Data (Optional)" section, you can input values for Artist, Copyright, and User Comment. These will be embedded into the converted WebP files.
4.  **Convert:** Click the "Convert" button to initiate the conversion process. The selected images will be sent to the backend, converted, and returned.
5.  **Download:** The converted WebP images will be displayed on the page. Click the "Download WebP" link for each image to save it to your local machine.

## Stopping the Application

To stop both the backend and frontend processes, simply press `Ctrl + C` in the terminal where you ran `./start_app.sh`.
