import { Divider } from "@mui/material";
import "./title.css";

export const dividerStyles = {
    backgroundColor: "var(--divider-color)",
    height: "2px",
    margin: "0 4rem 2rem 4rem",
};

export const Title = ({ title }: { title: string }) => {
	return (
		<>
		<h1 className="titleStyle">{title}</h1>
		<Divider style={dividerStyles} />
		</>
	);
};
