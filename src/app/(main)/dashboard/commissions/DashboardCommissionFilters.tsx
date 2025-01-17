"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  COMISSION_STATUSES,
  COMMISSION_RECURRENCES,
  COMMISSION_SORT_DATE_OPTIONS,
} from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeFirstWord } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DashboardCommissionFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Controlled state for filters
  const [filters, setFilters] = useState({
    sort: searchParams.get("sort") || COMMISSION_SORT_DATE_OPTIONS[1].value,
    status: searchParams.get("status") || undefined,
    recurring: searchParams.get("recurring") || undefined,
  });

  // Helper function to update search params
  const updateSearchParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`?${params.toString()}`);
  };

  // Clear all search params and reset filters
  const clearAllFilters = () => {
    router.replace(pathname); // Clear search params by navigating to the base pathname
    setFilters({
      sort: "desc",
      status: undefined,
      recurring: undefined,
    }); // Reset filter states
  };

  const handleChange = ({
    key,
    value,
  }: {
    key: string;
    value: string | null;
  }) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    updateSearchParams(key, value);
  };

  return (
    <div className="flex flex-wrap items-end gap-4 relative">
      <div>
        <h3 className="text-sm font-semibold mb-2">Sort by date</h3>
        <Select
          onValueChange={(val) => handleChange({ key: "sort", value: val })}
          value={filters.sort} // Controlled value
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {COMMISSION_SORT_DATE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Status</h3>
        <Select
          onValueChange={(val) => handleChange({ key: "status", value: val })}
          value={filters.status} // Controlled value
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {COMISSION_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {capitalizeFirstWord(status)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Recurring</h3>
        <Select
          onValueChange={(val) =>
            handleChange({ key: "recurring", value: val })
          }
          value={filters.recurring} // Controlled value
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {COMMISSION_RECURRENCES.map((status) => (
                <SelectItem key={status} value={status}>
                  {capitalizeFirstWord(status)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator orientation="vertical" className="w-[1px] h-9" />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              type="button"
              aria-label="Clear Filters"
              onClick={clearAllFilters} // Clear filters on click
            >
              <X />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear Filters</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
