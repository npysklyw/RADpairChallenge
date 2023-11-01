import axios from 'axios';
import './App.css';
import 'react-diff-view/style/index.css';
import { useState } from 'react';
import Button from '@mui/material/Button';

//Two packages used to help show difference in reports
import { diffLines, formatLines } from 'unidiff';
import { parseDiff, Hunk, Diff } from 'react-diff-view';
import Typography from '@mui/material/Typography';

function App() {

  const [apiReport, setApiReport] = useState("");
  const [userReport, setUserReport] = useState("");
  const [templateID, setTemplateID] = useState("");
  const [clicked, setClicked] = useState(false);
  const EMPTY_HUNKS = [];

  //Get server data
  const getData = () => {

    //Axios request to get data
    axios.get('http://127.0.0.1:5000/?template_id=' + templateID)
      .then(function (response) {
        setApiReport(response.data)

      })
      .catch(function (error) {
        console.log("ERROR");
      })
  }

  // Display when user submits their report
  // Use clicked state to determine this
  if (clicked) {

    //Use unidiff to get differences in new report to old report
    let diffText = formatLines(diffLines(apiReport, userReport), { context: 2 });
    let [diff] = parseDiff(diffText, { nearbySequences: 'zip' });

    //JSX to return
    //Use diff component to demonstrate differences in server report to user report
    return (
      <div className="App">
        <div style={{ padding: 10 }}>

          <Typography variant="h4" component="h2" style={{ color: "white" }}>
            Report {templateID} Difference
          </Typography>
        </div>
        {/* <div style={{ padding: 10 }}>
          <Typography variant="h4" component="h2" style={{ color: "white" }}>
            Legend: <text style={{ color: "#FADDE0" }}>EDIT</text> <text style={{ color: "#d6fedb" }}>ADDITION</text>
          </Typography>

        </div> */}


        <div class="container space-around">
          <div style={{ padding: 10 }}>    <Typography variant="h5" component="h5" style={{ color: "white" }}>
            Old Report
          </Typography>
          </div>
          <div style={{ padding: 10 }}><Typography variant="h5" component="h5" style={{ color: "white" }}>
            New Report
          </Typography></div>
        </div>


        <div><Diff optimizeSelection viewType="split" diffType='' hunks={diff.hunks || EMPTY_HUNKS}>

          {hunks =>
            hunks.map(hunk => (
              <Hunk key={hunk.content} hunk={hunk} />
            ))
          }
        </Diff></div>

      </div >)
  }

  //
  return (
    <div className="App">
      <Typography variant="h3" component="h2" style={{ color: "white" }}>
        RadDiffChecker
      </Typography>

      <Typography variant="p" component="p" style={{ color: "white" }}>
        Enter a template ID:
      </Typography>
      <div style={{ padding: 10, textAlign: 'center', }}>
        <input placeholder='Template ID' onChange={(e) => setTemplateID(e.target.value)} value={templateID} />
      </div>
      <Typography variant="p" component="p" style={{ color: "white" }}>
        Enter your report:
      </Typography>
      <div style={{ padding: 10, textAlign: 'center', whiteSpace: "normal" }}>
        <textarea rows="5" cols="80" id="TITLE" placeholder='Enter report here' onChange={(e) => setUserReport(e.target.value)} value={userReport} />
      </div>

      <Button variant="contained" onClick={() => { setClicked(true); getData() }} style={{ backgroundColor: "white", color: "black" }}>Submit Report</Button>

    </div >
  );
}

export default App;
