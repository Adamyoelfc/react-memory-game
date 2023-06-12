import { useState } from "react";
import ReactCardFlip from "react-card-flip";

const Imagen = (props) => {
  const [flipped, setFlipped] = useState(true);
  const handlerClick = () => {
    setFlipped(!flipped);
    props.handlerFlip(props.id, props.flipped)
  };
  return (
    <ReactCardFlip isFlipped={props.flipped} flipDirection="horizontal">
      <div
        onClick={handlerClick}
        className="m-1 drop-shadow-xl rounded  w-20 h-20 md:w-22 md:h-22 bg-gray-200 p-3"
      >
        <img
          className="mx-auto mt-1 w-12 h-12 md:w-22 md:h-22"
          src={props.src}
          alt={props.alt}
        />
      </div>
      <div
        onClick={handlerClick}
        className="m-1 rounded drop-shadow-xl w-20 h-20 md:w-22 md:h-22 bg-black p-3"
      ></div>
    </ReactCardFlip>
  );
};
export default Imagen;

