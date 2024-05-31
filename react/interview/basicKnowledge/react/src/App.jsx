import WhatAreFunctionalComponentsAndProps from './WhatAreFunctionalComponentsAndProps';
import WhatAreClassComponentsPropsandState from './WhatAreClassComponentsPropsandState';
import WhatIsAKeyIndexMap from './WhatIsAKeyIndexMap';
import WhatIsReactFragment from './WhatIsReactFragment';
import WhatIsConditionalRenderingInReact from './WhatIsConditionalRenderingInReact';
import HowToApplyStylesInReact from './HowToApplyStylesInReact';
import HowParentChildCommunicationIsWorkingInReact from './HowParentChildCommunicationIsWorkingInReact';

const App = () => {
  return (
    <div>
      <WhatAreFunctionalComponentsAndProps />
      <hr />
      <WhatAreClassComponentsPropsandState />
      <hr />
      <WhatIsAKeyIndexMap />
      <hr />
      <WhatIsReactFragment />
      <hr />
      <WhatIsConditionalRenderingInReact />
      <hr />
      <HowToApplyStylesInReact />
      <hr />
      <HowParentChildCommunicationIsWorkingInReact />
    </div>
  );
};

export default App;
