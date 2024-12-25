import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, X, Eye } from 'lucide-react';

const EntryForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    terms: '',
    content: '',
    references: '',
    tags: ''
  });
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        terms: initialData.terms.join(', '),
        content: initialData.content,
        references: initialData.references.join(', '),
        tags: initialData.tags.join(', ')
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      terms: formData.terms.split(',').map(t => t.trim()),
      content: formData.content,
      references: formData.references.split(',').map(r => r.trim()),
      tags: formData.tags.split(',').map(t => t.trim()),
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date()
    };
    onSubmit(entry);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopy = () => {
    const formattedData = JSON.stringify(formData, null, 2);
    navigator.clipboard.writeText(formattedData);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Entry' : 'Add New Entry'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Terms (comma-separated)</label>
            <Input
              name="terms"
              value={formData.terms}
              onChange={handleChange}
              placeholder="Meditation, Mindfulness"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <Textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              placeholder="Enter the definition or explanation..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">References (comma-separated)</label>
            <Input
              name="references"
              value={formData.references}
              onChange={handleChange}
              placeholder="Ancient Texts, Modern Sources"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
            <Input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="practice, spirituality"
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setPreview(!preview)}
            >
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCopy}
            >
              Copy Code
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="flex items-center gap-2"
              onClick={onCancel}
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </div>
        </form>

        {preview && (
          <div className="mt-8 p-4 border rounded-lg">
            <h3 className="font-bold mb-2">Preview:</h3>
            <div className="space-y-2">
              <p><strong>Terms:</strong> {formData.terms}</p>
              <p><strong>Content:</strong> {formData.content}</p>
              <p><strong>References:</strong> {formData.references}</p>
              <p><strong>Tags:</strong> {formData.tags}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EntryForm;
