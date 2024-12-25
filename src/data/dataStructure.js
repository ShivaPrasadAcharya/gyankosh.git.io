// Data structure for spiritual dictionary entries
export const entryStructure = {
  id: String,           // Unique identifier
  terms: [String],      // Array of related terms
  content: String,      // Main content/definition
  references: [String], // Optional references/sources
  tags: [String],       // Optional tags for categorization
  createdAt: Date,      // Entry creation timestamp
  updatedAt: Date       // Last modification timestamp
};

// Sample entry
export const sampleEntry = {
  id: "med-001",
  terms: ["Meditation", "Mindfulness"],
  content: "Meditation is a practice of mindfulness that helps achieve mental clarity and emotional calm...",
  references: ["Ancient Vedic Texts", "Buddhist Scriptures"],
  tags: ["practice", "mental-health", "spirituality"],
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01")
};

// Dictionary data structure
export const dictionaryStructure = {
  entries: Map<String, Array<Entry>>, // Terms mapped to their entries
  index: {
    terms: Set<String>,              // All unique terms
    tags: Set<String>                // All unique tags
  }
};
