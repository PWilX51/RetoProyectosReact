import { useEffect } from 'react';
import '../css/Board.css';

export const Board = ({filas, onBoard}) => {
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
        
        if(e.target.className.includes('red')){
            if(fila+1<=8){
                if(columna-1>=0){
                    filaSiguiente.childNodes[fila+1].childNodes[columna-1].classList.add("activo");
                    filaSiguiente.childNodes[fila+1].childNodes[columna-1].addEventListener('click', (event) => onBoard([fila, columna], [Number(event.target.parentNode.id), Number(event.target.id)]));
                }
                if(columna+1<=7){
                    filaSiguiente.childNodes[fila+1].childNodes[columna+1].classList.add("activo");
                    filaSiguiente.childNodes[fila+1].childNodes[columna+1].addEventListener('click', (event) => onBoard([fila, columna], [Number(event.target.parentNode.id), Number(event.target.id)]));
                }
            }
        }else{
            if(fila-1>=0){
                if(columna-1>=0){
                    filaSiguiente.childNodes[fila-1].childNodes[columna-1].classList.add("activo");
                    filaSiguiente.childNodes[fila-1].childNodes[columna-1].addEventListener('click', (event) => onBoard([fila, columna], [Number(event.target.parentNode.id), Number(event.target.id)]), false);
                }
                if(columna+1<=7){
                    filaSiguiente.childNodes[fila-1].childNodes[columna+1].classList.add("activo");
                    filaSiguiente.childNodes[fila-1].childNodes[columna+1].addEventListener('click', (event) => onBoard([fila, columna], [Number(event.target.parentNode.id), Number(event.target.id)]), false);
                }
            }
        }
    }

    return (
        <div className="board">
            {filas.map((item, index)=>{
                return(<div id={index} key={index} className='board-row'>
                    {item.map((i, k)=>{
                        return(i==0 ? <div onClick={(e) => predict(e)} id={k} key={k} className='square'></div> : i==1 ? <div onClick={(e) => predict(e)} id={k} key={k} className='square red'></div> : <div onClick={(e) => predict(e)} id={k} key={k} className='square black'></div>);
                    })}
                </div>);
            })}
        </div>
    )
}