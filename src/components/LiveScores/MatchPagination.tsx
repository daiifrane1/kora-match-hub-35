
import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface MatchPaginationProps {
  activeTab: string;
  isLoading: boolean;
}

const MatchPagination: React.FC<MatchPaginationProps> = ({ activeTab, isLoading }) => {
  if (activeTab === "live" || isLoading) {
    return null;
  }

  return (
    <div className="mt-6 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" className="rtl:rotate-180" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" className="rtl:rotate-180" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MatchPagination;
