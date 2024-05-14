import SplitScreen from './components/split-screen.tsx';

function LeftSideComponent() {
  return <h2>I am left!</h2>;
}
function RightSideComponent() {
  return <h2>I am right!</h2>;
}

function App() {
  return <SplitScreen Left={LeftSideComponent} Right={RightSideComponent} />;
}

export default App;
