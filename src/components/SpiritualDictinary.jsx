import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SearchBar from './SearchBar';
import EntryForm from './EntryForm';
import DictionaryEntry from './DictionaryEntry';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { PlusCircle, Printer, Save } from 'lucide-react';

const SpiritualDictionary = () => {
  const [entries, setEntries] = useLocalStorage('dictionary-entries', []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    const terms = searchTerms.split('|').map(term => term.trim().toLowerCase());
    const filtered = entries.filter(entry =>
      terms.some(term =>
        entry.terms.some(t => t.toLowerCase().includes(term)) ||
        entry.content.toLowerCase().includes(term)
      )
    );
    setFilteredEntries(filtered);
  }, [searchTerms, entries]);

  const handleAddEntry = (newEntry) => {
    setEntries(prev => [...prev, { ...newEntry, id: Date.now().toString() }]);
    setIsFormOpen(false);
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const groupEntriesByTerm = () => {
    const grouped = new Map();
    entries.forEach(entry => {
      entry.terms.forEach(term => {
        const key = term[0].toUpperCase();
        if (!grouped.has(key)) {
          grouped.set(key, new Map());
        }
        if (!grouped.get(key).has(term)) {
          grouped.get(key).set(term, []);
        }
        grouped.get(key).get(term).push(entry);
      });
    });
    return grouped;
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="sticky top-0 bg-white z-10 pb-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Spiritual Dictionary</h1>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Add Entry
          </Button>
        </div>
        <SearchBar value={searchTerms} onChange={setSearchTerms} />
      </div>

      {isFormOpen && (
        <EntryForm
          onSubmit={handleAddEntry}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingEntry(null);
          }}
          initialData={editingEntry}
        />
      )}

      <div className="mt-8">
        {Array.from(groupEntriesByTerm()).sort(([a], [b]) => a.localeCompare(b)).map(([letter, terms]) => (
          <div key={letter} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{letter}</h2>
            {Array.from(terms).sort(([a], [b]) => a.localeCompare(b)).map(([term, termEntries]) => (
              <div key={term} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{term}</h3>
                {termEntries.map(entry => (
                  <DictionaryEntry
                    key={entry.id}
                    entry={entry}
                    onEdit={() => handleEdit(entry)}
                    onDelete={() => handleDelete(entry.id)}
                    searchTerms={searchTerms.split('|')}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpiritualDictionary;
