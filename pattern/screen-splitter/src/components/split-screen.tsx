import { ReactNode } from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
`;

type PanelProps = {
  flex: number;
};

const Panel = styled.div<PanelProps>`
  flex: ${props => props.flex};
`;

type SplitScreenProps = {
  children: ReactNode[];
  leftWidth?: number;
  rightWidth?: number;
};

export default function SplitScreen({ children, leftWidth = 1, rightWidth = 1 }: SplitScreenProps) {
  const [left, right] = children;

  return (
    <Container>
      <Panel flex={leftWidth}>{left}</Panel>

      <Panel flex={rightWidth}>{right}</Panel>
    </Container>
  );
}
