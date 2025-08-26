import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";


type Props = {
    href: string;
    label: string;
    isActive?: boolean
}
export const NavButton = ({
  href,
  label,
  isActive,
}: Props) => {
  return (
    <Button
    asChild
    size="sm"
    variant="outline"
    className={cn(
      "w-full lg:w-auto justify-between font-normal hover:bg-neutral-100/20 dark:hover:bg-white/20 hover:text-neutral-900 dark:hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-neutral-900 dark:text-white focus:bg-neutral-100/30 dark:focus:bg-white/30 transition",
      isActive ? "bg-neutral-100/20 dark:bg-white/10 text-neutral-900 dark:text-white" : "bg-transparent"
    )}
    >
      <Link href={href}>
      {label}
      </Link>
    </Button>
  )
}
