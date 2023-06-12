import Header from "./components/Header";
import Game from "./components/Games/Game";
import { StateProvider } from "./store/GeneralContex";

export default function Home() {
  return (
    <StateProvider>
      <div className="m-2 p-2 mx-auto ">
        <Header />
        <Game />

        {/* <Footer /> */}

      </div>
    </StateProvider>
  );
}


