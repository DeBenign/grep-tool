const fs = require('fs');
const path = require('path');

function grep(filePath, pattern, options) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');

    // Regular expression for matching the pattern
    const regex = new RegExp(pattern, options.caseInsensitive ? 'i' : '');

    // Filter lines based on options
    let matchingLines = lines.filter(line => options.invertMatch ? !regex.test(line) : regex.test(line));

    // Print matching lines
    if (matchingLines.length > 0) {
      console.log(`Matching lines in ${filePath}:`);
      matchingLines.forEach((line, index) => {
        console.log(`${index + 1}: ${line}`);
      });
    } else {
      console.log(`No matching lines found in ${filePath}`);
    }

    return matchingLines.length; // Return the number of matches
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    return 0; // Return 0 for errors
  }
}

function grepRecursive(directoryPath, pattern, options) {
  try {
    const files = fs.readdirSync(directoryPath);

    let totalMatches = 0;

    files.forEach(file => {
      const filePath = path.join(directoryPath, file);

      if (fs.statSync(filePath).isDirectory()) {
        // Recursively search directories
        totalMatches += grepRecursive(filePath, pattern, options);
      } else {
        // Process individual files
        totalMatches += grep(filePath, pattern, options);
      }
    });

    return totalMatches;
  } catch (error) {
    console.error(`Error reading directory: ${error.message}`);
    return 0; // Return 0 for errors
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const pattern = args[0];
const directoryOrFile = args[1];
const options = {
  recursive: args.includes('-r'),
  invertMatch: args.includes('-v'),
  caseInsensitive: args.includes('-i'),
};

// Handle the case when no pattern or directory/file is provided
if (!pattern || !directoryOrFile) {
  console.error('Usage: node grep.js [options] pattern directoryOrFile');
  process.exit(1);
}

// Handle the -r option for recursive search
const totalMatches = options.recursive
  ? grepRecursive(directoryOrFile, pattern, options)
  : grep(directoryOrFile, pattern, options);

console.log(`Total matches: ${totalMatches}`);
