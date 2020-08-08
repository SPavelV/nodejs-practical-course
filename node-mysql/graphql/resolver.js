const users = [
  { name: "Igor", age: 30, email: "igor@email.ru" },
  { name: "Elena", age: 23, email: "elen@email.ru" },
];

module.exports = {
  test() {
    return {
      count: Math.trunc(Math.random() * 10),
      users,
    };
  },
  random({ min, max, count }) {
    const arr = [];
    for (let index = 0; index < count; index++) {
      const random = Math.random() * (max - min) + min;
      arr.push(random);
    }

    return arr;
  },
  addTestUser({ user: {name, email} }) {
    const user = {
      name,
      email,
      age: Math.ceil(Math.random() * 30),
    };
    users.push(user);

    return user;
  },
};
