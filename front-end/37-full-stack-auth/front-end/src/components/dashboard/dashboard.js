import React from 'react';

class Dashboard extends React.Component {
  render(){
    return (
      <div className='dashboard'>
        <h1> Hello from Dashboard </h1>
        <h2> You can only see this if you are logged in </h2>
      </div>
    );
  }
}

export default Dashboard;