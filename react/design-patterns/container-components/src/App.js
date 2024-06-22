// import { UserInfo } from './components/user-info';
// import { BookInfo } from './components/book-info';
// import { CurrentUserLoader } from './components/current-user-loader';
// import { UserLoader } from './components/user-loader';
// import { ResourceLoader } from './components/resource-loader';
import { DataSource } from './components/data-source';
// import { DataSourceWithRender } from './components/÷ata-source-with-render';

import axios from 'axios';

// const getDataFromServer = async () => {
//   const response = await axios.get('/current-user');
//   return response.data;
// };

const getDataFromLocalStorage = key => () => {
  return localStorage.getItem(key);
};

const Message = ({ msg }) => <h1>{msg}</h1>;

function App() {
  return (
    <>
      {/* <CurrentUserLoader>
        <UserInfo />
      </CurrentUserLoader> */}
      {/* <UserLoader userId="1">
        <UserInfo />
      </UserLoader>
      <UserLoader userId="2">
        <UserInfo />
      </UserLoader>
      <UserLoader userId="3">
        <UserInfo />
      </UserLoader> */}

      {/* <ResourceLoader resourceUrl="/users/2" resouceName={'user'}>
        <UserInfo />
      </ResourceLoader>
      <ResourceLoader resourceUrl="/book/1" resouceName={'book'}>
        <BookInfo />
      </ResourceLoader> */}

      {/* <DataSource getData={() => getDataFromServer('current-user')} resouceName={'user'}>
        <UserInfo />
      </DataSource> */}
      {/* 
      <DataSourceWithRender
        getData={() => getDataFromServer('current-user')}
        render={response => <UserInfo user={response} />}
      >
        <UserInfo />
      </DataSourceWithRender> */}

      <DataSource getData={() => getDataFromLocalStorage('test')} resouceName="msg">
        <Message />
      </DataSource>
    </>
  );
}

export default App;
