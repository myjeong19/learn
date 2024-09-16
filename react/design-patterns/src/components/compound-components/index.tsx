import Card from './Crad';

export default function CompoundComponents() {
  return (
    <Card test="value">
      <Card.Header>뇽안!</Card.Header>
      <Card.Body>반갑고구려</Card.Body>
      <Card.Footer>
        <>
          <button>OK</button>
          <button>Cancel</button>
        </>
      </Card.Footer>
    </Card>
  );
}
