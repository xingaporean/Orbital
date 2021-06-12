import React from 'react';
import { CssBaseline } from '@material-ui/core'

import JobIndex from './components/JobIndex'
import CreateJob from './components/CreateJob';

const App: React.FC = () => {

  return (
    <CssBaseline> 
      <div>
        <JobIndex />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <CreateJob />
      </div>
    </CssBaseline>
  );
}

export default App;
