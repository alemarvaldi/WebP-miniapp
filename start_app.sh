#!/bin/bash

echo "Starting backend server..."
cd backend
node index.js &
BACKEND_PID=$!
cd ..

echo "Waiting for backend to start..."
sleep 5

echo "Starting frontend application..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo "Application started. Backend PID: $BACKEND_PID, Frontend PID: $FRONTEND_PID"
echo "To stop both, run: kill $BACKEND_PID $FRONTEND_PID"

wait $BACKEND_PID $FRONTEND_PID
