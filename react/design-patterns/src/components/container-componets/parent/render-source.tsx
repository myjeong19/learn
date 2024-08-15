import { useState, useEffect } from 'react';
import { type ComponentProps } from './data-source';

type RenderSourceProps = {
  getData: () => Promise<any>;
  render: (resource: ComponentProps) => React.ReactElement;
};

export default function RenderSource(props: RenderSourceProps) {
  const { getData, render } = props;

  const [resource, setResource] = useState(null);

  useEffect(() => {
    (async function () {
      const data = await getData();
      setResource(data);
    })();
  }, [getData]);

  return render(resource);
}
