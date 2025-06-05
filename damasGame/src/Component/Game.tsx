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
        <>
        <Board filas={filas} onBoard={(posI, posF) => setFilas((prevFilas) => {
            const [x, y] = posI;
            const [a, b] = posF;
            const newFilas = prevFilas.map(row => [...row]);

            newFilas[a][b] = newFilas[x][y];
            newFilas[x][y] = 0;

            return newFilas;
        })}></Board>
        </>
    )
}