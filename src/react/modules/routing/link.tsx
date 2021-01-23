import * as React from 'react';
import { useRouter } from './context';

export interface LinkProps extends React.ComponentPropsWithoutRef<'a'> {
  to: string;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, href = to, onClick, ...props }, ref) => {
    const router = useRouter();

    return (
      <a
        href={href}
        onClick={(ev) => {
          ev.preventDefault();
          router.navigateByUrl(href);
          if (onClick) {
            onClick(ev);
          }
        }}
        {...props}
        ref={ref}
      />
    );
  }
);
