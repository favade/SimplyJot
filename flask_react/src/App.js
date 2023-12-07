import React, { useState } from 'react';
 import './App.css';

function App() {
  const [journals, setJournals] = useState([]);
  const [note, setNote] = useState('');
  const [title, setTitle] = useState('');

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value); 
  };

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    const newJournalEntry = { title, note };

  
    fetch('http://localhost:5000/save_note', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJournalEntry),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setJournals([...journals, newJournalEntry]); 
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    
    setTitle('');
    setNote('');
  };

  return (
    <div className="App">
      <form onSubmit={handleNoteSubmit}>
        <label>
          Enter a title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          Enter your note:
          <textarea value={note} onChange={handleNoteChange} />
        </label>
        <button type="submit">Save</button>
      </form>
      <div className="journal-list">
        {journals.map((journalEntry, index) => (
          <div key={index} className="journal-entry">
            <strong>{journalEntry.title}</strong>
            <p>{journalEntry.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
