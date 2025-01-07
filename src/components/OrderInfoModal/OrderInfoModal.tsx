import { FC } from "react"
import dateAndTime from "../../helpers/dateAndTime"
import { IStaffAllOrders } from "../../API/order/order.interface"
import './order-info-modal.scss'

interface IOrderInfoModal {
    currentOrder: IStaffAllOrders | null
}

const OrderInfoModal: FC<IOrderInfoModal> = ({ currentOrder }) => {
    return <>
        {!currentOrder ? '' : <div style={{ color: 'black', marginTop: "16px", padding: "16px", border: "1px solid #ddd" }}>

            <div className="order__details__wrapp">
                <h4 className="order__details__title">Order Details <span className="order__details__id">#{currentOrder?.id}</span></h4>

                <p className={`order__details__status order__details__status--${currentOrder.status}`}>{currentOrder.status}</p>

                <p className="order__details__date">{dateAndTime(currentOrder?.order_date || 'Failed in catching date')}</p>
            </div>


            {currentOrder &&
                <div className="order__info__wrapper">
                    <div className="order__info__wrapp">
                        <h2 className="order__info__customer__title">Customer</h2>

                        <div className="customer__name__wrapp sections__style">
                            <img className="customer__avatar" src={currentOrder.user.image} alt="Avatar" />
                            <p className="customer__name">{currentOrder.user.name} {currentOrder.user.last_name}</p>
                        </div>

                        <div className="sections__style">
                            <h2 className="order__info__subtitle">Contant info</h2>
                            <p className="customer__phone">
                                Phone: <a href={`tel:${currentOrder.user.phone}`}>{currentOrder.user.phone}</a>
                            </p>

                            <p>
                                Email: <a href={`mailto:${currentOrder.user.email}`}>{currentOrder.user.email}</a>
                            </p>

                        </div>

                        <div className="sections__style">
                            <h2 className="order__info__subtitle">Additional user information</h2>

                            <p>{currentOrder.user.additional_information}</p>
                        </div>
                    </div>

                    <ul className="order__info__wrapp">
                        {currentOrder.order_items.map(({ products_item, quantity, price, id }) => <li key={id} className="order__info__item">
                            <img className="order__info__item__pic" src={products_item.image} alt={products_item.name} />
                            <p className="order__info__item__name">{products_item.name}</p>

                            <p>{products_item.price} CAD$</p>
                            <p>{quantity}</p>
                            <p>{price} CAD$</p>

                        </li>)}
                    </ul>

                    <div className="order__info__wrapp">
                        <h2 className="order__info__customer__title">Order Add-ons</h2>

                        <div className="order__info__distance sections__style">
                            {currentOrder.chopsticks === 'yes' ?
                                <p>Chopstiks: {currentOrder.chopsticks} x {currentOrder.chopsticks_quantity}</p> :
                                <p>Chopstiks: No</p>}
                        </div>

                        <div className="order__info__distance sections__style">
                            {currentOrder.allergic === 'yes' ?
                                <div className="allergy">
                                    <p>Allergy: Yes</p>
                                    <p>Type of allergy: {currentOrder.type_of_allergy}</p>
                                </div> : 'Allergy: No'}
                        </div>

                        <p className="order__info__distance sections__style">Soy sous: {currentOrder.soy_sauce}</p>

                        <div className="order__info__distance sections__style">
                            {currentOrder.additional_information !== '' ?
                                <p>Additional information: {currentOrder.additional_information}</p> :
                                'Additional information: -'}
                        </div>
                    </div>


                    <div className="order__info__wrapp">
                        <h2 className="order__info__customer__title">Payment summery</h2>
                        <p>Total price: {currentOrder.total_price} CAD$</p>
                    </div>

                </div>}
        </div>}
    </>
}

export default OrderInfoModal