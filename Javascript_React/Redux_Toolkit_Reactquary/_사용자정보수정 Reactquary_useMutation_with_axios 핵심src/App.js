import Users from './Users';
import UserDetail from './UserDetail';
import { useState } from 'react';

function App() {
  const [userId, setUserId] = useState();

  return (
    <>
      <div style={{ padding: 20, width: '30%', borderRight: '2px solid white' }}>
        <Users setUserId={setUserId} />
      </div>
      <div style={{ padding: 20, width: '70%' }}>
        <UserDetail userId={userId} />
      </div>
    </>
  );
}

export default App;