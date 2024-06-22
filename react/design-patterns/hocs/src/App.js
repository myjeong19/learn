import { checkProps } from './components/check-props';
import { includeUser } from './components/include-user';
import { UserInfoForm } from './components/user-form';
import { UserInfo } from './components/user-info';

// const UserInfoWrapper = checkProps(UserInfo);
// const UserInfoWithLoader = includeUser(UserInfo, 1);

function App() {
  // return <UserInfoWrapper test="test" b="I am b" c={21} />;
  // return <UserInfoWithLoader />;
  return <UserInfoForm />;
}

export default App;
