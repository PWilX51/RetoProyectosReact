import { useEffect, useState } from 'react';
import '../css/Board.css';

export const Board = ({filas, onBoard}) => {
    const [turn, setTurn] = useState(1);
    const predict = (e)=>{
        document.querySelectorAll('.square').forEach((item) => {
            if(item.className.includes("activo")){
                item.classList.remove("activo");
            }
        });
        if(e.target.className==="square"){
            return;
        }
        const fila=Number(e.target.parentNode.id);
        const columna=Number(e.target.id);
        const filaSiguiente=e.target.parentNode.parentNode;
        
        if(turn===1 && e.target.className.includes('red')){
            const directions = [[1, -1], [1, 1]];
            const enemy = 2;

            let saltoDisponible = false;

            directions.forEach(([dx, dy]) => {
                const midX = fila + dx;
                const midY = columna + dy;
                const jumpX = fila + 2 * dx;
                const jumpY = columna + 2 * dy;

                // Verifica que estamos dentro del tablero
                if (jumpX < 8 && jumpY >= 0 && jumpY < 8) {
                    const intermedio = filas[midX]?.[midY];
                    const destino = filas[jumpX]?.[jumpY];

                    // Verifica que hay una ficha enemiga y un espacio vacío detrás
                    if (intermedio === enemy && destino === 0) {
                        saltoDisponible = true;
                        const celda = document.getElementById(`${jumpX}-${jumpY}`);
                        celda.classList.add("activo");
                        celda.onclick = (event) => {
                            celda.classList.remove("activo");
                            onBoard([fila, columna], [jumpX, jumpY]);
                            setTurn(2);
                        };
                    }
                }
            });

            // Si no hay salto disponible, permitir solo movimiento simple
            if (!saltoDisponible) {
                directions.forEach(([dx, dy]) => {
                    const nextX = fila + dx;
                    const nextY = columna + dy;
                    if (nextX < 8 && nextY >= 0 && nextY < 8 && filas[nextX][nextY] === 0) {
                        const celda = document.getElementById(`${nextX}-${nextY}`);
                        celda.classList.add("activo");
                        celda.onclick = (event) => {
                            celda.classList.remove("activo");
                            onBoard([fila, columna], [nextX, nextY]);
                            setTurn(2);
                        };
                    }
                });
            }
        }
        if(turn===2 && e.target.className.includes('black')){
            if(fila-1>=0){
                if(columna-1>=0){
                    filaSiguiente.childNodes[fila-1].childNodes[columna-1].classList.add("activo");
                    filaSiguiente.childNodes[fila-1].childNodes[columna-1].addEventListener('click', (event) => { filaSiguiente.childNodes[fila-1].childNodes[columna-1].classList.remove("activo");  onBoard([fila, columna], [Number(event.target.parentNode.id), Number(event.target.id)]); setTurn(1);});
                }
                if(columna+1<=7){
                    filaSiguiente.childNodes[fila-1].childNodes[columna+1].classList.add("activo");
                    filaSiguiente.childNodes[fila-1].childNodes[columna+1].addEventListener('click', (event) => { filaSiguiente.childNodes[fila-1].childNodes[columna+1].classList.remove("activo"); onBoard([fila, columna], [Number(event.target.parentNode.id), Number(event.target.id)]); setTurn(1);});
                }
            }
        }
    }

    return (
        <div className="board">
            {filas.map((item, index)=>{
                return(<div id={index} key={index} className='board-row'>
                    {item.map((i, k) => {
                        const id = `${index}-${k}`;
                        const className = i === 0 ? 'square' : i === 1 ? 'square red' : 'square black';
                        return (
                            <div onClick={predict} id={id} key={k} className={className}></div>
                        );
                    })}
                </div>);
            })}
            <div>Turno de jugador {turn}</div>
        </div>
    )
}