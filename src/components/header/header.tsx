import "./header.css";

export const Header = () => {
  const name = sessionStorage.getItem("name")?.toString();
  const lastname = sessionStorage.getItem("lastname")?.toString();
  const role = sessionStorage.getItem("userRole")?.toString();
  const img = sessionStorage.getItem("img")?.toString();

  return (
    <>
      <header className="header">
        <div className="imgName">
        <img src={img} className="image"></img>
        <div className="data-profile">
          <p>{name}</p>
          <p> {lastname} </p>
        </div>
        </div>
        <p className="cargo">{role}</p>
      </header>
    </>
  );
};
