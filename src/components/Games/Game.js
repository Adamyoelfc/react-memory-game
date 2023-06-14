import Imagen from "./Imagen";
import microsoft from "../../assets/microsoft.png";
import youtube from "../../assets/youtube.png";
import whatsapp from "../../assets/whatsapp.png";
import telegrama from "../../assets/telegrama.png";
import pinterest from "../../assets/pinterest.png";
import tiktok from "../../assets/tik-tok.png";
import linkedin from "../../assets/linkedin.png";
import gorjeo from "../../assets/gorjeo.png";
import { useContext, useEffect, useState } from "react";
import StateContext from "../../store/GeneralContex";
import swal from "sweetalert";
// import spotify from "../../assets/spotify.png";
// import github from "../../assets/github.png";
// import instagram from "../../assets/instagram.png";
// import facebook from "../../assets/facebook.png";
// import gmail from "../../assets/gmail.png";
// import js from "../../assets/js.png";
// import meta from "../../assets/meta.png";
// import androide from "../../assets/androide.png";

// lista de imagenes originales no repetidas
const images = [
  {
    name: "image1",
    id: "1",
    src: microsoft,
    alt: "image1",
    flipped: false,
    match: false,
  },
  {
    name: "image2",
    id: "2",
    src: youtube,
    alt: "image2",
    flipped: false,
    match: false,
  },
  {
    name: "image3",
    id: "3",
    src: whatsapp,
    alt: "image3",
    flipped: false,
    match: false,
  },
  {
    name: "image4",
    id: "4",
    src: telegrama,
    alt: "image4",
    flipped: false,
    match: false,
  },
  {
    name: "image5",
    id: "5",
    src: pinterest,
    alt: "image5",
    flipped: false,
    match: false,
  },
  {
    name: "image6",
    id: "6",
    src: tiktok,
    alt: "image6",
    flipped: false,
    match: false,
  },
  {
    name: "image7",
    id: "7",
    src: linkedin,
    alt: "image7",
    flipped: false,
    match: false,
  },
  {
    name: "image8",
    id: "8",
    src: gorjeo,
    alt: "image8",
    flipped: false,
    match: false,
  },
];

let matchs = [];
const Game = () => {
  const [allImages, setAllImages] = useState([]);
  const [counter, setCounter] = useState(0);
  const { health, setHealth } = useContext(StateContext);

  // recive lista de imagenes originales, devuelve lista de imagenes
  // originales y duplicadas
  const duplicateImage = (Img) => {
    let tempImages = [...Img];
    for (let i = 0; i < Img.length; i++) {
      let duplicate = {
        ...Img[i],
        name: Img[i].name + "d",
        id: Img[i].id + "d",
        alt: Img[i].alt + "d_" + Img[i].id + "d",
        flipped: false,
      };
      tempImages.push(duplicate);
    }
    return tempImages;
  };

  // organiza aleatoriamente
  const randomSort = (a, b) => {
    return Math.random() - 0.5;
  };

  // func iniciadora del componente
  const restartFunc = () => {
    const allImagesTemp = duplicateImage(images).sort(randomSort);
    setAllImages(allImagesTemp);
    setCounter(0);
    setHealth(10);
    const timer = setTimeout(() => {
      const updateImages = allImagesTemp.map((image) => {
        return { ...image, flipped: true };
      });
      setAllImages(updateImages);
    }, 3000);
    return () => clearTimeout(timer);
  };

  // func para dar la vuelta a la imagen
  const flipCard = (key, prevImages, flipped) => {
    const updateImage = prevImages.map((image) => {
      if (image.id == key) {
        return { ...image, flipped: !flipped };
      }
      return { ...image };
    });
    return updateImage;
  };

  //func donde se ejecuta toda la logica cuando se voltea una carta
  const handlerFlip = (key, flipped) => {
    const card = allImages.find((value) => value.id === key);
    if (card.match || !card.flipped) {
      return;
    } else {
      setAllImages((prevImages) => {
        if (counter < 1) {
          matchs.push(key);
          setCounter(counter + 1);
          return flipCard(key, prevImages, flipped);
        } else if (counter === 1) {
          matchs.push(key);
          let updateImage = flipCard(key, prevImages, flipped);

          //si coinciden actualizar valor match
          if (matchs.length > 1 && matchs[0][0] === matchs[1][0]) {
            const indexToUpdate1 = updateImage.findIndex(
              (element) => element.id === matchs[0]
            );
            updateImage[indexToUpdate1].match = true;
            const indexToUpdate2 = updateImage.findIndex(
              (element) => element.id === matchs[1]
            );
            updateImage[indexToUpdate2].match = true;
            matchs = [];
            setCounter(0);
            if (!updateImage.find((image) => image.match === false)) {
              swal({
                title: "You won! 🥳",
                text: "You did it! 💪🏻",
                icon: "success",
                button: true,
              }).then((restart) => {
                restart ? restartFunc() : restartFunc();
              });
            }

            return updateImage;
          } else {
            matchs = [];
            setCounter(counter + 1);
            health === 1
              ? swal({
                  title: "Game over",
                  text: "You lost! 😒, start again? 😃",
                  icon: "error",
                  buttons: true,
                }).then((restart) => {
                  restart ? restartFunc() : restartFunc();
                })
              : setHealth(health - 1);

            return updateImage;
          }
        } else {
          const updateImage = prevImages.map((image) => {
            if (!image.flipped && image.match === false) {
              return { ...image, flipped: true };
            }
            return { ...image };
          });
          matchs = [];
          setCounter(0);
          return updateImage;
        }
      });
    }
  };

  return (
    useEffect(() => {
      restartFunc();
    }, []),
    useEffect(() => {
      if (counter === 2) {
        const updatedImages = allImages.map((image) => {
          if (!image.match && !image.flipped) {
            return { ...image, flipped: true };
          }
          return image;
        });
        const timer = setTimeout(() => {
          setAllImages(updatedImages);
          setCounter(0);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }, [counter, allImages]),
    (
      <div className="mt-2 p-1 mx-10">
        <div className="m-5 grid grid-rows-4 grid-flow-col gap-1 md-gap-2 place-content-center max-w-5xl">
          {allImages.map((imagen) => (
            <Imagen
              key={imagen.id}
              id={imagen.id}
              name={imagen.name}
              src={imagen.src}
              alt={imagen.alt}
              flipped={imagen.flipped}
              handlerFlip={handlerFlip}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default Game;
