import React from 'react';
import SpiritualDictionary from './components/SpiritualDictionary';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Spiritual Dictionary
              </h1>
              <nav className="flex space-x-4">
                <a 
                  href="https://github.com/shivaprasadacharya/gyankosh.git.io" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  GitHub
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-4">
          <SpiritualDictionary />
        </main>

        <footer className="bg-white border-t mt-8">
          <div className="max-w-7xl mx-auto py-4 px-4">
            <div className="text-center text-gray-600">
              © {new Date().getFullYear()} Spiritual Dictionary - All rights reserved
            </div>
            <div className="text-center text-sm text-gray-500 mt-2">
              Built with React and Tailwind CSS
            </div>
          </div>
        </footer>
      </div>
      <Toaster />
    </>
  );
}

export default App;
