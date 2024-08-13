const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: "Jack",
  age: 32,
  hobbies: ["Sports", "Cooking"],
  role: [2, "author"],
};

person.role.push("admin");

console.log(person.role);
