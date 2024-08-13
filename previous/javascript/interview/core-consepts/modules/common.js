// ERROR
// module.exports.getName = name => name;
// module.exports.getSurName = surname => surname;

const getName = name => name;
const getSurName = surname => surname;

module.exports.getName = getName;
module.exports.getSurName = getSurName;
module.exports.getFullname = (name, surname) => `${getName(name)} ${getSurName(surname)}`;

// CommonJS 모듈은 노드 내부에서 사용된다.
