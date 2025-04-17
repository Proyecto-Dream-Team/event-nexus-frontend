import { ButtonApp } from "../buttons/button";
import FlipCameraIosOutlinedIcon from "@mui/icons-material/FlipCameraIosOutlined";
import "./profileImg.css";
import { useState } from "react";
import { useProfileImg } from "../../context/contextImg";

interface PropsImg {
  change: (img: string) => void;
}

export const ProfileImg = ({ change }: PropsImg) => {
  
  const { img, setImg } = useProfileImg();
  const [previewImg, setPreviewImg] = useState<string>("");
  
  const [confirm, setConfirm] = useState(false);
  const [visible, setVisible] = useState(false);

  const preview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImg(reader.result as string); /* metodo preview para ver como qeda */
      };
      reader.readAsDataURL(file);
    }
  };

  const open = () => {
    setVisible(true);
    setConfirm(true);
  };

  const cancel = () => {
    setConfirm(false);
    setPreviewImg("");
    setTimeout(() => setVisible(false), 300);
  };

  const confirmation = () => {
    if (previewImg) {
      setImg(previewImg); 
      change(previewImg); 
      cancel();
    }
  };

  return (
    <div className="containerImg">
      <div className="profileImg">
        <img className="imgProfile" src={previewImg || img } alt="" />
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
          onClick={open}
          onChange={preview} // <-- clave para la preview
        />
      </div>

      {visible && (
        <div
          className={`containerButtonsImg ${confirm ? "fade-in" : "fade-out"}`}
        >
          <ButtonApp label="Cancelar" method={cancel} isCancel={true} />
          <ButtonApp label="Guardar" method={confirmation} isCancel={false} />
        </div>
      )}
    </div>
  );
};
