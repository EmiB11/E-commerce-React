import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getAllOrders } from '../../Actions/orders';
import Paging from '../Paging/Paging';

const TableOrders = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch]);

    const orders = useSelector(state => state.ordersReducer.filteredOrders)
    const [currentPage, setCurrentPage] = useState(1)
    const [ordersOnPage, setOrdersOnPage] = useState(10)
    const indexLastOrder = currentPage * ordersOnPage
    const indexFirstOrder = indexLastOrder - ordersOnPage;
    const currentOrders = orders.slice(indexFirstOrder, indexLastOrder)

    const paginado = (pageNum) => {
        setCurrentPage(pageNum)
    }

    return (
        <>
            <div className='table-responsive'>
                <table className="table table-sm table-hover table-striped table-bordered border-primary">
                    <thead className='table-dark'>
                        <tr>

                            <th scope="col">Comprador</th>
                            <th scope="col">Detalle</th>
                            <th scope="col">Total</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Fecha</th>

                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map(o => (
                            <tr >
                                <td>{o.usuario.nombre}</td>
                                <td>

                                        <Link to={`/dashboard/admin/OrderDetailAdmin/${o.pedidoId}/${o.usuario.id}`}>
                                            Ver Detalle
                                        </Link>

                                </td>
                                <td>{o.totalPedido}</td>
                                <td>{o.status}</td>
                                <td>{o.fechaCreacion.slice(0, 10)}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='col'>
                <Paging
                    productsOnPage={ordersOnPage}
                    allProducts={orders.length}
                    paginado={paginado}

                />
            </div>
        </>
    )
}

export default TableOrders