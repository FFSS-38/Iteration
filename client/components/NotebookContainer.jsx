import React, { Component } from 'react';

const NotebookContainer = ({notes}) => {
  return (
    <div className="homeCategory">
      <div className="notebookTitle">Notebook</div>
      <div className="noteBook">{notes}</div>
      {/* add onclick functionality to update notes*/}
      <button>Edit notes</button>
    </div>
  );
};

export default NotebookContainer;
