const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Get today's date in the required format
const today = new Date();
const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD format
const formattedTime = today.toTimeString().split(" ")[0].slice(0, 5); // HH:MM format

// Path to the daily note in the relative 'notes' folder
const notesDir = path.join(__dirname, "notes");
const notePath = path.join(notesDir, `${formattedDate}.md`);

// Check if the file exists, if not create it
if (!fs.existsSync(notePath)) {
  fs.writeFileSync(notePath, "");
}

// Function to add an entry to the daily note
const addEntry = (entryText, isTodo) => {
  // Read the file contents
  const fileContent = fs.readFileSync(notePath, "utf-8");
  const lastTimeStamp = (fileContent.match(/#### (\d{2}:\d{2})/g) || []).pop();

  let newContent = "";

  // If the last timestamp is not equal to the current time, add a new timestamp
  if (!lastTimeStamp || lastTimeStamp !== `#### ${formattedTime}`) {
    newContent += `\n#### ${formattedTime}\n`;
  }

  if (isTodo) {
    newContent += `- [ ] ${entryText}\n`;
  } else {
    newContent += `- ${entryText}\n`;
  }

  fs.appendFileSync(notePath, newContent);
};

// Main script
const command = process.argv[2];
const entryText = process.argv.slice(3).join(" ");

if (command === "add" || command === "todo") {
  const isTodo = command === "todo";
  addEntry(entryText, isTodo);
} else {
  // Open the note in the default editor
  execSync(`vi "${notePath}"`, { stdio: "inherit" });
}
