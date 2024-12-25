import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Get initial value from localStorage or use provided initialValue
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
};

// Custom hook for search functionality
export const useSearch = (items, searchTerms) => {
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (!searchTerms) {
      setFilteredItems(items);
      return;
    }

    const terms = searchTerms
      .split('|')
      .map(term => term.trim().toLowerCase())
      .filter(Boolean);

    if (!terms.length) {
      setFilteredItems(items);
      return;
    }

    const filtered = items.filter(item =>
      terms.some(term =>
        item.terms.some(t => t.toLowerCase().includes(term)) ||
        item.content.toLowerCase().includes(term) ||
        item.tags.some(tag => tag.toLowerCase().includes(term))
      )
    );

    setFilteredItems(filtered);
  }, [items, searchTerms]);

  return filteredItems;
};

// Custom hook for print settings
export const usePrint = () => {
  const [printColumns, setPrintColumns] = useState(1);

  const print = (content) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Dictionary Entry</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              padding: 2rem;
              max-width: 800px;
              margin: 0 auto;
            }
            .content {
              column-count: ${printColumns};
              column-gap: 2rem;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="content">
            ${content}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return { printColumns, setPrintColumns, print };
};
