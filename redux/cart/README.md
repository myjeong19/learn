# Redux toolkit

- 리듀서는 부수효과가 없다는 점에서 순수하고, 동기화 되어야한다.
  - 즉, 부수효과를 생성하는 코드 혹은 HTTP 요청과 같은 비동기 코드는 리듀서 함수에 들어갈 수 없다.
  - 이 때 사용할 수 있는 선택지는 두 가지가 있다.
    1. 컴포넌트 안에서 실행하는 방법
    2. 액션 생성 함수를 만드는 방법

## useEffect()를 사용한 데이터 패칭시, 발생하는 문제

- 초기 값을 백엔드를 보내, 거기에 저장된 모든 데이터를 덮어쓸 수 있다.

## 액션 생성자 Thunk

- Redux toolkit을 통해 자동으로 작업 크리에이터를 확보할 수 있으며,  
  그것을 불러와 디스패치할 작업 객체를 생성한다.

- 썽크(Thunk)는 다른 작업이 완료 될 때까지 작업을 지연시키는 단순한 함수이다.

  - (작업을 반환하는 다른 함수를 반환 하는 함수)

    - Redux toolkit은 함수를 반환하는 작업 크리에이터도 허용한다.
    - 실제 작업 객체를 디시패치 하기 이전에, 다른 코드를 실행할 수 있다.
    - 아직 리듀서에 도달하지 않았기에, 비동기 코드와 부수 효과를 수행할 수도 있다.

  - 컴포넌트를 린(lean) 상태로 유지할 수 있다.

```jsx
import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCardData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = fetch(
        "https://react-http-6ba6.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!...",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = cart => {
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!...",
      })
    );

    const sendRequeset = async () => {
      const response = await fetch(
        "https://react-http-6ba6.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      // const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequeset();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!...",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      sendCartData().catch(error => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!...",
            message: "Sending cart data failed!",
          })
        );
      });
    }
  };
};
```

```jsx
useEffect(() => {
  dispatch(fetchCardData());
}, [dispatch]);

useEffect(() => {
  if (isInitial) {
    isInitial = false;
    return;
  }

  if (cart.changed) {
    dispatch(sendCartData(cart));
  }
}, [cart, dispatch]);
```
