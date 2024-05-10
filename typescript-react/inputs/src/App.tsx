import { useRef } from 'react';
import Button from './components/Button';
// import Container from './components/Container';
import Input from './components/Input';
import Form, { FormHandle } from './components/Form';

function App() {
  // const input = useRef<HTMLInputElement>(null);
  const customForm = useRef<FormHandle>(null);

  function handleSave(data: unknown) {
    // const extractedData = data as { name: string; age: string };
    if (!data || typeof data !== 'object' || !('name' in data) || !('age' in data)) {
      return;
    }

    // at this point, TypeScript knows that data MUST BE an object
    // with a name and age property
    // otherwise, the previous if statement would have returned
    console.log(data);
    customForm.current?.clear();
  }

  return (
    <main>
      {/* <Input id="name" label="Your name" type="text" /> */}
      {/* <Input id="age" label="Your age" type="number" /> */}
      {/* <Input label="Test" id="Test" /> */}
      {/* <Button type="button">A Button</Button> */}
      {/* <Button href="https://google.com">A Link</Button> */}
      {/* <Container as={Button}>A Button</Container> */}
      <Form onSave={handleSave} ref={customForm}>
        <Input type="text" label="Name" id="name" />
        <Input type="number" label="Age" id="age" />
        <p>
          <Button>Save</Button>
        </p>
      </Form>
    </main>
  );
}

export default App;
