import "./App.css";
import { ProfileImgProvider } from "./context/contextImg";
import { LoaderProvider } from "./context/loader/useLoader";
import { ToastProvider } from "./context/toast/useToast";
import { AppRouter } from "./routes";

function App() {
  return (
    <>
		<ToastProvider>
			<LoaderProvider>
			<ProfileImgProvider>
				<AppRouter />
			</ProfileImgProvider>
			</LoaderProvider>
		</ToastProvider>
    </>
  );
}

export default App;
