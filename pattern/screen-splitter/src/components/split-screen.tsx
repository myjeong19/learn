import { ReactNode } from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const Panel = styled.div`
  flex: 1;
`;

type SplitScreenProps = {
  Left: () => ReactNode;
  Right: () => ReactNode;
};

export default function SplitScreen({ Left, Right }: SplitScreenProps) {
  return (
    <Container>
      <Panel>
        <Left />
      </Panel>
      <Panel>
        <Right />
      </Panel>
    </Container>
  );
}
