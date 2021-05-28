import React, { useEffect, useState } from 'react';
import axios from 'axios';
const apiURL = 'http://localhost:8000'

interface userWrapper {
  item: { id: number, name: string, email: string, created_at: string, updated_at: string }[]
}

const App: React.FC = () => {
  const [user,setUsers] = useState<userWrapper | undefined>(undefined);

  const getUsers = () => {
    axios.get(apiURL + "/api/v1/users").then(response => {
      setUsers(response.data);
    }).catch(error => console.log(error))
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div>
      {JSON.stringify(user) }
    </div>
  );
}

export default App;
