import { UserInfoProps } from './user-info';

type LogProps = (props: UserInfoProps) => React.ReactElement;

export function logProps(Component: LogProps) {
  return (props: UserInfoProps) => {
    console.log(props);
    return <Component {...props} />;
  };
}
