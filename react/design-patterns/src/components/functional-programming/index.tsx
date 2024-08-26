import { GreenSmallButton, RedButton } from './compositions/button';
import { BlueButton } from './partial/partial';

export default function FunctionalProgramming() {
  return (
    <>
      {/* <ParentRecursive /> */}
      <RedButton text="i am Red!" />
      <GreenSmallButton text="i am Green!" />
      <BlueButton text="i am Blue" />
    </>
  );
}
