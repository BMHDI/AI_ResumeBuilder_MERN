#!/bin/bash

# Step 1: Navigate to the Server folder, install dependencies, and start the server
cd Server
npm install
npm start &  # Run the server in the background

# Step 2: Navigate to the client folder, install dependencies, and build the app
cd ../nadianResumeBuilderOnline
npm install
npm run build
