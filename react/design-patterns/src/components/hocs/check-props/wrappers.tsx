import { includeUser } from './include-user';
import { logProps } from './log-props';
import UserInfo from './user-info';

export const UserInfoWrapper = logProps(UserInfo);

export const UserIncludeWrapper = includeUser(UserInfo, 1);
