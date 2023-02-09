import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const NotebookContainer = ({ notes }) => {
  const navigate = useNavigate();
  return (
    <div className="homeCategory">
      <div className="notebookTitle">Notebook</div>
      {/* <div className='noteBook'>{notes}</div> */}
      <button className='signup-button' onClick={() => navigate('/notes')}>Edit notes</button>
    </div>
  );
};

const DisplayNotes = (props) => {
  const [notes, setNotes] = useState([]);
  const { petObj } = props;
  console.log('yo pet', petObj);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const note = e.target.value;
      console.log('you entered this', note)
      fetch('/pet/notes/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({
          Pet: petObj._id,
          Note: note,
        }),
      })
        .then((res) => res.json())
        .then((results) => {
          setNotes([...notes, { Date: results.Date, Note: results.Note }]);
        });
      // e.target.value = '';
    }
  };
  // post /pet/notes/new
  // petid, date, content
  useEffect(() => {
    fetch('/pet/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ Pet: petObj._id }),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log('should be array of notes', results);
        setNotes([...notes, { Note: results.Note }]);
      });
  }, []);
  return (
    <>
      <div>
        <h1>{petObj.Name}</h1>
        {/* <h1>petObj.Name</h1> */}
        <ul>
          {notes.map((note, i) => (
            <div> 
             <p>{note.Note}</p> 
            </div>
          ))}
        </ul>
      </div>
      <div>
        <input
          id="newNote"
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Add a Note"
        />
      </div>
    </>
  );
};
export { NotebookContainer, DisplayNotes };
