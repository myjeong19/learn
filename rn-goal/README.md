# React Native

- RN의 본질은 내장된 핵심 컴포넌트를 다루는 것이다.

  - RN에 의해 핵심 컴포넌트가 네이티브 UI요소로 바뀌기 때문에,  
    UI를 구성하는 커스텀 컴포넌트는 핵심 컴포넌트를 합쳐서 만드는 것이다.

- RN에는 CSS가 없다

  - 핵심 컴포넌트의 프로퍼티를 이용해 인라인 스타일(Inline Styles)을 적용하거나, 스타일 시트(StyleSheet) 객체를 사용한다.
  - RN팀이 제공하는 JS 프로퍼티는 CSS 프로퍼티와 비슷하지만, 전체 CSS 중 일부만 지원 된다.

- View 컴포넌트는 div와 거의 똑같지만, 안에 다이렉트로 텍스트를 넣을 수 없다.
  - 텍스트를 넣고 싶을 땐 Text 컴포넌트 안에 넣어야한다.
  - View 컴포넌트는 다른 컴포넌트를 담고 배치하는 컴포넌트다.
  - RN에서 View 컴포넌트는 다른 컴포넌트를 담는데 사용하는 유일한 컨테이너 컴포넌트이다.

## Style

- 스타일 프로퍼티를 사용해, 스타일을 적용할 수 있지만, 모든 요소가 아닌 일부에서만 지원된다.

  ```jsx
  import { StyleSheet, Text, View, Button } from 'react-native';

  export default function App() {
    return (
      <View style={styles.container}>
        <Text>Hello World!!!!</Text>
        <Text style={styles.text}>Hello World!!!!</Text>
        <Button title="Tap me!"></Button>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      marginTop: 20,
      marginBottom: 20,
      borderWidth: 2,
      borderColor: '#000',
      padding: 10,
    },
  });
  ```

## Event

- `onChangeText`를 사용하면 입력 값을 받을 수 있다.

- `onPress`를 사용하면 사용자의 클릭을 감지할 수 있다.

- 상태 관리는 React와 동일하게 동작한다.
