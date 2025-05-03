import { useState } from "react"
import { Board } from "./Board"

export const Game = () => {
    const [filas, setFilas] = useState(
        [[0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0]]);

    return(
        <Board filas={filas} onBoard={(posI, posF) => setFilas((prevFilas) => {
            console.log(posI, posF);
            const [x, y] = posI;
            const [a, b] = posF;
            const newFilas=[...prevFilas];
            [newFilas[x][y], newFilas[a][b]] = [newFilas[a][b], newFilas[x][y]];
            return newFilas;
        })}></Board>
    )
}