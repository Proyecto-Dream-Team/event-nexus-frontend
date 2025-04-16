import { ButtonApp } from "../buttons/button";
import FlipCameraIosOutlinedIcon from "@mui/icons-material/FlipCameraIosOutlined";
import "./profileImg.css";
import { useState } from "react";

export const ProfileImg = () => {
  const img = sessionStorage.getItem("img");
  const [confirm, setConfirm] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleCancel = () => {
    setConfirm(false); // dispara fade-out
    setTimeout(() => setVisible(false), 300);
  };

  const handleOpen = () => {
      setVisible(true); // lo monta
      setConfirm(true); // le da tiempo a aplicarse la clase fade-in
  };

  return (
    <div className="containerImg">
      <div className="profileImg">
        <img className="imgProfile" src={`${img}`} alt="" />
        <label htmlFor="fileUpload" className="customUploadLabel">
          <FlipCameraIosOutlinedIcon
            style={{ fontSize: "2.5rem", fill: "black" }}
          />
        </label>
        <input
          className="inputImgProfile"
          type="file"
          id="fileUpload"
          accept="image/*"
          style={{ display: "none" }}
          onClick={handleOpen}
        />
      </div>
      {visible && (
        <div
          className={`containerButtonsImg ${confirm ? "fade-in" : "fade-out"}`}
        >
          <ButtonApp label="Cancelar" method={handleCancel} isCancel={true} />
          <ButtonApp label="Guardar" method={() => {}} isCancel={false} />
        </div>
      )}
    </div>
  );
};
