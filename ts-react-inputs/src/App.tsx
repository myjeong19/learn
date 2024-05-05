import Button from './components/Button';
import Container from './components/Container';
// import Input from './components/Input';

function App() {
  return (
    <main>
      {/* <Input id="name" label="Your name" type="text" /> */}
      {/* <Input id="age" label="Your age" type="number" /> */}
      {/* <Button type="button">A Button</Button> */}
      {/* <Button href="https://google.com">A Link</Button> */}
      <Container as={Button}>A Button</Container>
    </main>
  );
}

export default App;
