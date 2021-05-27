import * as React from 'react';
import 'diff2html/bundles/css/diff2html.min.css';
import * as Diff2Html from 'diff2html';
import { createPatch } from 'diff';

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
  const createDiffHtml = () => {
    const patch = createPatch('Website Content Difference', 'example1_str...', 'example2_str....');
    let outputHtml = Diff2Html.html(patch, { drawFileList: true, matching: 'lines', outputFormat: 'side-by-side' });
    console.log(patch);
    return outputHtml;
  }
  return (
    <main style={pageStyles}>
      <title>Website Content Change</title>
      <h1 style={headingStyles}>
        Web Content Changes Detection
      </h1>
      <div dangerouslySetInnerHTML={{__html: createDiffHtml()}}>
      </div>
    </main>
  )
}

export default IndexPage
