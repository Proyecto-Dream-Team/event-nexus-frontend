import { ButtonApp } from "../buttons/button";
import FlipCameraIosOutlinedIcon from "@mui/icons-material/FlipCameraIosOutlined";
import "./profileImg.css";
import { useState } from "react";

export const ProfileImg = () => {

    const img = sessionStorage.getItem("img");
    const [confirm, setConfirm] = useState(false);

    return(

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
            onClick={() => setConfirm(true)}
          />
        </div>
        {confirm && (
          <div
            className={`containerButtonsImg ${confirm ? "fade-in" : "fade-out"}`}
          >
            <ButtonApp
              label={"Cancelar"}
              method={() => setConfirm(false)}
              isCancel={true}
            ></ButtonApp>
            <ButtonApp
              label={"Guardar"}
              method={function (): void {
                throw new Error("Function not implemented.");
              }}
              isCancel={false}
            ></ButtonApp>
          </div>
        )}
      </div>

    )


}