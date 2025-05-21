const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');

// Create essential files
fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
fs.writeFileSync(path.join(outDir, 'CNAME'), 'kendradev.com');

// Find all HTML files recursively
function findAllHtmlFiles(dir) {
  let results = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      results = results.concat(findAllHtmlFiles(itemPath));
    } else if (item.endsWith('.html')) {
      results.push(itemPath);
    }
  }
  
  return results;
}

const allHtmlFiles = findAllHtmlFiles(outDir);
console.log(`Found ${allHtmlFiles.length} HTML files`);

// Copy the JavaScript files from _next/static/chunks to the root directory
const chunksDir = path.join(outDir, '_next', 'static', 'chunks');
if (fs.existsSync(chunksDir)) {
  const jsFiles = fs.readdirSync(chunksDir)
    .filter(file => file.endsWith('.js'))
    .slice(0, 10); // Limit to first 10 JS files to avoid copying too much
  
  jsFiles.forEach(jsFile => {
    const sourcePath = path.join(chunksDir, jsFile);
    const destPath = path.join(outDir, jsFile);
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${jsFile} to root directory`);
  });
}

// Process each HTML file
allHtmlFiles.forEach(filePath => {
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Fix Next.js asset paths
  html = html.replace(/"\/_next\//g, '"./_next/');

    // Add React CDN fallback scripts - ADD THIS CODE
    html = html.replace('</head>', `
      <!-- React CDN Fallbacks -->
      <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
      </head>`);
  
  // Fix script references by adding a direct script tag for the main chunk
  const mainJsPattern = /<script\s+defer=""\s+crossorigin=""\s+src="\.\/_next\/static\/chunks\/main-[^"]+\.js"/;
  if (mainJsPattern.test(html)) {
    const mainJsMatch = html.match(mainJsPattern);
    if (mainJsMatch) {
      const mainJsFilename = mainJsMatch[0].match(/main-[^"]+\.js/)[0];
      // Add a non-defer version of the script
      const addScript = `<script src="./${mainJsFilename}"></script>`;
      html = html.replace('</head>', `${addScript}\n</head>`);
    }
  }
  
  // Add a noscript warning
  html = html.replace('<body', '<body><noscript><div style="background: red; color: white; padding: 20px; text-align: center;">This site requires JavaScript to function properly. Please enable JavaScript in your browser.</div></noscript>');
  
  // Add inline debugging script
  html = html.replace('</body>', `
<script>
  console.log("Document loaded");
  
  // Check if React is loaded
  setTimeout(function() {
    if (typeof React === 'undefined') {
      console.error("React is not loaded!");
      document.body.innerHTML = '<div style="padding:20px;background:red;color:white;text-align:center"><h1>JavaScript Error</h1><p>React failed to load. Try refreshing the page or clearing your browser cache.</p></div>';
    } else {
      console.log("React is loaded successfully");
    }
  }, 2000);
  
  // Force all script tags to load
  document.querySelectorAll('script[defer]').forEach(function(script) {
    var newScript = document.createElement('script');
    if (script.src) {
      var src = script.src;
      // Fix the src path if needed
      if (src.indexOf('/_next/') !== -1) {
        src = src.replace('/_next/', './_next/');
      }
      newScript.src = src;
    }
    if (script.textContent) {
      newScript.textContent = script.textContent;
    }
    document.head.appendChild(newScript);
  });
</script>
</body>`);
  
  fs.writeFileSync(filePath, html);
  console.log(`Processed ${path.relative(outDir, filePath)}`);
});

// Create a simple test page
const testHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JavaScript Test</title>
  <script>
    function checkJS() {
      document.getElementById('status').textContent = 'JavaScript is working!';
      document.getElementById('status').style.backgroundColor = 'green';
    }
  </script>
</head>
<body onload="checkJS()">
  <h1>JavaScript Test Page</h1>
  <div id="status" style="padding: 20px; background: red; color: white; text-align: center;">
    JavaScript is NOT working
  </div>
  <p style="padding: 20px;">This is a test page to check if JavaScript is working on ${outDir}.</p>
  <p><a href="/">Back to Home</a></p>
</body>
</html>
`;

fs.writeFileSync(path.join(outDir, 'jstest.html'), testHtml);
console.log('Created JavaScript test page at /jstest.html');

console.log('Deployment preparation complete');