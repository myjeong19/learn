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

type ScreenSplitterProps = {
  Left: () => React.ReactElement;
  Right: () => React.ReactElement;
  leftWidth: number;
  rightWidth: number;
};

export default function ScreenSplitter(props: ScreenSplitterProps) {
  const { Left, Right, leftWidth = 1, rightWidth = 1 } = props;

  return (
    <Container>
      <Panel flex={leftWidth}>
        <Left />
      </Panel>
      <Panel flex={rightWidth}>
        <Right />
      </Panel>
    </Container>
  );
}
