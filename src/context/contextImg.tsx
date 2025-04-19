import { createContext, useContext, useState } from "react";

type ProfileImgContext = {
  img: string;
  setImg: (img: string) => void;
};

const ProfileImgContext = createContext<ProfileImgContext>({
  img: "",
  setImg: () => {},
});

export const useProfileImg = () => useContext(ProfileImgContext);

export const ProfileImgProvider = ({children,}: {children: React.ReactNode;}) => {
  const [img, setImg] = useState(sessionStorage.getItem("img") || "");

  const updateImg = (newImg: string) => {
    sessionStorage.setItem("img", newImg);
    setImg(newImg);
  };

  return (
    <ProfileImgContext.Provider value={{ img, setImg: updateImg }}>
      {children}
    </ProfileImgContext.Provider>
  );
};
