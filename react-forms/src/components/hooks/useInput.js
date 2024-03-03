import { useState } from 'react';

export const useInput = (defaultValue, validationFn) => {
  // 262-1. 하나의 입력 값 관리
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);
  // 262.다른 필요 조건과 검증 기능을 가진 유동적인 훅이기에, 직접 코딩하여 훅에 넣으면 안됨.
  //     매개변수 validationFn를, valueIsValid에 할당.

  const handleInputChange = event => {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  };

  const handleInputBlur = () => setDidEdit(true);

  // 262-2. 외부에 함수 노출
  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
    // 262-5. hasError 추가, 해당 값이 유효 하지 않을 때 true 반환
  };
};
