import { PropsWithChildren } from 'react';

type HeaderImages = {
  src: string;
  alt: string;
};

type HeaderProps = PropsWithChildren<{
  image: HeaderImages;
}>;

export default function Header({ children, image }: HeaderProps) {
  return (
    <header>
      <img {...image} />
      <h1>{children}</h1>
    </header>
  );
}

// import { type ReactNode } from 'react';

// type HeaderProps = {
//     image: {src: string, alt: string};
//     children: ReactNode;
// }

// export default function Header({ children, image }: HeaderProps) {
//     return (
//       <header>
//         <img {...image} />
//         <h1>{children}</h1>
//       </header>
//     );
//   }
