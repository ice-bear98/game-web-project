import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";
import "./index.css";

async function enableMocking() {
    if (process.env.NODE_ENV !== "development") {
        return;
    }

    const { worker } = await import("./mocks/browser.ts");

    return worker.start();
}

enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <RecoilRoot>
            {/* <React.StrictMode> */}
            <App />
            {/* </React.StrictMode> */}
        </RecoilRoot>
    );
});
