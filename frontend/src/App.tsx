import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import JobIndex from './components/JobIndex'
import JobView from './components/JobView'
import CreateJob from './components/CreateJob';

const App: React.FC = () => {

  return (
    <CssBaseline> 
      <div>
      <BrowserRouter>
      <Switch>
          <Route exact path="/" component={JobIndex} />
          <Route exact path="/new" component={CreateJob} />
          <Route exact path="/:id" component={JobView} />
          <Route>
            <Redirect to="/" />
          </Route>
      </Switch>
      </BrowserRouter>
      </div>
    </CssBaseline>
  );
}

export default App;
