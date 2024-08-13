function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

generateError('An error occurred!', 500);

const result = generateError('An error occurred!', 500);
console.log(result);
