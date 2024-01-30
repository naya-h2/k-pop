import { EventCardProps } from "@/types/index";
import Chip from "./Chip";

const HorizontalEventCard = ({ placeName, artistName, eventType, address, startDate, endDate, gifts }: EventCardProps) => {
  // "2024-" 부분을 제외하고 날짜를 보여주기 위해 Date 객체 사용
  const formattedStartDate = new Date(startDate).toLocaleDateString(undefined, { month: "2-digit", day: "2-digit" });
  const formattedEndDate = new Date(endDate).toLocaleDateString(undefined, { month: "2-digit", day: "2-digit" });

  return (
    <div className="flex w-320 items-center gap-12 self-stretch border-b border-solid border-[#E0E2E6] py-12">
      <div className="h-112 w-84 bg-[#e7e7e7]" />
      <div className="flex flex-col gap-4">
        <p>{placeName}</p>
        <div className="flex items-center gap-8">
          <p>{artistName}</p>
          <Chip chipName={eventType} />
        </div>
        <div className="flex">
          <p className="border-r border-solid border-black pr-4">
            {formattedStartDate} ~ {formattedEndDate}
          </p>
          <p className="pl-4">{address}</p>
        </div>
        <div className="flex gap-4">
          {gifts?.map((gift, index) => (
            <div key={index}>
              <Chip chipName={gift} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalEventCard;
