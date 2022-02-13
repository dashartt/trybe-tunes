import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-light" role="status">
          {/* <span className="visually-hidden">Loading...</span> */}
        </div>
      </div>
    );
  }
}

export default Loading;
