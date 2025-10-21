import { Children, JSX, useMemo } from 'react';

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  bordered?:
    | { left?: boolean; top?: boolean; right?: boolean; bottom?: boolean }
    | boolean;
  nostyle?: boolean;
  direction?: 'horizontal' | 'vertical';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  spacing?: number;
  as?: keyof JSX.IntrinsicElements;
}

export default function List({
  children,
  bordered = false,
  direction = 'horizontal',
  nostyle = false,
  justify,
  spacing = 0,
  as = 'ul',
  className,
  ...props
}: ListProps) {
  const classNameStyle = useMemo(() => {
    return [
      className,
      nostyle || 'flex items-center justify-between px-4 py-2',
      bordered
        ? typeof bordered === 'boolean'
          ? 'border-t border-gray-700'
          : [
              bordered.top ? 'border-t' : null,
              bordered.bottom ? 'border-b' : null,
              bordered.left ? 'border-l' : null,
              bordered.right ? 'border-r' : null,
            ]
              .join(' border-gray-700 ')
              .trim()
        : null,
      direction === 'horizontal' ? 'flex flex-row' : 'flex flex-col',
      justify && 'justify-' + justify,
    ]
      .filter(v => typeof v === 'string' && v.length > 0)
      .join(' ');
  }, [bordered, className, nostyle]);

  const Component = useMemo(() => as, [as]) as React.ElementType;

  return (
    <Component
      className={classNameStyle}
      style={{ gap: `${spacing * 0.25}rem`, ...props.style }}
      {...props}
    >
      {Children.map(children, (child, index) => (
        <li key={index} className='flex justify-center items-center'>
          {child}
        </li>
      ))}
    </Component>
  );
}
