import './App.css';
import WhatIsUseEffect from './components/WhatIsUseEffect';
import WhatIsUseMemo from './components/WhatIsUseMemo';
import { WhatIsUseReducer } from './components/WhatIsUseReducer';
import { WhatIsUseRef } from './components/WhatIsUseRef';
import WhatIsUseState from './components/WhatIsUseState';
import { Container } from './components/WhatisUseContext/Container';
import { ThemeContextProvider } from './components/WhatisUseContext/ThemeContextProvider';

function App() {
  return (
    <>
      <WhatIsUseState />
      <hr />
      <WhatIsUseEffect />
      <hr />
      <WhatIsUseReducer />
      <hr />
      <ThemeContextProvider>
        <Container />
      </ThemeContextProvider>
      <hr />
      <WhatIsUseRef />
      <hr />
      <WhatIsUseMemo />
    </>
  );
}

export default App;
