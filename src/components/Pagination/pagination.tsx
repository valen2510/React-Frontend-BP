import { FC } from "react"
import { Button } from "components/Button/button";
import { SelectorField } from "components/SelectorField/selectorField";
import './pagination.css';

interface PaginationProps {
    optionsLines: number[],
    total: number,
    selectedLines: number,
    handleChangeLines: (lines: number) => void
    nextPage: () => void,
    prevPage: () => void,
    disableNext?: boolean,
    disablePrev?: boolean,
}

export const Pagination: FC<PaginationProps> = ({
    optionsLines,
    total,
    selectedLines,
    nextPage,
    prevPage,
    disableNext,
    disablePrev,
    handleChangeLines
}) => {
    return (
        <div className="row pagination">
            <p>{total} Resultados</p>
            <div className="buttons">
                <Button
                    variant="btn-primary"
                    onClick={prevPage}
                    disabled={disablePrev}
                >
                    Anterior
                </Button>
                <Button
                    variant="btn-primary"
                    onClick={nextPage}
                    disabled={disableNext}
                >
                    Siguiente
                </Button>
            </div>
            <SelectorField
                options={optionsLines}
                onChange={(e) => handleChangeLines(Number(e.target.value))}
                value={selectedLines}
            />
        </div>
    )
}
