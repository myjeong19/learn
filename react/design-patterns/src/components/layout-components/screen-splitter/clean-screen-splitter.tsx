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
  children: [React.ReactElement, React.ReactElement];
  leftWidth: number;
  rightWidth: number;
};

export default function CleanScreenSplitter(props: ScreenSplitterProps) {
  const { children, leftWidth = 1, rightWidth = 1 } = props;

  const [left, right] = children;

  return (
    <Container>
      <Panel flex={leftWidth}>{left}</Panel>
      <Panel flex={rightWidth}>{right} </Panel>
    </Container>
  );
}
