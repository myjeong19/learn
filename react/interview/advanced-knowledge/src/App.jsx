import './App.css';
import WhatIsUseEffect from './components/WhatIsUseEffect';
import { WhatIsUseReducer } from './components/WhatIsUseReducer';
import WhatIsUseState from './components/WhatIsUseState';

function App() {
  return (
    <>
      <WhatIsUseState />
      <hr />
      <WhatIsUseEffect />
      <hr />
      <WhatIsUseReducer />
    </>
  );
}

export default App;
