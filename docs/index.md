Backstage User-Service Setup Guide
This document explains the complete step-by-step process to create a backend service, push it to GitHub, and register it in Backstage.

STEP 0: Prerequisites
Make sure you have:

Git installed
A GitHub account
Node.js and npm installed
Backstage running at: http://localhost:3000
STEP 1: Create GitHub Repository
Open GitHub in your browser.
Click New Repository.
Enter repository name: user-service
Click Create Repository.
STEP 2: Clone Repository to Local System
Open Command Prompt and run:

git clone https://github.com/YOUR-USERNAME/user-service.git
cd user-service
STEP 3: Initialize Backend Project
Run:

npm init -y
npm install express
Create a file named index.js and paste:

const express = require('express');
const app = express();

app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'Akash' }]);
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
STEP 4: Run the Service
Run:

node index.js
Open in browser:

http://localhost:3001/users
Expected output:

[{ "id": 1, "name": "Akash" }]
STEP 5: Push Code to GitHub
Run:

git add .
git commit -m "initial commit"
git push
STEP 6: Create Backstage Component File
Create catalog-info.yaml

apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: user-service
  description: Backend service for managing users
  annotations:
    github.com/project-slug: YOUR-USERNAME/user-service
spec:
  type: service
  owner: devops-team
  lifecycle: development
  providesApis:
    - user-api
STEP 7: Create API Definition File
Create api.yaml

apiVersion: backstage.io/v1alpha1
kind: API
metadata:
  name: user-api
  description: API for user service
spec:
  type: openapi
  lifecycle: development
  owner: devops-team
  definition: |
    openapi: 3.0.0
    info:
      title: User API
      version: 1.0.0
    paths:
      /users:
        get:
          summary: Get users
          responses:
            '200':
              description: Success
STEP 8: Register in Backstage
Open Backstage:
http://localhost:3000
Click Create.
Click Register Existing Component.
Paste URL:
https://github.com/YOUR-USERNAME/user-service/blob/main/catalog-info.yaml
Click Analyze.
Click Import.
STEP 9: Verify in Catalog
Go to Catalog and confirm:

user-service is visible
API is linked
Owner is visible
Lifecycle shows development
Notes
Replace YOUR-USERNAME with your actual GitHub username.
Keep both catalog-info.yaml and api.yaml in repository root.
If GitHub preview is needed, use this README file instead of .docx.
