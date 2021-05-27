import React, { useState, useEffect } from 'react';
import 'diff2html/bundles/css/diff2html.min.css';
import * as Diff2Html from 'diff2html';
import axios from 'axios';

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 500,
}

const IndexPage = () => {
  const [state, setState] = useState({
    data: null,
    
  });
  useEffect(() => {
    if (state.data) {
      return;
    }
    axios.post('http://localhost:3000/get').then((ele) => {
      const { data: {
        result,
      } } = ele;
      const outputHtml = Diff2Html.html(result, { drawFileList: true, matching: 'lines', outputFormat: 'side-by-side' });
      setState({
        ...state,
        data: outputHtml,
      });
      return null;
    });
  }, [state.data]);

  return (
    <main style={pageStyles}>
      <title>Website Content Change</title>
      <h1 style={headingStyles}>
        Web Content Changes Detection
      </h1>
      <div dangerouslySetInnerHTML={{__html: state.data}}>
      </div>
      
      <button>
        Request
      </button>
    </main>
  )
}

export default IndexPage
