import Accordion from './components/Accordion/Accordion';

const ACCORDION_LIST = [
  {
    id: 'experience',
    title: 'We got 20 years of experience',
    content: (
      <article>
        <p>You can&apos;t go wrong with us. </p>
        <p>We are in the business of planning highly individualized vacation trips for more 20 years.</p>
      </article>
    ),
  },
  {
    id: 'local-guides',
    title: "We're working with local guides",
    content: (
      <article>
        <p>We are not doing this along from our office.</p>
        <p>Instead, we are working with local guides to ensure a safe and pleasant vacation.</p>
      </article>
    ),
  },
];

function App() {
  return (
    <main>
      <section>
        <h2>Why work with us?</h2>

        <Accordion className="accordion">
          {ACCORDION_LIST.map(({ id, title, content }) => (
            <Accordion.Item key={id} id={id}>
              <Accordion.Title className="accordion-item-title">{title}</Accordion.Title>
              <Accordion.Content className="accordion-item-content">{content}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>
    </main>
  );
}

export default App;
