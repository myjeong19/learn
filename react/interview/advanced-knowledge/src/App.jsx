import './App.css';
import WhatIsUseEffect from './components/WhatIsUseEffect';
import { WhatIsUseReducer } from './components/WhatIsUseReducer';
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
    </>
  );
}

export default App;
