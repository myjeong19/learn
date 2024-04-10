# 색상 기법

- 실물의 색을 표본으로 삼으면 거의 훌룡한 결과를 얻을 수 있다.

  - 대부분 자연계는 훌룡한 색 조합을 제공한다.

- 이미지에서 색상을 추출할 때 이미지를 blur 처리해,  
  인접한 픽셀을 평균화해 우리 눈이 인지하는 것과 가까운 색을 얻을 수 있다.

  - 상황에 따라 Layer Blur를 다르게 처리해야 한다.
    - 특히, 작은 대상에서는 덜 흐리게 처리해야한다.

- 색상이 균일하지 않을 때, 밝기와 채도를 조절할 수 있다.

  - 밝기는 말 그대로 색상의 밝기를 의미한다.

    - HSB는 순서대로 색조, 채도, 밝기를 의미한다.
    - 색상을 미세 조정 하기 위해서는 색조는 그대로 유지하고, 채도와 밝기를 조절해야한다.

## 색상 찾기

1. 훔치기

   - dribbble.com
   - coolors.co

   - 목적이 없는 경우 원색을 피하는 것이 좋다.
     - 자연계에서는 원색을 거의 볼 수 없어 피하는 것이 좋다.
     - 원색은 채도와 밝기가 100%인 색을 의미한다.

2. 브랜드 컬러

   - 로고 색상을 사용하는 것이 좋다.