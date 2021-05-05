import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

class Inventory extends React.Component {
  render() {
    return (
      <div className="Inventory">
        <h1>INVENTORY</h1>
        <AddFishForm addFish={this.props.addFish} />
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            key={key}
            fish={this.props.fishes[key]}
            index={key}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
