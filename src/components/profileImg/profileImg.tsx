import { ButtonApp } from "../buttons/button";
import FlipCameraIosOutlinedIcon from "@mui/icons-material/FlipCameraIosOutlined";
import "./profileImg.css";
import { useState } from "react";
import { useProfileImg } from "../../context/contextImg";
import { cloudinaryService } from "../../services/cloudService";

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
            setPreviewImg(
            reader.result as string
            ); /* metodo preview para ver como qeda */
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

    const confirmation = async () => {
        if (previewImg) {
        const data = new FormData();
        const blob = await fetch(previewImg).then((res) => res.blob());
        data.append("file", blob);
        data.append("upload_preset", cloudinaryService.uploadPreset);

        try {
            const response = await cloudinaryService.uploadImage(data);
            const newImgUrl = response.secure_url;

            setImg(newImgUrl);
            change(newImgUrl);
            cancel();
        } catch (error) {
            console.error("Error uploading image:", error);
        }
        }
    };

    return (
        <div className="containerImg">
        <div className="profileImg">
            <img className="imgProfile" src={previewImg || img} alt="" />
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
