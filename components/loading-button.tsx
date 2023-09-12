import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type LoadingButtonProps = {
  isLoading?: boolean;
  children?: JSX.Element | string;
  className?: string;
  onClick?: () => void;
  size?: "sm" | "lg" | "default" | "icon" | null | undefined;
  disabled?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
};

export function LoadingButton({
  isLoading,
  children,
  className,
  variant,
  size,
  disabled,
  onClick,
}: LoadingButtonProps) {
  return (
    <Button
      size={size}
      variant={variant}
      className={`${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}

      {children}
    </Button>
  );
}
