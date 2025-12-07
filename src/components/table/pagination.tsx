"use client"

import { useCallback, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { useLang } from "@/lib/language/components/language-provider";

import { 
  Pagination, 
  PaginationContent,
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationFirst,
  PaginationLast
} from "@/components/ui/pagination";

interface TablePaginationProps {
  actualPage: number;
  totalPages: number;
  className?: string;
}

export const TablePagination = ({ 
  actualPage,
  totalPages,
  className
}: TablePaginationProps) => {

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dictionary = useLang().dictionary.pagination;

  useEffect(() => {
    const param = searchParams.get("page"); 
    if (param === actualPage.toString() || (actualPage == 1 && !param)) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", actualPage.toString());
    window.history.replaceState({}, "", `${pathname}?${params.toString()}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createQueryString = useCallback(
    (page: number) => {
      const newParams = new URLSearchParams(searchParams.toString())
      newParams.set('page', page.toString())
 
      return newParams.toString()
    },
    [searchParams]
  )

  if (totalPages <= 1 ) return null;

  const maxPagesToShow = 10;
  let startPage = Math.max(1, actualPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst
            className={actualPage <= 1 ? "hover:!cursor-default" : ""}
            disabled={actualPage <= 1}
            href={actualPage <= 1 ? undefined : `${pathname}?${createQueryString(1)}`}
            scroll={actualPage <= 1 ? undefined : false}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious 
            text={dictionary.previous}
            className={actualPage <= 1 ? "hover:!cursor-default" : ""}
            disabled={actualPage <= 1}
            href={actualPage <= 1 ? undefined : `${pathname}?${createQueryString(actualPage - 1)}`} 
            scroll={actualPage <= 1 ? undefined : false}
          />
        </PaginationItem>
        
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink 
              href={`${pathname}?${createQueryString(page)}`} 
              isActive={actualPage === page}
              scroll={false}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext 
            text={dictionary.next}
            className={actualPage >= totalPages ? "hover:!cursor-default" : "" }
            disabled={actualPage >= totalPages}
            href={actualPage >= totalPages ? undefined : `${pathname}?${createQueryString(actualPage + 1)}`} 
            scroll={actualPage >= totalPages ? undefined : false}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            className={actualPage >= totalPages ? "hover:!cursor-default" : "" }
            disabled={actualPage >= totalPages}
            href={actualPage >= totalPages ? undefined : `${pathname}?${createQueryString(totalPages)}`}
            scroll={actualPage >= totalPages ? undefined : false}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}