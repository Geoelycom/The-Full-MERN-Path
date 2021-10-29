import React from "react";

export class Season extends React.Component{
constructor(props){
super(props);
this.state = {lat: null}
}

render(){
window.navigator.geolocation.getCurrentPosition(
position => {
this.setState({lat: position.coords.latitude});
},
error => console.log(error))

return(
<div>
  latitude: {this.state.lat}
</div>
)
}
}