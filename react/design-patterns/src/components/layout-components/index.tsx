// import ScreenSplitter from './screen-splitter/screen-splitter';
import { SideComponent } from './screen-splitter/side-component';
import CleanScreenSplitter from './screen-splitter/clean-screen-splitter';

export default function LayoutComponent() {
  return (
    // <ScreenSplitter Left={LeftComponent} Right={RightComponent} leftWidth={2} rightWidth={1} />
    <CleanScreenSplitter leftWidth={1} rightWidth={2}>
      <SideComponent title="LEFT" />
      <SideComponent title="RIGHT" />
    </CleanScreenSplitter>
  );
}
