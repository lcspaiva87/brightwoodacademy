import * as React from "react";
import { cn } from "@/app/utils/utils";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label: React.FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label
      className={cn("block text-sm font-medium text-gray-700 mb-1", className)}
      {...props}
    >
      {children}
    </label>
  );
};

export { Label };