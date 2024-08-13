// What do you konw about conditional rendering in React?

const Loading = () => <div>Loading...</div>;
const Main = () => <div>Some content</div>;

const WhatIsConditionalRenderingInReact = () => {
  const isLoading = true;

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  //   or

  //   return isLoading ? <Loading /> : <Main />;
  return <div>{isLoading && <Loading />}</div>;
};

export default WhatIsConditionalRenderingInReact;
