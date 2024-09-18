export const generateRandomName = (): string => {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective}-${randomNoun}`;
};

// prettier-ignore
const adjectives = [
  "slippery", "happy", "sneaky", "brave", "curious", "lazy", "fuzzy", "jolly",
  "mighty", "quick", "silent", "crafty", "bold", "glowing", "rusty", "ancient",
  "wild", "gentle", "fiery", "bright", "stormy", "peaceful", "shy", "lucky",
  "fearless", "mysterious", "playful", "loyal", "graceful", "energetic", "calm",
  "swift", "clever", "fearsome", "golden", "hungry", "kind", "patient", "proud",
  "rough", "smooth", "tough", "whimsical", "wise", "zealous", "whispering",
  "chirping", "howling", "fluttering", "dancing", "sizzling", "sparkling", "shimmering",
  "daring", "cheerful", "quiet", "eager", "bold", "heroic", "bouncy", "frosty",
  "stormy", "melodic", "twisting", "serene", "dreamy", "majestic", "prickly",
  "noisy", "gentle", "massive", "tiny", "flickering", "whirling", "floating", 
  "crunchy", "whistling", "buzzing", "colorful", "shadowy", "stealthy"
];

// prettier-ignore
const nouns = [
  "mouse", "fox", "lion", "rabbit", "eagle", "whale", "tiger", "panda",
  "otter", "bear", "wolf", "owl", "falcon", "shark", "serpent", "dragon",
  "dolphin", "ant", "beetle", "butterfly", "phoenix", "hawk", "swan", "penguin",
  "panther", "spider", "bat", "giraffe", "elephant", "raven", "crow", "coyote",
  "turtle", "deer", "buffalo", "rhino", "jaguar", "lizard", "snake", "frog",
  "crane", "stork", "zebra", "squirrel", "horse", "stallion", "pegasus", "griffin",
  "chameleon", "mongoose", "iguana", "lemur", "raccoon", "skunk", "weasel",
  "parrot", "penguin", "chimp", "gorilla", "platypus", "walrus", "koala",
  "peacock", "porcupine", "armadillo", "gecko", "macaw", "octopus", "starfish",
  "seahorse", "stingray", "puffin", "hedgehog", "ferret", "hamster", "crab"
];
