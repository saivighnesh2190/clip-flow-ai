import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none transition-all duration-200 overflow-hidden shadow-xs",
  {
    variants: {
      variant: {
        default:
          "border-white/20 bg-primary/90 text-primary-foreground backdrop-blur-md",
        secondary:
          "border-white/10 bg-secondary/80 text-secondary-foreground backdrop-blur-md",
        destructive:
          "border-rose-500/20 bg-rose-500/10 text-rose-500 backdrop-blur-md",
        outline:
          "apple-glass-pill text-foreground",
        jade:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 backdrop-blur-md",
        gold:
          "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 backdrop-blur-md",
        rose:
          "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400 backdrop-blur-md",
        blue:
          "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 backdrop-blur-md",
        glass:
          "apple-glass-pill text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
