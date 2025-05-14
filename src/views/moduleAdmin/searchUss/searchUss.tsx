import { ProfileCard } from "../../../components/profileCard/profileCard"
import "./searchUss.css"

export const SearchUser = () => {

      return (
        <div className="search-page">
          <ProfileCard profileId={Number(sessionStorage.getItem("userId"))} work={sessionStorage.getItem("userRole") || ""}></ProfileCard>
          <ProfileCard profileId={Number(sessionStorage.getItem("userId"))} work={sessionStorage.getItem("userRole") || ""}></ProfileCard>
        </div>
    )

}