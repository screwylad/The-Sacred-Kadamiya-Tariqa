# GitHub Repository Update Guide

This document provides step-by-step instructions for updating your GitHub repository with your latest website changes.

## Prerequisites

- Git installed on your computer
- A GitHub account
- The repository already exists at https://github.com/screwylad/The-Sacred-Kadamiya-Tariqa

## Steps to Update GitHub Repository

1. **Clean Up the Website Files** (Optional but recommended):
   ```powershell
   # Run the provided cleanup script to remove unnecessary development files
   .\cleanup-website.ps1
   ```

2. **Open Command Prompt or PowerShell** in your website directory:
   ```powershell
   cd C:\Users\laska\Downloads\Website
   ```

3. **Initialize a Git Repository** (if not already done):
   ```powershell
   git init
   ```

4. **Add Your GitHub Repository as Remote** (if not already done):
   ```powershell
   git remote add origin https://github.com/screwylad/The-Sacred-Kadamiya-Tariqa.git
   ```

5. **Check the Current Status** to see which files have changed:
   ```powershell
   git status
   ```

6. **Add All Files to Staging**:
   ```powershell
   git add .
   ```

7. **Commit Your Changes** with a descriptive message:
   ```powershell
   git commit -m "Fixed header overlap issue and removed unnecessary debug files"
   ```

8. **Push Changes to GitHub**:
   ```powershell
   git push -u origin master
   ```

   If you get an error about the remote containing work you don't have, you may need to pull first:
   ```powershell
   git pull origin master --allow-unrelated-histories
   git push -u origin master
   ```

9. **Verify Your Changes** by visiting your GitHub repository:
   https://github.com/screwylad/The-Sacred-Kadamiya-Tariqa

## Netlify Deployment

After updating your GitHub repository, Netlify will automatically detect the changes and deploy the updated website if you have configured automatic deployments.

To check the deployment status:
1. Go to your Netlify dashboard
2. Select your site
3. Look for the "Deploys" section to monitor the deployment progress

## Troubleshooting

- **Authentication Issues**: If prompted for credentials when pushing to GitHub, ensure you've configured Git with the correct username and email:
  ```powershell
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

- **Merge Conflicts**: If you encounter merge conflicts during pull or push:
  ```powershell
  # See which files have conflicts
  git status
  
  # Resolve conflicts in those files manually
  # Then add the resolved files
  git add [resolved-files]
  
  # Continue with the merge
  git commit
  ```

- **Large File Issues**: If some files are too large for GitHub:
  ```powershell
  # Remove the file from tracking
  git rm --cached [large-file]
  
  # Add to .gitignore
  echo "[large-file]" >> .gitignore
  
  # Commit these changes
  git commit -m "Remove large file from repository"
  ```