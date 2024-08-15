// import ScreenSplitter from './screen-splitter/screen-splitter';
import { SideComponent } from './screen-splitter/side-component';
import CleanScreenSplitter from './screen-splitter/clean-screen-splitter';
import RegularList from './lists/list/regular-list';

import { authors } from '../../assets/data/authors';
import { books } from '../../assets/data/books';

import SmallAuthorListItem from './lists/authors/small-author-list-item';
import LargeAuthorListItem from './lists/authors/large-author-list-item';
import SmallBookListItem from './lists/books/small-book-list-item';
import LargeBookListItem from './lists/books/large-book-list-item';
import NumberedList from './lists/list/numbered-list';
import Modal from './modal/modal';

export default function LayoutComponent() {
  return (
    // <ScreenSplitter Left={LeftComponent} Right={RightComponent} leftWidth={2} rightWidth={1} />

    <>
      <Modal>
        <NumberedList items={authors} sourceName={'author'} ItemComponent={LargeAuthorListItem} />
      </Modal>

      <CleanScreenSplitter leftWidth={1} rightWidth={2}>
        <SideComponent title="LEFT" />
        <SideComponent title="RIGHT" />
      </CleanScreenSplitter>

      <RegularList items={authors} sourceName={'author'} ItemComponent={SmallAuthorListItem} />
      <NumberedList items={authors} sourceName={'author'} ItemComponent={LargeAuthorListItem} />
      <RegularList items={books} sourceName={'book'} ItemComponent={SmallBookListItem} />
      <RegularList items={books} sourceName={'book'} ItemComponent={LargeBookListItem} />
    </>
  );
}
