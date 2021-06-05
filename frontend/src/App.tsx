import React from 'react';
import { CssBaseline } from '@material-ui/core'

import JobIndex from './components/JobIndex'

const App: React.FC = () => {

  return (
    <CssBaseline> 
        <JobIndex />
    </CssBaseline>
  );
}

export default App;
