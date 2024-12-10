/// <reference lib="webworker" />

import { User } from './models/user.model';

addEventListener('message', ({ data }) => {
  const { users, criterion } = data;

  const groupedUsers = users.reduce(
    (groups: Record<string, User[]>, user: User) => {
      const key =
        criterion === 'alphabetical'
          ? user.firstname?.charAt(0).toUpperCase() || 'Unknown'
          : user.nat || 'Unknown';

      if (!groups[key]) groups[key] = [];
      groups[key].push(user);
      return groups;
    },
    {},
  );

  postMessage(groupedUsers);
});
