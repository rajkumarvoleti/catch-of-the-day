import React from "react";
import { formatPrice } from "../helpers";
class Order extends React.Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const isAvailable = fish && fish.status === "available";
    const count = this.props.order[key];
    if (!fish) return null;
    if (!isAvailable) {
      return (
        <span key={key}>
          {fish ? fish.name : "fish"} is no longer available
        </span>
      );
    }
    return (
      <span key={key}>
        {count} lbs {fish.name}
        {formatPrice(count * fish.price)}
        <button onClick={() => this.props.deleteOrder(key)}>&times;</button>
      </span>
    );
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          {orderIds.map((key) => (
            <li key={key}>{this.renderOrder(key)}</li>
          ))}
        </ul>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
