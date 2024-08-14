type SideComponentProps = {
  title: string;
};

export function SideComponent(props: SideComponentProps) {
  const { title } = props;

  return <h2>{title}</h2>;
}

export function LeftComponent() {
  return <SideComponent title="Left" />;
}

export function RightComponent() {
  return <SideComponent title="Right" />;
}
