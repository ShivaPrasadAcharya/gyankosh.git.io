import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, Edit2, Trash2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DictionaryEntry = ({ entry, onEdit, onDelete, searchTerms = [] }) => {
  const [printColumns, setPrintColumns] = useState(1);

  const highlightText = (text) => {
    if (!searchTerms.length) return text;
    
    const colors = ['bg-yellow-200', 'bg-blue-200', 'bg-green-200', 'bg-pink-200'];
    let highlightedText = text;
    
    searchTerms.forEach((term, index) => {
      if (!term) return;
      const regex = new RegExp(`(${term})`, 'gi');
      const color = colors[index % colors.length];
      highlightedText = highlightedText.replace(
        regex,
        `<span class="${color}">$1</span>`
      );
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Entry</title>
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
            <h2>${entry.terms.join(', ')}</h2>
            <p>${entry.content}</p>
            ${entry.references.length ? `<p><strong>References:</strong> ${entry.references.join(', ')}</p>` : ''}
            ${entry.tags.length ? `<p><strong>Tags:</strong> ${entry.tags.join(', ')}</p>` : ''}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <p className="text-lg mb-4">{highlightText(entry.content)}</p>
            {entry.references.length > 0 && (
              <p className="text-sm text-gray-600 mb-2">
                <strong>References:</strong> {entry.references.join(', ')}
              </p>
            )}
            {entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {entry.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPrintColumns(1)}>
                <Printer className="h-4 w-4 mr-2" />
                Print (Single Column)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPrintColumns(2)}>
                <Printer className="h-4 w-4 mr-2" />
                Print (Double Column)
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this entry?')) {
                    onDelete();
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default DictionaryEntry;
