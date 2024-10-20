//@ts-nocheck
// THIS PATCHES THE CARD DATA TO ADD SLUG

const fs = require("fs");
const path = require("path");

// Define your types
type Card = {
  name: string;
  slug: string;
  guardian: {
    type: string;
  };
};

type ProcessedCard = {
  name: string;
  slug: string;
  type: string;
};

// Function to process the cards array
function processCards(cards: any[]): any[] {
  return cards.map((card) => {
    const _slug = card.sets?.[0]?.variants?.[0].slug;
    const slug = _slug.split("_").slice(1).join("_");
    return {
      ...card,
      slug: slug,
      type: card.guardian.type.toLowerCase(),
    };
  });
}

console.log("xxxxxxx", __dirname);
// Paths for reading and writing files
const inputFilePath = path.join(__dirname, "/public/card-data/_cards.json");
const outputFilePath = path.join(__dirname, "/public/card-data/cards.json");

// Read the original JSON file
fs.readFile(inputFilePath, "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading the input file:", err);
    return;
  }

  try {
    // Parse the JSON data
    const cards: Card[] = JSON.parse(data);

    // Process the cards
    const processedCards = processCards(cards).sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    // Write the processed data to a new file
    fs.writeFile(
      outputFilePath,
      JSON.stringify(processedCards, null, 2),
      "utf-8",
      (err) => {
        if (err) {
          console.error("Error writing the output file:", err);
        } else {
          console.log("Processed cards written to:", outputFilePath);
        }
      },
    );
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
  }
});
