import { SideCompoent } from './components/split-screen/SideCompoent';
import { SplitScreen } from './components/split-screen/SplitScreen';

function App() {
  return (
    <>
      <SplitScreen leftWitdh={1} rightWidth={3}>
        <SideCompoent title="LEFT!" />
        <SideCompoent title="RIGHT" />
      </SplitScreen>
    </>
  );
}

export default App;
