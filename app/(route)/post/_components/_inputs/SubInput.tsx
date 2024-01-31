import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import GiftTag from "@/components/GiftTag";
import InputText from "@/components/input/InputText";
import { PostType } from "../../page";

const SNS_TYPE_LIST = ["트위터", "인스타그램", "유튜브", "기타"];
const GIFT_LIST = ["컵홀더", "포토카드", "엽서", "티켓", "포스터", "스티커", "굿즈", "기타"];

const SubInput = () => {
  const {
    formState: { defaultValues },
    watch,
    getValues,
    setValue,
  } = useFormContext<PostType>();
  const [snsType, setSnsType] = useState(getValues("snsType"));
  const [giftList, setGiftList] = useState<string[]>(getValues("gift"));
  const { snsId, eventUrl } = watch();

  const handleRadioChange = (event: any) => {
    setSnsType(event.target.value);
  };

  const handleGiftClick = (gift: any) => {
    if (giftList.includes(gift)) return setGiftList((prev) => prev.filter((item) => item !== gift));
    setGiftList((prev) => [...prev, gift]);
  };

  useEffect(() => {
    setValue("gift", giftList);
  }, [giftList]);

  useEffect(() => {
    setValue("snsType", snsType);
  }, [snsType]);

  return (
    <>
      <div>
        <InputText name="snsId" placeholder="SNS 아이디 입력" isEdit={defaultValues?.snsId !== snsId}>
          주최자
        </InputText>
        {SNS_TYPE_LIST.map((type) => (
          <label key={type}>
            <input name="sns" value={type} type="radio" onChange={handleRadioChange} checked={snsType === type} />
            {type}
          </label>
        ))}
        <InputText name="eventUrl" placeholder="URL 입력" isEdit={defaultValues?.eventUrl !== eventUrl}>
          행사 링크
        </InputText>
        <label>
          특전
          {GIFT_LIST.map((gift) => (
            <GiftTag key={gift} handleClick={handleGiftClick} initialChecked={giftList.includes(gift)}>
              {gift}
            </GiftTag>
          ))}
        </label>
      </div>
      <InputText name="gift" hidden />
      <InputText name="snsType" hidden />
    </>
  );
};

export default SubInput;