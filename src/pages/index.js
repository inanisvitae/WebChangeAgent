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
    url: null,
    latestContent: null
  });
  useEffect(() => {
    if (state.data) {
      return;
    }
    axios.post('http://localhost:3000/get').then((ele) => {
      const { data: {
        result: {
          diff,
          url,
          latestContent,
        },
      } } = ele;
      const outputHtml = Diff2Html.html(diff, { drawFileList: true, matching: 'lines', outputFormat: 'side-by-side' });
      setState({
        ...state,
        data: outputHtml,
        url,
        latestContent,
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
      <h3>Url</h3>
      <p>{state.url}</p>
      <h3>Latest Content</h3>
      <p>{state.latestContent}</p>
      <h3>Request to monitor a new website</h3>
      <input/>
      <button>
        Request
      </button>
    </main>
  )
}

export default IndexPage
