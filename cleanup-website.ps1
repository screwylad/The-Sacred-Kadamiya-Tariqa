Write-Host "Cleaning website files for production deployment..." -ForegroundColor Green

# Step 1: Remove debug script references from all HTML files
$htmlFiles = Get-ChildItem -Path . -Filter "*.html"
foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.Name)..." -ForegroundColor Yellow
    
    # Read file content
    $content = Get-Content $file.FullName -Raw
    
    # Remove debug script references
    $content = $content -replace '<!-- Debug and testing scripts -->\s*', ''
    $content = $content -replace '<!-- Testing and debug tools -->\s*', ''
    $content = $content -replace '<script src="assets/js/i18n-test.js"></script>\s*', ''
    $content = $content -replace '<script src="assets/js/i18n-debug.js"></script>\s*', ''
    $content = $content -replace '<script src="assets/js/i18n-debug-mode.js"></script>\s*', ''
    
    # Write updated content back
    Set-Content -Path $file.FullName -Value $content
}

# Step 2: List files to be deleted
$filesToDelete = @(
    "assets/js/i18n-test.js",
    "assets/js/i18n-debug.js",
    "assets/js/i18n-debug-mode.js",
    "i18n-test.html",
    "update-i18n-scripts.ps1",
    "update-i18n-scripts.sh",
    "add-i18n-test-script.ps1",
    "add-language-fix.ps1",
    "test-language-switching.js",
    "test-language.html",
    "missing-translations.txt",
    "check-translations.js",
    "fix-language-switching.js"
)

# Step 3: Delete unnecessary files
foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Write-Host "Removing unnecessary file: $file" -ForegroundColor Red
        Remove-Item -Path $file -Force
    } else {
        Write-Host "File not found: $file" -ForegroundColor Gray
    }
}

Write-Host "Website cleanup completed successfully!" -ForegroundColor Green
Write-Host "The site is now ready for deployment to GitHub and Netlify." -ForegroundColor Cyan