interface PiezaProps {
    indiceImagen: number | null;
    onClick: () => void;        
    isMovable: boolean;
    }

const Pieza = ({ indiceImagen, onClick, isMovable }: PiezaProps) => {
    const imageUrl = "/src/assets/puzzle.jpg";

    return (
        <button
        onClick={onClick}                    
        disabled={!isMovable && indiceImagen !== null}
        className={`
            border-2 aspect-square w-full transition-all duration-200
            ${indiceImagen === null 
            ? 'border-blue-400 bg-white cursor-default' 
            : 'border-amber-400 cursor-pointer hover:scale-95'
            }
            ${isMovable ? 'ring-4 ring-green-400 ring-offset-2' : ''}
        `}
        style={{
            backgroundImage: indiceImagen !== null ? `url(${imageUrl})` : 'none',
            backgroundSize: '300% 300%',
            backgroundPosition: indiceImagen !== null 
            ? `${((indiceImagen - 1) % 3) * 50}% ${Math.floor((indiceImagen - 1) / 3) * 50}%`
            : 'center',
        }}
        />
    );
};

export default Pieza;