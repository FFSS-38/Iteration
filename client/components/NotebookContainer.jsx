import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const NotebookContainer = ({ notes }) => {
  const navigate = useNavigate();
  return (
    <div className='homeCategory'>
      <div className='notebookTitle'>Notebook</div>
      {/* <div className='noteBook'>{notes}</div> */}
      <button onClick={() => navigate('/notes')}>Edit notes</button>
    </div>
  );
};

const DisplayNotes = (props) => {
  const { petObj } = props;
  console.log('yo pet', petObj);
  const [notes, setNotes] = useState([
    { Date: '2023-12-12', Note: 'DUmmyNOtes' },
  ]);
  // useEffect(() => {
  //   fetch('/pet/notes', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'Application/JSON',
  //     },
  //     body: { Pet: petObj._id },
  //   })
  //     .then((res) => res.json())
  //     .then((results) => {
  //       console.log('should be array of notes', results);
  //        setNotes([...notes, { Date: results, Note: results.Note }]);
  //     });
  // });
  return (
    <div>
      <h1>Fabio</h1>
      {/* <h1>petObj.Name</h1> */}
      <ul>
        {notes.map((note, i) => (
          <li>
            <h4>{note.Date}</h4>
            <p>{note.Note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export { NotebookContainer, DisplayNotes };
