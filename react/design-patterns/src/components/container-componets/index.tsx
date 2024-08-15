// import CurrentUserLoader from './parent/current-user-loader';
// import UserInfo, { User } from './child/user-info';
// import UserLoader from './parent/user-loader';
// import ResourceLoader from './parent/resource-loader';
// import BookInfo from './child/book-info';
// import DataSource from './parent/data-source';
import axios from 'axios';
import RenderSource from './parent/render-source';

export default function ContainerComponent() {
  async function getDataFromServer(url: string) {
    const response = await axios.get(url);
    return response.data;
  }

  return (
    <>
      {/* <CurrentUserLoader>
        <UserInfo />
      </CurrentUserLoader> */}
      {/* <UserLoader userId={'1'}>
        <UserInfo />
      </UserLoader>
      <UserLoader userId={'2'}>
        <UserInfo />
      </UserLoader>
      <UserLoader userId={'3'}>
        <UserInfo />
      </UserLoader> */}
      {/* <ResourceLoader resourceUrl="/users/1" resourceName="user">
        <UserInfo />
      </ResourceLoader> */}
      {/* <ResourceLoader resourceUrl="/books/1" resourceName="book">
        <BookInfo />
      </ResourceLoader> */}
      {/* <DataSource
        getData={() => getDataFromServer('http://localhost:9090/users/1')}
        resourceName="user"
      >
        <UserInfo />
      </DataSource> */}
      <RenderSource
        getData={() => getDataFromServer('http://localhost:9090/users/1')}
        render={resource => <UserInfo user={resource as User} />}
      />
    </>
  );
}
