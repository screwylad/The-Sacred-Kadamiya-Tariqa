/**
 * Script to add language switching support to all HTML pages
 * Run this script with Node.js
 */

const fs = require('fs');
const path = require('path');

// Directory containing HTML files
const websiteDir = __dirname;

// Get all HTML files
const htmlFiles = fs.readdirSync(websiteDir)
    .filter(file => file.endsWith('.html'))
    .filter(file => !file.includes('googlecde7cba61a50bb58')); // Skip Google verification file

console.log(`Found ${htmlFiles.length} HTML files to update`);

// Process each HTML file
htmlFiles.forEach(htmlFile => {
    const filePath = path.join(websiteDir, htmlFile);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    console.log(`\nProcessing ${htmlFile}...`);
    
    // 1. Add i18n scripts to head if not present
    if (!content.includes('assets/js/i18n.js')) {
        const scriptsToAdd = `
    <!-- Load i18n scripts -->
    <link rel="stylesheet" href="assets/css/i18n.css">
    <script src="assets/js/i18n.js"></script>
    <script src="assets/js/i18n/i18n-loader.js"></script>
    <!-- Debug scripts -->
    <script src="assets/js/i18n-debug.js"></script>
    <script src="assets/js/i18n-debug-mode.js"></script>`;
        
        content = content.replace('</head>', `${scriptsToAdd}\n</head>`);
        console.log('- Added i18n scripts to head');
    }
    
    // 2. Add data-i18n attribute to logo text if not present
    if (!content.includes('data-i18n="header.title"') && content.includes('<span class="logo-text">')) {
        content = content.replace('<span class="logo-text">', '<span class="logo-text" data-i18n="header.title">');
        console.log('- Added data-i18n attribute to logo text');
    }
    
    // 3. Add language selector to navbar if not present
    if (!content.includes('language-selector') && content.includes('</ul>')) {
        const languageSelectorHtml = `
                <!-- Language Selector -->
                <div class="language-selector">
                    <span class="language-label" data-i18n="general.selectLanguage">Language:</span>
                    <select id="language-select">
                        <option value="en">English</option>
                        <option value="bn">Bengali</option>
                        <option value="hi">Hindi</option>
                    </select>
                </div>`;
        
        // Insert after the navigation menu
        content = content.replace('</ul>', '</ul>' + languageSelectorHtml);
        console.log('- Added language selector to navbar');
    }
    
    // 4. Add data-i18n attributes to navigation menu items if not present
    if (!content.includes('data-i18n="header.home"') && content.includes('<ul class="nav-menu">')) {
        const navLinks = [
            { href: 'index.html', i18n: 'header.home', text: 'Home' },
            { href: 'about.html', i18n: 'header.about', text: 'About' },
            { href: 'hierarchy.html', i18n: 'header.hierarchy', text: 'Hierarchy' },
            { href: 'faq.html', i18n: 'header.faq', text: 'FAQ' },
            { href: 'rules.html', i18n: 'header.rules', text: 'Rules' },
            { href: 'practices.html', i18n: 'header.practices', text: 'Practices' },
            { href: 'downloads.html', i18n: 'header.downloads', text: 'Downloads' },
            { href: 'gallery.html', i18n: 'header.gallery', text: 'Gallery' },
            { href: 'contact.html', i18n: 'header.contact', text: 'Contact' }
        ];
        
        navLinks.forEach(link => {
            const regex = new RegExp(`<a href="${link.href}"[^>]*>\\s*${link.text}\\s*</a>`, 'g');
            content = content.replace(regex, `<a href="${link.href}" class="nav-link" data-i18n="${link.i18n}">${link.text}</a>`);
        });
        
        console.log('- Added data-i18n attributes to navigation menu items');
    }
    
    // Save the modified file if changes were made
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated ${htmlFile}`);
    } else {
        console.log(`⚠️ No changes were made to ${htmlFile}`);
    }
});

console.log('\nAll HTML files processed');