# 레이아웃 컴포넌트 (Layout Components)

- React Context 내의 레이아웃 컴포넌트는 모든 컴포넌트를 구성하는데 초점을 맞춘 특수 컴포넌트이다.

## 레이아웃 컴포넌트의 다양한 예

- 분할 화면 레이아웃 (Split Screen)
  - 여러 구성 요소가 서로 다른 섹션에 배열되는 분할화면 레이아웃이다.
  - 페이지의 데이터를 목록형식으로 표시하면서 목록 및 목록 항목 작업의 복잡성을 검토한다.
- Lists
- Modals

### EX) Side Navigation Componetns

- 일반적인 컴포넌트

  ```jsx
  <NavBar style={...}>
      <h3>Component codes . . . </h3>
  </NavBar>
  ```

- 레이아웃 컴포넌트

  ```jsx
  <LayoutComponent style={...}>
      <SideNavBar/>
  </LayoutComponent>
  ```

이러한 분리를 통해 컴포넌트 논리를 페이지의 특정 배치에서 분리할 수 있어, 더 큰 유연성을 제공한다.
레이아웃 컴포넌트를 사용하는 주요 이점은 개별 컴포넌트, 핵심 콘텐츠 컴포넌트가, 페이지의 구조 내 정확한 위치를 인식하거나 관심을 두지 않아야한다.

### 레이아웃 컴포넌트의 기본 원칙과 목표

- 컴포넌트는 페이지에서의 위치와 독립적으로 작동해야한다.
