import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";

class App extends React.Component {
  // State
  state = {
    fishes: {},
    order: {},
  };
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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Sea food Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish key={key} details={this.state.fishes[key]} />
            ))}
          </ul>
        </div>
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
