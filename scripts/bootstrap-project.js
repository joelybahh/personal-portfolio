const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Output path from command-line argument
const outputPath = process.argv[2];

// Check if output path is provided
if (!outputPath) {
  console.error("Usage: node script.js <output-path>");
  process.exit(1);
}

// Check if the output directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  console.error(`Output directory not found: ${outputDir}`);
  process.exit(1);
}
// get slug, file-name minus extension and path
const slug = path.basename(outputPath, path.extname(outputPath));

// Read the template file
const templatePath = path.join(__dirname, "..", "templates", "project.html");
const templateContent = fs.readFileSync(templatePath, "utf8");

// Replacement strings and their prompts
const replaceKeys = {
  "{{Page Title}}": "Enter page title: ",
  "{{Page Description}}": "Enter page description: ",
  "{{Page Slug}}": "Enter page slug: ",
  "{{Article Headline}}": "Enter article headline: ",
  "{{Image Name}}": "Enter image name: ",
  "{{Publication Date}}": "Enter publication date: ",
  "{{Last Modified Date}}": "Enter last modified date: ",
};

// Prepare readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to prompt user for input
function promptUser(prompt) {
  return new Promise((resolve, reject) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Perform replacements
async function performReplacements() {
  let replacedContent = templateContent;

  // Prompt for each replacement key except {{Page Slug}}
  for (const [key, prompt] of Object.entries(replaceKeys)) {
    if (key !== "{{Page Slug}}") {
      const value = await promptUser(prompt);
      const regex = new RegExp(key, "g");
      replacedContent = replacedContent.replace(regex, value);
    }
  }

  // Replace {{Page Slug}} with the extracted slug
  replacedContent = replacedContent.replace("{{Page Slug}}", slug);

  // Write the replaced content to the output file
  fs.writeFileSync(outputPath, replacedContent);

  console.log(`Project page created: ${outputPath}`);

  // Close the readline interface
  rl.close();
}

// Start the REPL for user input
performReplacements();
