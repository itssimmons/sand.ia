import React, { Children, useEffect, useMemo, useRef, type JSX } from 'react';

interface ExperimentalActivityProps
  extends React.HTMLAttributes<HTMLDivElement> {
  mode: 'visible' | 'hidden';
  children: JSX.Element;
}

export default function ExperimentalActivity({
  mode,
  children,
  ...props
}: ExperimentalActivityProps) {
  const containerRef = useRef<HTMLElement>(null);

  // When mode goes hidden → visible toggle, we keep mounted true always
  useEffect(() => {
    // When hiding, we might pause side-effects by signal or by unmount
    // but here we simply rely on CSS to hide and optionally user code to pause.
  }, [mode]);

  const style = useMemo(() => {
    switch (mode) {
      case 'visible':
        return {};
      case 'hidden':
        return {
          display: 'none',
        };
    }
  }, [mode]);

  return Children.map(children, (child, idx) =>
    React.cloneElement(child as React.ReactElement, {
      key: idx,
      // @ts-ignore
      ref: containerRef,
      style: { ...style, ...props.style },
      ...props,
    })
  );
}
