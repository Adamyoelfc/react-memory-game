import StateContext from "../store/GeneralContex";
import { useContext } from "react";

const Header = () => {
  const { health } = useContext(StateContext);
  return (
    <div className="flex justify-between mx-10">
      <h1
        style={{ fontFamily: "'Love Ya Like A Sister', cursive" }}
        className="text-6xl md:text-9xl"
      >
        Memory Game
      </h1>
      <div className="flex">
        <h1
          style={{ fontFamily: "'Love Ya Like A Sister', cursive" }}
          className="text-3xl md:text-6xl my-auto"
        >
          health :
        </h1>
        <h1
          style={{ fontFamily: "'Love Ya Like A Sister', cursive" }}
          className="text-3xl md:text-6xl ml-3 my-auto"
        >
          {health}
        </h1>
        <h1 className="text-2xl my-auto ml-2 text-gray-200">❤️</h1>
      </div>
    </div>
  );
};

export default Header;
