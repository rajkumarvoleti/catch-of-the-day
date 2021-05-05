import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";
class App extends React.Component {
  // State
  state = {
    fishes: {},
    order: {},
  };
  // Life cycles
  componentDidMount() {
    const storeID = this.props.match.params.storeId;
    this.ref = base.syncState(`${storeID}/fishes`,{
      context:this,
      state:'fishes'
    });
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  // function to add fish
  addFish = (fish) => {
    //1. Take a copy of the state.
    const fishes = { ...this.state.fishes };
    // 2. Add fish to this copied one.
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the newfishes object to the state
    this.setState({ fishes });
  };
  //function to load sample fishes
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  //order
  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Sea food Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                addToOrder={this.addToOrder}
                details={this.state.fishes[key]}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
