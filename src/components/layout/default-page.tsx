import Balance from "react-wrap-balancer";

import { cn } from "@/lib/utils";

interface DefaultPageProps {
  title: string;
  description: string;
  padding?: string;
  className?: string;
  children: React.ReactNode;
}

export const DefaultPage = ({
  title,
  description,
  padding,
  className,
  children,
}: DefaultPageProps) => {
  return (
    <>
      <div className={cn("flex h-full flex-col items-center gap-4 px-4 py-6 sm:px-6 sm:py-8 md:py-12 md:pb-8 lg:py-18", padding)}>
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.1]">
          {title}
        </h1>

        <Balance className="max-w-3xl text-base text-muted-foreground sm:text-lg md:text-xl text-center">
          {description}
        </Balance>

        <section className={className}>
          {children}
        </section>
      </div>
    </>
  );
}