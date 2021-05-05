import React from "react";

class EditFishForm extends React.Component {
  handleChange = (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    const index = this.props.index;
    const updatedFish = {
      ...this.props.fish,
      [name]: value,
    };
    this.props.updateFish(index, updatedFish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <input
          type="text"
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        />
        <input
          type="text"
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button
          onClick={() => this.props.deleteFish(this.props.index)}
        >Remove Fish</button>
      </div>
    );
  }
}

export default EditFishForm;
