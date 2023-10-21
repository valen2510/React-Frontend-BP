import { FC } from "react"
import { Button } from "components/Button/button";
import './recordMenu.css';

interface RecordMenuProps {
    recordId: number | string,
    selectedId: number | string,
    onEdit: () => void
    onDelete: () => void,
}

export const RecordMenu: FC<RecordMenuProps> = ({recordId, selectedId, onEdit, onDelete}) => {

    return (
        <div className="menu" key={recordId}>
            <i className="fa-solid fa-ellipsis-vertical"></i>
            <div className={selectedId === recordId ? 'active-content' : 'hidden-content'}>
                <Button variant="btn-secondary" onClick={onEdit}><i className="fa-solid fa-pencil"></i>Editar</Button>
                <Button variant="btn-secondary" onClick={onDelete}><i className="fa-solid fa-trash"></i>Eliminar</Button>
            </div>
        </div>
    )
}
