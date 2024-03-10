import dynamic from "next/dynamic";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { createQueryString } from "@/utils/handleQueryString";
import { GiftType } from "@/types/index";
import { BIG_REGIONS } from "@/constants/regions";

const BigRegionBottomSheet = dynamic(() => import("@/components/bottom-sheet/BigRegionBottomSheet"), { ssr: false });
const CalenderBottomSheet = dynamic(() => import("@/components/bottom-sheet/CalendarBottomSheet"), { ssr: false });
const GiftBottomSheet = dynamic(() => import("@/components/bottom-sheet/GiftsBottomSheet"), { ssr: false });
const SmallRegionBottomSheet = dynamic(() => import("@/components/bottom-sheet/SmallRegionBottomSheet"), { ssr: false });

const useSearch = () => {
  const searchParams = useSearchParams();
  const initialValue = getInitialQuery(searchParams);

  const [keyword, setKeyword] = useState(initialValue.keyword);
  const [sort, setSort] = useState<SortType>(initialValue.sort);

  const handleSort = {
    recent: () => {
      setSort("최신순");
    },
    popular: () => {
      setSort("인기순");
    },
  };

  const [filter, setFilter] = useState<FilterType>({
    bigRegion: initialValue.bigRegion,
    smallRegion: initialValue.smallRegion,
    startDate: initialValue.startDate,
    endDate: initialValue.endDate,
    gifts: initialValue.gifts,
  });

  const setBigRegionFilter = (bigRegion: (typeof BIG_REGIONS)[number] | "") => {
    if (bigRegion === "") {
      setFilter((prev) => ({ ...prev, bigRegion }));
      setFilter((prev) => ({ ...prev, smallRegion: "" }));
      return;
    }
    setFilter((prev) => ({ ...prev, bigRegion }));
    setFilter((prev) => ({ ...prev, smallRegion: "전지역" }));
  };
  const setSmallRegionFilter = (smallRegion: string) => {
    setFilter((prev) => ({ ...prev, smallRegion }));
  };
  const setStartDateFilter = (startDate: string) => {
    setFilter((prev) => ({ ...prev, startDate }));
  };
  const setEndDateFilter = (endDate: string) => {
    setFilter((prev) => ({ ...prev, endDate }));
  };
  const setGiftsFilter = (gift: GiftType) => {
    if (filter.gifts.includes(gift)) {
      setFilter((prev) => {
        const newGift = prev.gifts.filter((currGift) => currGift !== gift);
        return { ...prev, gifts: newGift };
      });
    } else {
      setFilter((prev) => ({ ...prev, gifts: [...prev.gifts, gift] }));
    }
  };

  const resetFilter = () => {
    setKeyword("");
    setSort("최신순");
    setFilter({ bigRegion: "", smallRegion: "", startDate: null, endDate: null, gifts: [] });
  };

  const { bottomSheet, openBottomSheet, closeBottomSheet, refs } = useBottomSheet();

  const openSearchBottomSheet = {
    bigRegion: () => {
      openBottomSheet(BOTTOM_SHEET.bigRegion);
    },
    smallRegion: () => {
      openBottomSheet(BOTTOM_SHEET.smallRegion);
    },
    calender: () => {
      openBottomSheet(BOTTOM_SHEET.calender);
    },
    gift: () => {
      openBottomSheet(BOTTOM_SHEET.gift);
    },
  };

  const SearchBottomSheet = () => {
    return (
      <>
        {bottomSheet === BOTTOM_SHEET.bigRegion && <BigRegionBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} setBigRegionFilter={setBigRegionFilter} />}
        {bottomSheet === BOTTOM_SHEET.smallRegion && (
          <SmallRegionBottomSheet
            closeBottomSheet={closeBottomSheet}
            refs={refs}
            bigRegion={filter.bigRegion as (typeof BIG_REGIONS)[number]}
            setSmallRegionFilter={setSmallRegionFilter}
          />
        )}
        {bottomSheet === BOTTOM_SHEET.calender && (
          <CalenderBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} setStartDateFilter={setStartDateFilter} setEndDateFilter={setEndDateFilter} />
        )}
        {bottomSheet === BOTTOM_SHEET.gift && <GiftBottomSheet refs={refs} closeBottomSheet={closeBottomSheet} setGiftsFilter={setGiftsFilter} selected={filter.gifts} />}
      </>
    );
  };

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initialValue = getInitialQuery(searchParams);
    setKeyword(initialValue.keyword);
    setSort(initialValue.sort);
    setFilter({
      bigRegion: initialValue.bigRegion,
      smallRegion: initialValue.smallRegion,
      startDate: initialValue.startDate,
      endDate: initialValue.endDate,
      gifts: initialValue.gifts,
    });
  }, [searchParams]);

  useEffect(() => {
    const newQuery = createQueryString({ keyword, sort, ...filter }, searchParams);
    router.push(pathname + "?" + newQuery);
  }, [keyword, sort, filter]);

  return { keyword, setKeyword, sort, handleSort, filter, resetFilter, openSearchBottomSheet, SearchBottomSheet };
};

export default useSearch;

export type SortType = "최신순" | "인기순";

export interface FilterType {
  bigRegion: (typeof BIG_REGIONS)[number] | "";
  smallRegion: string;
  startDate: string | null;
  endDate: string | null;
  gifts: GiftType[];
}

const SORT = ["최신순", "인기순"] as const;

const BOTTOM_SHEET = {
  bigRegion: "big-region_bottom-sheet",
  smallRegion: "small-region_bottom-sheet",
  calender: "calender_bottom-sheet",
  gift: "gift_bottom-sheet",
};

const getInitialQuery = (searchParams: ReadonlyURLSearchParams) => {
  const keyword = searchParams.get("keyword") ?? "";
  const sort = (SORT as ReadonlyArray<string>).includes(searchParams.get("sort") ?? "") ? (searchParams.get("sort") as SortType) : SORT[0];
  const bigRegion = (BIG_REGIONS as ReadonlyArray<string>).includes(searchParams.get("bigRegion") ?? "")
    ? (searchParams.get("bigRegion") as (typeof BIG_REGIONS)[number] | "")
    : "";
  const smallRegion = searchParams.get("smallRegion") ?? "";
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const gifts = (searchParams.get("gifts")?.split("|") as GiftType[]) ?? [];

  return { keyword, sort, bigRegion, smallRegion, startDate, endDate, gifts };
};
