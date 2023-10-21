import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Pagination } from "components/Pagination/pagination";
import { RecordMenu } from "components/RecordMenu/recordMenu";
import { ProductService } from "services/productService";
import { Modal } from "components/Modal/modal";
import { formattedDate } from "utils/parseDate";
import { InputField } from "components/InputField/inputField";
import { Button } from "components/Button/button";
import Product from "types/Product";
import './productTable.css'

interface Pages {
    filterRecords: Product[],
    allRecords: Product[],
    page: number,
    lines: number,
    search?: string,
    disableprevPage?: boolean,
    disableNextPage?: boolean,
}

const initialPagesState = {
    filterRecords: [],
    allRecords: [],
    page: 0,
    lines: 5,
    search: '',
    disableNextPage: false,
}

export const ProductTable: FC = () => {
    const optionsLines = [5, 10, 20]
    const [selectedId, setSelectedId] = useState<number | string>('')
    const [prductInfo, setprductInfo] = useState<Product>({})
    const [pages, setPages] = useState<Pages>(initialPagesState)
    const [openModal, setOpenModal] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        getProductsList();
    }, []);

    const filteringProducts = (pages: Pages) => {
        const { allRecords, page, lines, search } = pages;
        let filteredProducts = allRecords;

        if (search?.length) {
            filteredProducts = filteredProducts.filter((product: object) => {
                return Object.values(product).some((value) => 
                    value.toLowerCase().includes(search)
                );
            });
        }

        return filteredProducts.slice(page, page + lines)
    }

    useEffect(() => {
        const filterRecords = filteringProducts(pages)
        const nextPage = pages.page + pages.lines;
        const disableNextPage = !filteringProducts({...pages, 'page': nextPage}).length
        setPages({...pages, disableNextPage, filterRecords})
    }, [pages.lines, pages.search, pages.page, pages.allRecords])

    const getProductsList = () => {
        ProductService.getAllProducts().then((response: any) => {
            if (response.status === 200) {
                const allRecords = response.data
                setPages({... pages, allRecords});
            }            
        }).catch((e: Error) => {
            window.alert(e);
        })
    }

    const goToNewProductForm = () => {
        navigate('/producto/nuevo');
    }

    const handleSelectedMenu = (id: string) => {
        if (id === selectedId) {
            setSelectedId('')
            return
        }
        setSelectedId(id)
    }

    const handleChangeLines = (lines: number) => {
        setPages({...pages, lines})
    }

    const nextPage = () => {
        const page = pages.page + pages.lines;
        setPages({...pages, page})
    }

    const prevPage = () => {
        if (pages.page > 0) {
            const page = pages.page - pages.lines; 
            setPages({...pages, page})
        }
    }

    const handleEdit = () => {
        navigate(`/producto/${selectedId}`)
    }

    const handleModal = (value: boolean) => {
        const product = pages.filterRecords.find(({id}) => id === selectedId);
        if (product && value) {
            setprductInfo(product)
        }
        setOpenModal(value)
    }

    const handleFilterproducts = (event: any) => {
        const { value } = event.target
        setPages({...pages, 'search': value.toLowerCase()})
    }

    const onDeleteProduct = async () => {
        try {
            const { status } = await ProductService.deleteProduct(prductInfo.id)
            if (status === 200) {
                window.alert(`El producto ha sido eliminado exitosamente`);
            }
        } catch (error) {
            window.alert(error)
        }
        handleModal(false)
    }

    return (
        <>
        <Modal
            openModal={openModal}
            handleModal={handleModal}
            content={`¿Esta seguro de eliminar el producto ${prductInfo.name}?`}
            onConfirm={onDeleteProduct} 
        />
        <div className="row">
            <InputField
                type='text' 
                placeholder="Search..." 
                value={pages.search} 
                onChange={handleFilterproducts}
            />
            <Button variant="btn-primary" onClick={goToNewProductForm}>Agregar</Button>
        </div>
        <div className="card">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Nombre de producto</th>
                            <th>Descripción</th>
                            <th>Fecha de liberación<i className="fa-solid fa-circle-info"></i></th>
                            <th>
                                Fecha de reestructuración<i className="fa-solid fa-circle-info"></i>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!pages.filterRecords.length && (
                            <tr className="row center">
                                <td>No se encuentran registros</td>
                            </tr>
                        )}
                        {pages.filterRecords.length > 0 && (pages.filterRecords.map((product, index) => (
                            <tr
                                key={index}
                            >
                                <td>
                                    <div className="logo"><img src={product.logo}/></div>
                                </td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{formattedDate(product.date_release)}</td>
                                <td>{formattedDate(product.date_revision)}</td>
                                <td className="table-actions" onClick={() => handleSelectedMenu(product.id)}>
                                    <RecordMenu
                                        recordId={product.id}
                                        selectedId={selectedId}
                                        onEdit={handleEdit}
                                        onDelete={() => handleModal(true)}
                                    />
                                </td>
                            </tr>
                        )))}
                    </tbody>
                </table>
                </div>
                <Pagination
                    total={pages.filterRecords.length}
                    optionsLines={optionsLines}
                    selectedLines={pages.lines}
                    handleChangeLines={handleChangeLines}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    disableNext={pages.disableNextPage}
                />
            </div>
        </>
    )
}
