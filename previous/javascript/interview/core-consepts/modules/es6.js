export const getName = name => name;
export const getSurName = surname => surname;
export default (name, surname) => `${getName(name)} ${getSurName(surname)}`;

// ES6 모듈은 브라우저에서 사용된다.
