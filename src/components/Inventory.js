import React from "react";
import firebase from "firebase";
import base, { firebaseApp } from "../base";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";

class Inventory extends React.Component {
  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({user});
      }
    });
  }

  authHandler = async (authData) => {
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    if (!store.owner) {
      await base.post(`${this.props.storeId}/user`, {
        data: authData.user.uid,
      });
    }
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you're not the owner!</p>;{logout}
        </div>
      );
    }
    return (
      <div className="Inventory">
        <h1>INVENTORY</h1>
        {logout}
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
