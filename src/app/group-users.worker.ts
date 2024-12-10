/// <reference lib="webworker" />

import { User } from './models/user.model';

addEventListener('message', ({ data }) => {
  const { users } = data;

  const groupedUsers = users.reduce(
    (groups: Record<string, User[]>, user: User) => {
      const key = user.firstname?.charAt(0).toUpperCase() || 'Unknown';

      if (!groups[key]) groups[key] = [];
      groups[key].push(user);
      return groups;
    },
    {},
  );

  postMessage(groupedUsers);
});
