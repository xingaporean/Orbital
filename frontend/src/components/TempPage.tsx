import React from 'react';

interface userWrapper {
  logged_in: boolean, 
  user: any
 }
 

type props = {
  name: string
  user: userWrapper
}

const TempPage: React.FC<props> = ({name, user}) => {

  console.log(user)
  
  return (
    <div>
      {name}
    </div>
  )
}

export default TempPage