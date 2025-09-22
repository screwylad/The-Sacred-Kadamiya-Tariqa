#!/bin/bash

echo "Cleaning website files for production deployment..."

# Step 1: Remove debug script references from all HTML files
for file in *.html; do
  echo "Processing $file..."
  
  # Remove debug script references
  sed -i 's/<!-- Debug and testing scripts -->//g' "$file"
  sed -i 's/<!-- Testing and debug tools -->//g' "$file"
  sed -i 's/<script src="assets\/js\/i18n-test.js"><\/script>//g' "$file"
  sed -i 's/<script src="assets\/js\/i18n-debug.js"><\/script>//g' "$file"
  sed -i 's/<script src="assets\/js\/i18n-debug-mode.js"><\/script>//g' "$file"
done

# Step 2: List files to be deleted
files_to_delete=(
  "assets/js/i18n-test.js"
  "assets/js/i18n-debug.js"
  "assets/js/i18n-debug-mode.js"
  "i18n-test.html"
  "update-i18n-scripts.ps1"
  "update-i18n-scripts.sh"
  "add-i18n-test-script.ps1"
  "add-language-fix.ps1"
  "test-language-switching.js"
  "test-language.html"
  "missing-translations.txt"
  "check-translations.js"
  "fix-language-switching.js"
)

# Step 3: Delete unnecessary files
for file in "${files_to_delete[@]}"; do
  if [ -f "$file" ]; then
    echo "Removing unnecessary file: $file"
    rm "$file"
  else
    echo "File not found: $file"
  fi
done

echo "Website cleanup completed successfully!"
echo "The site is now ready for deployment to GitHub and Netlify."