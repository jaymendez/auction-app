import type { DetailedHTMLProps, LabelHTMLAttributes } from "react";

const Label = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>) => (
  <label
    className={`${className} flex text-sm font-medium text-slate-900 dark:text-slate-100`}
    {...props}
  >
    {children}
  </label>
);

export default Label;
