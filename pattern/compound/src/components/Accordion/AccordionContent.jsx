import { useAccordionContext } from './Accordion';
import { useAccordionItemContext } from './AccordionItem';

export default function AccordionContent({ className, children }) {
  const { openItemId } = useAccordionContext();

  const id = useAccordionItemContext();

  console.log(id);

  const isOpen = openItemId === id;

  const activeAccordion = isOpen ? `${className ?? ''} open` : `${className} close`;

  return <div className={activeAccordion}>{children}</div>;
}
