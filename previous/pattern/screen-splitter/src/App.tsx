import SplitScreen from './components/split-screen.tsx';

type SideComponentProps = {
  title: string;
};

function LeftSideComponent({ title }: SideComponentProps) {
  return <h2>I am {title}!</h2>;
}
function RightSideComponent({ title }: SideComponentProps) {
  return <h2>I am {title}!</h2>;
}

function App() {
  return (
    <SplitScreen leftWidth={1} rightWidth={5}>
      <LeftSideComponent title="Left" />
      <RightSideComponent title="Right" />
    </SplitScreen>
  );
}

export default App;
