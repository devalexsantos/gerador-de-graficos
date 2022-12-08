import { XCircle } from 'phosphor-react';
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-router-dom';

export const Header = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
        <header className="w-full flex flex-col gap-4 justify-center h-[30vh] bg-sky-600 items-center">
            <h1 className="text-2xl text-white font-bold">Gerador de Gráficos</h1>
            <button onClick={handleShow} className="py-2 px-4 rounded bg-sky-700 text-white hover:bg-sky-800">Selecione o Gráfico</button>
        </header>

        <Offcanvas show={show} onHide={handleClose} placement="bottom" backdrop={false}>
        <Offcanvas.Header className="flex justify-center" closeButton>
          <Offcanvas.Title className="flex gap-2">Escolha o tipo do Gráfico <button onClick={handleClose}><XCircle className="text-zinc-600" size={24} weight="bold" /></button></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="flex flex-col items-center gap-3">
          <div className="flex gap-2 items-start justify-center">
            <button className="p-2 bg-sky-600 text-white rounded"><NavLink className="text-white" to="/grafico-de-linha">Gráfico de Linha</NavLink></button>
            <button className="p-2 bg-sky-600 text-white rounded"><NavLink className="text-white" to="/grafico-de-barra">Gráfico de Barra</NavLink></button>
          </div>
        </Offcanvas.Body>
        </Offcanvas>
        </>
    )

}

export default Header;