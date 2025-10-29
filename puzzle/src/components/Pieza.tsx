interface PiezaProps {
    indiceImagen: number | null;
    seleccionarPiezas: (id: number) => void;
    moverPieza: (id: number) => void;
    indice: number;
}

const Pieza = ({ indiceImagen, seleccionarPiezas, indice, moverPieza }: PiezaProps) => {
    const imageUrl = "/src/assets/puzzle.jpg";

    return (
        <>
            {indiceImagen !== null ? (
                <div
                    className="border-2 border-amber-400 aspect-square w-full cursor-pointer"
                    onClick={() => seleccionarPiezas(indice)}
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: "300% 300%",
                        backgroundPosition: `${(indiceImagen % 3) * 33.33}% ${(Math.floor(indiceImagen / 3)) * 33.33}%`,
                    }}
                ></div>
            ) : (
                <div
                    className="border-2 border-blue-400 aspect-square w-full cursor-pointer bg-white"
                    onClick={() => moverPieza(indice)}
                ></div>
            )}
        </>
    );
};

export default Pieza;