import { createContext, useState, useContext } from "react";
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

const AccordionContext = createContext();

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error("Accordion-related components must be wrapped by <Accordion>.");
  }

  return context;
};

export default function Accordion({ children, className }) {
  const [openItemId, setOpenItemId] = useState(null);

  const toggleItem = (id) => setOpenItemId((prevId) => (prevId === id ? null : id));

  const contextValue = { openItemId, toggleItem };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}

Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
