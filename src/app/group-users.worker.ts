/// <reference lib="webworker" />

import { CONSTANTS } from './constants';
import { GROUP_OPTIONS } from './models/group-options.model';
import { User } from './models/user.model';

addEventListener('message', ({ data }) => {
  const { users, criterion } = data;

  const groupedUsers = users.reduce(
    (groups: Record<string, User[]>, user: User) => {
      const key: string = getGroupKey(criterion, user);
      if (!groups[key]) groups[key] = [];
      groups[key].push(user);
      return groups;
    },
    {},
  );

  postMessage(groupedUsers);
});

function getGroupKey(criterion: string, user: User): string {
  switch (criterion) {
    case GROUP_OPTIONS[0].key:
      return GROUP_OPTIONS[0].value;
    case GROUP_OPTIONS[1].key:
      return user.firstname?.charAt(0).toUpperCase() || CONSTANTS.UNKNOWN;
    case GROUP_OPTIONS[2].key:
      return user.nat || CONSTANTS.UNKNOWN;
    default:
      return GROUP_OPTIONS[0].value;
  }
}
