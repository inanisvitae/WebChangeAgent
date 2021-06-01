import React, { useState, useEffect } from 'react';
import _ from 'underscore';
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
let URL = 'http://localhost:3000';

if (process.env.NODE_ENV === 'production') {
  URL = 'https://changedetectorserver.herokuapp.com';
}

const IndexPage = () => {
  const [dir, setDir] = useState();
  const [data, setData] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [dateDual, setDateDual] = useState(['*', '*']);
  useEffect(() => {
    axios.post(`${URL}/directory`).then((resp) => {
      const {
        data: {
          result: dir
        },
      } = resp;
      setDir(dir);
      setIsLoading(false);
    })
  }, []);

  const selectDate = (dateStr) => {
    console.log(dateStr);
    const [url, date] = dateStr.split(':');
    if (url !== selectedUrl) {
      setSelectedUrl(url);
      setDateDual([date, '*']);
    } else {
      const startDate = dateDual[0] !== '*' ? dateDual[0] : '';
      const endDate = dateDual[1] !== '*' ? dateDual[1] : '';
      if (!startDate && !endDate) {
        setDateDual([startDate, '*']);
        return ;
      }
      if (startDate && !endDate) {
        if (date > startDate) {
          setDateDual([startDate, date]);
          return ;
        }
        if (date < startDate) {
          setDateDual([date, startDate]);
          return ;
        }
      }
      if (!startDate && endDate) {
        if (date > endDate) {
          setDateDual([endDate, date]);
          return ;
        }
        if (date < endDate) {
          setDateDual([date, endDate]);
          return ;
        }
      }

      if (startDate && startDate > date) {
        setDateDual([date, startDate]);
        return ;
      }
      if (endDate && endDate < date) {
        setDateDual([endDate, date]);
        return ;
      }
      if (startDate && endDate && startDate < date && date < endDate) {
        setDateDual([startDate, date]);
        return ;
      }

    }
  }

  const getPatch = () => {
    if (dateDual[0] !== '*' && dateDual[1] !== '*') {
      setIsLoading(true);
      axios.post(`${URL}/get`, {
        dates: {
          startDate: dateDual[0],
          endDate: dateDual[1],
        },
        url: selectedUrl,
      }).then((ele) => {
        const { data: {
          result: {
            diff,
          },
        } } = ele;
        const outputHtml = Diff2Html.html(diff, { drawFileList: true, matching: 'lines', outputFormat: 'side-by-side' });
        setIsLoading(false);
        setData(outputHtml);
        return null;
      });
    }
  };

  const changeMonitoringUrl = () => {
    setIsLoading(true);
    axios.post(`${URL}/config`, {
      url,
    }).then((resp) => {
      console.log('Set a new url to monitor', resp);
      setIsLoading(false);
    });
  };

  const dateFormatter = (dateMiliSeconds) => new Date(parseInt(dateMiliSeconds, 10)).toString();

  if (isLoading) {
    return <main style={pageStyles}>Loading...</main>;
  }
  return (
    <main style={pageStyles}>
      <title>Website Content Change</title>
      <h1 style={headingStyles}>
        Web Content Changes Detection
      </h1>
      <div dangerouslySetInnerHTML={{__html: data}}>
      </div>
      <h3>Current Url and Dates</h3>
      <span>{decodeURIComponent(selectedUrl)}</span><br />
      <p>Start Date</p><p>{dateDual[0] === '*' ? '*' : dateFormatter(dateDual[0])}</p>
      <p>End Date</p><p>{dateDual[1] === '*' ? '*' : dateFormatter(dateDual[1])}</p>
      <button onClick={e => getPatch()}>Patch</button>
      <h3>Url</h3>
      <p>{url}</p>
      <h3>Website Archives</h3>
      {
        _.keys(dir).length > 0 ?
        (<div>
        {
          _.keys(dir).map((dirKey) => {
            return (
              <div key={`title-${dirKey}`}>
                <h4>{decodeURIComponent(dirKey)}</h4>
                <ul key={dirKey}>
                  {
                    dir[dirKey].map(date => {
                      return (<button key={`${dirKey}:${date}`} onClick={(e) => selectDate(`${dirKey}:${date}`)}>{dateFormatter(date)}</button>);
                    })
                  }
                </ul>
              </div>
              );
          })
        }
        </div>)
        : (<p>Nothing in directory</p>)
      }
      <h3>Request to monitor a new website</h3>
      <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
      <button onClick={e => changeMonitoringUrl()}>
        Change Url!
      </button>
    </main>
  )
}

export default IndexPage
