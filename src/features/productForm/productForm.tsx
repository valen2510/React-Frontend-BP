import { FC, useEffect} from "react"
import { redirect, useLoaderData } from "react-router-dom"
import { useForm } from "react-hook-form"
import { formattedDate } from "utils/parseDate"
import { ProductService } from "services/productService"
import { InputFieldForm } from "components/InputFieldForm/inputFieldForm"
import { Button } from "components/Button/button"
import Product from "types/Product"
import './productForm.css'
 
export const ProductForm: FC = () => {
    const productForm = useForm<Product>({ mode: "onBlur" })
    const productInfo = useLoaderData();
    const {register, handleSubmit, formState, reset, getValues, setValue} = productForm
    const {errors} = formState

    useEffect(() => {
        if (productInfo) {
            reset(productInfo)
        }
    }, [])

    const cleanForm = () => {
        reset()
    }

    const addnewProduct = async (newProduct: Product) => {
        try {
            const { status } = await ProductService.createProduct(newProduct);

            if (status === 200) {
                window.alert('El producto ha sido creado');
                cleanForm();
            }

            if (status === 206) {
                window.alert("Formulario incompleto");
            }
        } catch (error) {
            window.alert(error)
        }
    }

    const updadateProduct = async (updatedProduct: Product) => {
        try {
            const { status } = await ProductService.updateProduct(updatedProduct);

            if (status === 200) {
                window.alert('El producto ha sido actualizado');
            }
            if (status === 206) {
            window.alert("Formulario incompleto");
            }
        } catch (error) {
            window.alert(error)
        }
    }

    const onSubmit = (data: Product) => {
        if (productInfo) {
            updadateProduct(data);
        } else {
            addnewProduct(data);
        }
    }

    const addYearToDate = (date: string, year: number) => {
        const currentDate = new Date(date);
        const newDate = currentDate.setFullYear(currentDate.getFullYear() + year);
        return formattedDate(newDate)
    }
    const setDateRevisionDate = () => {
        const dateRelease = getValues('date_release')
        const newDate = addYearToDate(dateRelease, 1)
        setValue("date_revision", newDate)
    }

    return (
    <div className="card form-container">
        <div className="title">
            <h2>Formulario de registro</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="row">
                    <InputFieldForm
                        label="ID"
                        type="text"
                        readOnly={!!productInfo}
                        {...register("id", {
                            required: {
                                value: true,
                                message: 'El campo id es requerido',
                            },
                            minLength: {
                                value: 3,
                                message: 'El id debe tener minimo 3 caracteres'
                            },
                            maxLength: {
                                value: 10,
                                message: 'El id debe tener maximo 10 caracteres'
                            },
                            validate: {
                                idInvalid: async (fieldValue: string) => {
                                    if (!productInfo) {
                                        const { data } = await ProductService.validateProductId(fieldValue)
                                        if (data) return "El id es invalido"
                                    }
                                }
                            }
                        })}
                        error={errors.id?.message}
                    />
                    <InputFieldForm
                        label="Nombre"
                        type="text"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'El campo nombre es requerido',
                            },
                            minLength: {
                                value: 5,
                                message: 'El nombre debe tener minimo 5 caracteres'
                            },
                            maxLength: {
                                value: 100,
                                message: 'El nombre debe tener maximo 100 caracteres'
                            }
                        })}
                        error={errors.name?.message}
                    />
            </div>
            <div className="row">
                    <InputFieldForm
                        label="Descripcion"
                        type="text"
                        {...register("description", {
                            required: {
                                value: true,
                                message: 'El campo descripcion es requerido',
                            },
                            minLength: {
                                value: 10,
                                message: 'La descripcion debe tener minimo 10 caracteres'
                            },
                            maxLength: {
                                value: 100,
                                message: 'La decripcion debe tener maximo 200 caracteres'
                            }
                        })}
                        error={errors.description?.message}
                    />
                    <InputFieldForm
                        label="Logo"
                        type="text"
                        {...register("logo", {
                            required: {
                                value: true,
                                message: 'El campo logo es requerido',
                            }
                        })}

                        error={errors.logo?.message}
                    />
            </div>
            <div className="row">
                    <InputFieldForm
                        label="Fecha de liberacion"
                        type="date"
                        {...register("date_release", {
                            required: {
                                value: true,
                                message: 'El campo fecha de libracion es requerido',
                            }
                        })}
                        onBlur={setDateRevisionDate}
                        error={errors.date_release?.message}
                    />
                    <InputFieldForm
                        label="Fecha de revision"
                        type="date"
                        readOnly
                        {...register("date_revision", {
                            required: {
                                value: true,
                                message: 'El campo fecha de revision es requerido',
                            }
                        })}
                        error={errors.date_revision?.message}
                    />
            </div>
            <div className="row actions">
                <Button type="button" variant="btn-secondary" onClick={cleanForm}>Reiniciar</Button>
                <Button type="submit" variant="btn-primary">Enviar</Button>
            </div>
        </form>
    </div>
    )
}

export const productInfoLoader = async ({params}: any) => {
    const {data, status} = await ProductService.getAllProducts();
    if (status === 200 && params?.id) {
        const productInfo = data.find((product) => product.id === params?.id)
        if (!productInfo) {
            redirect('/producto/nuevo')
        }

        return {
            ...productInfo,
            'date_release': formattedDate(productInfo?.date_release || ""),
            'date_revision': formattedDate(productInfo?.date_revision || ""),
        }
    }
}
