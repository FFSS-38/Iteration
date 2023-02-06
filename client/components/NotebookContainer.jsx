import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotebookContainer extends Component {
  render() {
    console.log('hi from notebook');
    return (
      <container>
        <div className='notebookTitle'>Notebook</div>
        <div className='noteBook'>{this.props.notes}</div>
        {/* add onclick functionality to update notes*/}
        <button>Edit notes</button>
      </container>
    );
  }
}

export default NotebookContainer;
