import { useState } from "react";
import Pieza from "./components/Pieza";
import { useEjemplo } from "./store/useStoreEjemplo";

function App() {
    const { List, saveList } = useEjemplo((state) => state);

    const [matriz, setMatriz] = useState<number[]>([
        0, 1, 2,
        3, 4, 5,
        6, 7, null
    ]);

    const [piezaSelect, setPiezaSelect] = useState<number | null>(null);
    const [movimientos, setMovimientos] = useState(0);

    const seleccionarPiezas = (indice: number) => {
        if (matriz[indice] !== null) {
            setPiezaSelect(indice);
        }
    };

    const moverPieza = (indice: number) => {
        if (validar(indice)) {
            setMatriz((prevList) =>
                prevList.map((pieza, index) => {
                    if (index === indice) {
                        pieza = prevList[piezaSelect as number];
                    }
                    if (index === piezaSelect) {
                        pieza = null;
                    }
                    return pieza;
                })
            );
            setMovimientos(movimientos + 1);
            setPiezaSelect(null);
        }
    };

    const validar = (indice: number): boolean => {
        if (piezaSelect === null) return false;

        const filaActual = Math.floor(piezaSelect / 3);
        const colActual = piezaSelect % 3;
        const filaNueva = Math.floor(indice / 3);
        const colNueva = indice % 3;

        const esAdyacente =
            (Math.abs(filaActual - filaNueva) === 1 && colActual === colNueva) ||
            (Math.abs(colActual - colNueva) === 1 && filaActual === filaNueva);

        return esAdyacente;
    };

    const gano = matriz.every((val, idx) => val === idx);

    return (
        <>
            <h1 className="text-center text-xl font-bold">Juego del Puzzle</h1>
            <h2 className="text-center">Movimientos: {movimientos}</h2>

            {gano && <h2 className="text-green-500 text-center">🎉 ¡Ganaste!</h2>}

            <div className="flex justify-center items-center w-full mt-4">
                <div className="border-2 border-blue-400 aspect-square w-96 grid grid-cols-3 gap-2 p-1.5">
                    {matriz.map((pieza, index) => (
                        <Pieza
                            key={index}
                            indiceImagen={pieza}
                            seleccionarPiezas={seleccionarPiezas}
                            indice={index}
                            moverPieza={moverPieza}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <h3 className="font-bold">Ranking:</h3>
                {List.length > 0 ? (
                    List.map((item, index) => (
                        <p key={index}>{index + 1}. {item.name} - {item.movimientos} movimientos</p>
                    ))
                ) : (
                    <p>No hay jugadores aún.</p>
                )}
            </div>

            {gano && (
                <button
                    onClick={() => {
                        saveList("Jugador", movimientos);
                        alert("¡Guardado en ranking!");
                    }}
                    className="bg-amber-400 p-2 mt-4 block mx-auto"
                >
                    Guardar en Ranking
                </button>
            )}

            <button
                onClick={() => {
                    setMatriz([0, 1, 2, 3, 4, 5, 6, 7, null]);
                    setMovimientos(0);
                    setPiezaSelect(null);
                }}
                className="bg-gray-300 p-2 mt-2 block mx-auto"
            >
                Reiniciar Juego
            </button>
        </>
    );
}

export default App;