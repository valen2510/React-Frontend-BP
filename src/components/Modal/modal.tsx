
import { FC} from "react"
import { Button } from "components/Button/button";
import './modal.css';

interface ModalProps {
    content: string,
    openModal: boolean,
    handleModal: (value: boolean) => void,
    onConfirm: () => void,
}

export const Modal: FC<ModalProps> = ({ openModal, handleModal, content, onConfirm }) => {
    if (openModal) {
        return (
            <div className="overlay">
                <div className="modal">
                    <div className="modal-content">
                        <h5>{content}</h5>
                    </div>
                    <div className="modal-actions">
                        <div className="row">
                            <Button variant="btn-secondary" onClick={() => handleModal(false)}>Cancelar</Button>
                            <Button variant="btn-primary" onClick={onConfirm}>Confirmar</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return null;
}
