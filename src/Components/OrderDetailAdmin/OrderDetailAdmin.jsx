import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../Actions/orders';
import { getUserById } from '../../Actions/users';
import ordersReducer from '../../Reducers/Orders';
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin'

const OrderDetailAdmin = () => {
    const dispatch = useDispatch();
    const { id,idUser } = useParams();
    const order = useSelector(state => state.ordersReducer.orderDetail);
    const userById = useSelector(state => state.userReducer.userDetail)
    useEffect(() => {
        dispatch(getOrderById(id));
        dispatch(getUserById(idUser))
    }, [dispatch, id])
    return (
        <div className="container-fluid">
            <div className='row'>
                <div className="col-auto col-md-2 col-xl-2 px-0 ">
                    <SidebarAdmin />
                </div>
                <div className='col'>
                    <div className="row h4">Detalle del pedido</div>
                    <div className="row">
                        <div className="col">

                            <div class="card border-dark mb-3">
                                <div class="card-header text-center">
                                    Usuario:{userById.usuario}
                                </div>
                                <div class="card-body text-start">
                                    <div className="row">
                                        <div className="col">
                                            <p className="mb-0 fs-5">numero pedido:</p>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 fs-5">{order?.pedidoId}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="mb-0 fs-5">Estado:</p>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 fs-5">{order?.status}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="mb-0 fs-5">Email</p>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 fs-5">{userById.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="mb-0 fs-5">Fecha:</p>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 fs-5">{order?.fechaCreacion.slice(0, 10)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="row">
                        <div className="col">

                            <div className="card border-dark">
                                <div className="card-header text-center">
                                    Articulos
                                </div>
                                <div className="card-body">
                                    {order?.productos.map(p => (
                                        <div className="row">
                                            <div className="col">
                                                <p className="mb-0 fs-5">
                                                    {p.producto}X{p.cantidad}
                                                </p>
                                            </div>
                                            <div className="col">
                                                <p className="mb-0 fs-5">P.U.={p.precioUnitario}</p>
                                            </div>
                                            <div className="col">
                                                <p className="mb-0 fs-5">Total:{p.total}</p>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailAdmin