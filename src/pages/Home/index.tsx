import Header from "../../components/Layout/Header"
import { Outlet, NavLink } from 'react-router-dom'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Home = () => {
    const [dataInput, setDataInput] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div>
            <Header />
 
            {/* <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <NavLink to="/grafico-de-barra">Ir para gráfico 01</NavLink>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary">Understood</Button>
            </Modal.Footer>
            </Modal> */}
            
            <Outlet />
        </div>
    )

}

export default Home;