// import { SideCompoent } from './components/split-screen/SideCompoent';
// import { SplitScreen } from './components/split-screen/SplitScreen';

import { LargeAuthorListItems } from './components/lists/authors/LargeListItems';
import { SmallAuthorListItems } from './components/lists/authors/SmallListItems';
import { LargeBookListItem } from './components/lists/books/LargeListItems';
import { SmallBookListItems } from './components/lists/books/SmallListItems';
import { NumberedList } from './components/lists/lists/Numbered';
import { Modal } from './components/Modal';

import { RegularList } from './components/lists/lists/Regular';
import { authors } from './data/authors';
import { books } from './data/books';

function App() {
  return (
    <>
      {/* <SplitScreen leftWitdh={1} rightWidth={3}>
        <SideCompoent title="LEFT!" />
        <SideCompoent title="RIGHT" />
      </SplitScreen> */}

      {/* <RegularList items={authors} sourceName="author" ItemComponents={SmallAuthorListItems} />
      <NumberedList items={authors} sourceName="author" ItemComponents={LargeAuthorListItems} />

      <RegularList items={books} sourceName="book" ItemComponents={SmallBookListItems} />
      <NumberedList items={books} sourceName="book" ItemComponents={LargeBookListItem} /> */}

      <Modal>
        <LargeBookListItem book={books[0]} />
      </Modal>
    </>
  );
}

export default App;
