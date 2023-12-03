import classNames from 'classnames';
import { ReactNode } from 'react';

export interface panelProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
  className?: string;
}

function Panel({ children, className, ...rest }:panelProps) {
  const finalClassNames = classNames(
    'border rounded p-3 shadow bg-white w-full',
    className
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}

export default Panel;
