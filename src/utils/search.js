// Search functionality
export const searchEntries = (entries, searchTerms) => {
  if (!searchTerms || !searchTerms.length) return entries;

  const terms = searchTerms
    .split('|')
    .map(term => term.trim().toLowerCase())
    .filter(Boolean);

  if (!terms.length) return entries;

  return entries.filter(entry => {
    return terms.some(term =>
      entry.terms.some(t => t.toLowerCase().includes(term)) ||
      entry.content.toLowerCase().includes(term) ||
      entry.tags.some(tag => tag.toLowerCase().includes(term))
    );
  });
};

// Text highlighting
export const highlightSearchTerms = (text, searchTerms, colors = [
  'bg-yellow-200',
  'bg-blue-200',
  'bg-green-200',
  'bg-pink-200'
]) => {
  if (!searchTerms || !searchTerms.length) return text;

  const terms = searchTerms
    .split('|')
    .map(term => term.trim())
    .filter(Boolean);

  if (!terms.length) return text;

  let highlightedText = text;
  terms.forEach((term, index) => {
    const color = colors[index % colors.length];
    const regex = new RegExp(`(${term})`, 'gi');
    highlightedText = highlightedText.replace(
      regex,
      `<span class="${color}">$1</span>`
    );
  });

  return highlightedText;
};

// Sort entries alphabetically
export const sortEntriesByTerm = (entries) => {
  return entries.sort((a, b) => {
    const termA = a.terms[0].toLowerCase();
    const termB = b.terms[0].toLowerCase();
    return termA.localeCompare(termB);
  });
};

// Group entries by first letter
export const groupEntriesByFirstLetter = (entries) => {
  const grouped = new Map();
  
  entries.forEach(entry => {
    entry.terms.forEach(term => {
      const firstLetter = term[0].toUpperCase();
      if (!grouped.has(firstLetter)) {
        grouped.set(firstLetter, new Map());
      }
      
      const letterGroup = grouped.get(firstLetter);
      if (!letterGroup.has(term)) {
        letterGroup.set(term, []);
      }
      
      letterGroup.get(term).push(entry);
    });
  });

  return grouped;
};
