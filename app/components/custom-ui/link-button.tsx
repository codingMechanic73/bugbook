import { cn } from "~/lib/utils";
import { Link, LinkProps } from "@remix-run/react";
import { buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";

export interface LinkButtonProps
  extends LinkProps,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

const LinkButton = ({
  className,
  variant,
  size,
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {props.children}
    </Link>
  );
};

export { LinkButton };
