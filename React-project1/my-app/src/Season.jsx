import React from "react";

export class Season extends React.Component{
    constructor(props){
    super(props);
    this.state = {lat: null, errorMessage: ''};
    }

    componentDidMount(){
     window.navigator.geolocation.getCurrentPosition(
    position => this.setState({lat: position.coords.latitude}),
    error =>  this.setState({errorMessage: error.message})
    )
}

    render(){
      //conditonal rendering In react
    if (this.state.errorMessage && !this.state.lat){
      return <div>Error: {this.state.errorMessage}</div>
    } if (!this.state.errorMessage && this.state.lat){
      return <div>Latitude: {this.state.lat}</div>
    }
    return <div>Loading!</div>
      }
    }