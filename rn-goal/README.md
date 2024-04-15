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

## Scroll

- 스크롤을 하기 위해선 `ScrollView`로 명시적으로 지시해야한다.

- 스크롤 가능한 속성은 `ScrollView`에서 제공하지만, 스크롤 가능한 영역은 부모 요소가 결정한다.

  - 이럴 때는 일반적인 `View`를 추가해서, 사용 가능한 높이를 제한한다.

  ```jsx
  <View style={styles.goalsContainer}>
    <ScrollView>
      {couresGoals.map((goal, index) => (
        <View style={styles.goalItem} key={index + goal}>
          <Text style={styles.goalItemText}>{goal}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
  ```

- 스크롤이 가능하고 튀어오르는 효과는 `alwaysBounceVertical`로 제어할 수 있다.

  - 사용 가능 공간을 채울 만한 콘텐츠가 없다면, 튀어오르는 효과는 발생하지 않는다.

- `ScrollView`는 전체 UI가 렌더링 될 때 마다, 내부 요소를 전부 렌더링한다.

  - `ScrollView`는 분량이 제한된 콘텐츠에는 적합하지만, 아주 길어질 수 있는 동적 목록에는 적합하지 않다.  
    이때 `FlatList`를 사용할 수 있다.
  - `FlatList`는 스크롤 가능한 목록에 적용할 수 있으며, 보이는 항목만 렌더링하고 보이지 않는 항목은 사용자 스크롤에 반응해 로딩 및 렌더링한다.

    - `alwaysBounceVertical`는 FlatList에서도 지원하는 속성이다.
    - `data` 속성은 필수 속성으로 목록에서 출력할 데이터를 지정하는 속성이다.
    - `renderItem`은 개별 항목을 렌더링 하는 방법을 FlatList에 지시하는 함수를 값으로 갖는 속성이다.

      - 함수는 자동으로 개별 항목을 매개변수로 받는다.
      - 매개변수는 index 속성에 접근 권한도 제공한다.
        - 매개변수는 item 속성으로 값에 접근 가능하다.

    - `FlatList`에 키를 추가하는 방법 중 하나는 추가할 값을 문자열에서 key속성을 포함한 객체로 바꾸는 것이다.
      `FlatList`는 key 속성을 자동으로 찾아 할당한다.

    ```jsx
    const addGoalHandler = () => {
      setCourseGoals(prevCouresGoals => [
        ...prevCouresGoals,
        { key: Math.random().toString(), text: enteredGoalText },
      ]);
      setEnteredGoalText('');
    };
    ```

    - API에서 데이터를 가져와서 변형할 수 없는 경우, 입력 데이터에 key 속성을 설정한다.
      - `keyExtractor` 속성은 함수를 값으로 취하며,

    ```jsx
    <FlatList
      data={couresGoals}
      renderItem={itemData => {
        return (
          <View style={styles.goalItem}>
            <Text style={styles.goalItemText}>{itemData.item.text}</Text>
          </View>
        );
      }}
      alwaysBounceVertical={false}
      keyExtractor={(item, index) => item.id}
    />
    ```
