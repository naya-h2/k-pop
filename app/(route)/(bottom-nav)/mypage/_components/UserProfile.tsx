"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MyPageBottomSheet from "@/components/bottom-sheet/MyPageBottomSheet";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { Session, useSession } from "@/store/session/cookies";

interface Props {
  session: Session;
}

const UserProfile = ({ session: init }: Props) => {
  const { bottomSheet, openBottomSheet, closeBottomSheet, refs } = useBottomSheet();

  const [session, setSession] = useState(init);
  useEffect(() => {
    const session = useSession();
    if (session) {
      setSession(session);
    }
  }, []);

  return (
    <div className="flex items-center justify-between px-20 pt-48">
      <div className="flex items-center gap-12">
        <Image
          src={session.user.profileImage ? session.user.profileImage : "/icon/no-profile.svg"}
          alt={`${session.user.nickName}님의 프로필 사진`}
          width={56}
          height={56}
          className="h-56 w-56 rounded-full object-cover"
          priority
        />
        <div className="flex flex-col gap-4">
          <p className="text-16 font-600">{session.user.nickName}</p>
          {/* <p className="font-12 font-500 text-gray-400">{session.email}</p> */}
        </div>
      </div>
      <button onClick={() => openBottomSheet("mypage")}>
        <Image src="/icon/kebab-black.svg" width={24} height={25} alt="계정 정보 수정" />
      </button>
      {bottomSheet === "mypage" && <MyPageBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} />}
    </div>
  );
};

export default UserProfile;
