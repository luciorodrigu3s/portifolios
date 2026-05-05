import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'dark' | 'light' | 'accent';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Pill({
  variant = 'dark',
  className = '',
  children,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      className={`pill pill--${variant} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
