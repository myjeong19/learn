# 제네릭 (Generic) 타입

## 제네릭이란?

- 제네릭 타입은 다른과 연결된 타입으로, 다른 타입이 무엇인지 명시되어 있다.

```ts
const names: string[] = ['Max', 'Manuel'];
// or
const names: Array<string> = ['Max', 'Manuel'];
```

- Promise도 배열 타입처럼 다른 타입과 함께 작동한다

```ts
const promise = new Promise<string>((resolve, reject) => setTimeout(() => resolve('This is done!'), 2000));
```

- 제네릭 타입을 사용하면, 반환 값이 무엇인지 알 수 있게 되어, 반환 타입에 따른 메서드를 사용 할 수 있다.
