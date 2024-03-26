const person = {
  name: "Jack",
  age: 32,
  hobbies: ["Sports", "Cooking"],
};

// 문자열 배열
let favoriteActivities: string[];
let favoriteActivities2: any[];

for (const hobby of person.hobbies) {
  console.log(hobby.toString());
}
