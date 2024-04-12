const names: string[] | number = ['Max', 'Manuel'];

const promise = new Promise<string>((resolve, reject) => setTimeout(() => resolve('This is done!'), 2000));
