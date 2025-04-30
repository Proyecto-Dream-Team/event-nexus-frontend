import "./App.css";
import { ProfileImgProvider } from "./context/contextImg";
import { LoaderProvider } from "./context/loader/useLoader";
import { AppRouter } from "./routes";

function App() {
  return (
    <>
      <LoaderProvider>
        <ProfileImgProvider>
          <AppRouter />
        </ProfileImgProvider>
      </LoaderProvider>
    </>
  );
}

export default App;
