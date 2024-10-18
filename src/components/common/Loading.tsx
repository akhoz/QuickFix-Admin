
import ReactLoading from 'react-loading';

function Loading() {
  return (
    <div className="z-50 flex items-center justify-center w-screen h-screen">
      <div className="absolute inset-0 bg-black opacity-40"></div> {/* Fondo con opacidad */}
      <div className="relative flex items-center justify-center w-10/12 h-10/12 lg:h-5/12"> {/* Contenedor con tamaño dinámico */}
        <ReactLoading type={"spin"} color={"#000000"} className="w-full h-full" /> {/* Spinner toma el tamaño del contenedor */}
      </div>
    </div>
  );
}

export default Loading;

