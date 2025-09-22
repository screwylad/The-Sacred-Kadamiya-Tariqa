# Website Deployment Guide

This document provides instructions for deploying The Sacred Kadamiya Tariqa website to GitHub and Netlify.

## Preparation

Before deployment, run the cleanup script to optimize the website for production:

- For Windows: Run `cleanup-website.ps1` using PowerShell
- For macOS/Linux: Run `cleanup-website.sh` using Terminal

This will remove unnecessary development and debug files.

## GitHub Deployment

1. **Push to GitHub**:

   ```bash
   # Navigate to your website directory
   cd path/to/website
   
   # Initialize Git repository (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit changes
   git commit -m "Website ready for deployment"
   
   # Add your GitHub repository as remote
   git remote add origin https://github.com/screwylad/The-Sacred-Kadamiya-Tariqa.git
   
   # Push to GitHub
   git push -u origin master
   ```

## Netlify Deployment

### Method 1: Netlify UI

1. Log in to your Netlify account
2. Click "New site from Git"
3. Choose GitHub as your provider
4. Select your repository
5. Configure build settings (not required for this static site)
6. Click "Deploy site"

### Method 2: Netlify CLI

1. Install Netlify CLI:
   ```
   npm install netlify-cli -g
   ```

2. Login to Netlify:
   ```
   netlify login
   ```

3. Initialize Netlify site:
   ```
   netlify init
   ```

4. Deploy the site:
   ```
   netlify deploy --prod
   ```

## Custom Domain Setup

1. Go to your Netlify site settings
2. Navigate to "Domain management" 
3. Click "Add custom domain"
4. Follow the instructions to set up DNS records

## Post-Deployment

After deployment, verify:
- All pages load correctly
- Forms are working
- Language switching functions properly
- Payment gateway integration works (if applicable)
- Chatbot functionality works correctly

## Troubleshooting

If you encounter any issues:
- Check Netlify deploy logs
- Verify all required files are included in your repository
- Ensure there are no JavaScript errors in the browser console