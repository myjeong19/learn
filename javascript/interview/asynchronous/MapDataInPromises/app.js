// You have 2 functions which return promises. Map data from users and userStatuses to get array of users with id, name, isActive

const users = [
  {
    id: 1,
    name: 'Jack',
  },
  {
    id: 2,
    name: 'John',
  },
  {
    id: 3,
    name: 'Mike',
  },
];
const userStatuses = [
  {
    id: 1,
    isActive: true,
  },
  {
    id: 2,
    isActive: true,
  },
  {
    id: 3,
    isActive: false,
  },
];

const getUsers = () => {
  return new Promise(resolve => {
    resolve(users);
  });
};

const getUserStatuses = () => {
  return new Promise(resolve => {
    resolve(userStatuses);
  });
};

// solution 1
// getUsers().then(users =>
//   getUserStatuses().then(useStatuses => {
//     const mapppedUsers = users.map(user => {
//       const isActive = useStatuses.find(userStatus => userStatus.id === user.id).isActive;
//       return { ...user, isActive };
//     });
//     console.log('mappedUsers', mapppedUsers);
//   })
// );

// mappedUsers [{ id: 1, name: 'Jack', isActive: true }, { id: 2, name: 'John', isActive: true }, { id: 3, name: 'Mike', isActive: false }]

// solution 2
// Promise.all([getUsers(), getUserStatuses()]).then(([users, userStatuses]) => {
//   const mapppedUsers = users.map(user => {
//     const isActive = userStatuses.find(userStatus => userStatus.id === user.id).isActive;
//     return { ...user, isActive };
//   });
//   console.log('mappedUsers', mapppedUsers);
// });

// const mapUsers = (users, userStatuses) =>
//   users.map(user => {
//     const isActive = userStatuses.find(userStatus => userStatus.id === user.id).isActive;
//     return { ...user, isActive };
//   });

// Promise.all([getUsers(), getUserStatuses()])
//   .then(([users, userStatuses]) => mapUsers(users, userStatuses))
//   .then(mappedUsers => console.log('mappedUsers', mappedUsers));

const getMappedUsers = async () => {
  try {
    const users = await getUsers();
    const userStatuses = await getUserStatuses();

    const mappedUsers = users.map(user => {
      const isActive = userStatuses.find(userStatus => userStatus.id === user.id).isActive;
      return { ...user, isActive };
    });

    console.log('mappedUsers', mappedUsers);
  } catch (error) {
    console.log('error', error);
  }
};

getMappedUsers();
