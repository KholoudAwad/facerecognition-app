import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageTextHolder from './Components/ImageTextHolder/ImageTextHolder';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import './App.css';
import 'tachyons'

const app = new Clarifai.App({
 apiKey: 'd54dde9610d54b5eb41c60ec764e50e6'
});

const particlesOptions = {
    particles: {
      number: { 
        value : 50 , 
          density :{
            enable:true ,
            value_area:800

          }
         }
       }
     };

const initialState = {
      input: '' ,
      imageUrl:'',
      box:{},
      route : 'signin',
      isSignedIn: false ,
      user :{
        id:"",
        name:"",
        email:"",
        entries:0,
        joined: ""
      }
    };


class App extends React.Component {
  constructor(){
    super()
    this.state = initialState;
  }

// componentDidMount () {

//   fetch('http://localhost:3000/')
//   .then( response => response.json())
//   .then(console.log);
// }
  loadUser = (data) => {

    this.setState ({user :{
      id: data.id,
      name: data.name,
      email: data.email,
      entries:data.entries,
      joined: data.joined
    }})
}



 calculateFaceBox = (data) => {

// console.log("data",data.outputs[0].data.regions[0].region_info.bounding_box);
const clarifaiData = data.outputs[0].data.regions[0].region_info.bounding_box;
const image = document.getElementById("imageBox");
const width = Number(image.width);
const height = Number(image.height);
return{
     leftCol : clarifaiData.left_col *width,
    topRow : clarifaiData.top_row * height,
     rightCol : width - (clarifaiData.right_col *width),
     bottomRow : height - (clarifaiData.bottom_row *height)
  }

 }

 displayFaceBox = (box) => {
  // console.log(box);
  this.setState({box:box});
 }


  onInputChange = (event) => {
    this.setState({input : event.target.value});
  }

  onButtonChange = () => {
    this.setState({imageUrl:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then((response)=> {
       fetch('http://localhost:3000/image',{
    method : 'put',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify({
    id : this.state.user.id
    })
  }).then(response => response.json())
    .then(count => {
    this.setState(Object.assign(this.state.user,{entries:count}));
    }).catch(err => console.log(err));
      this.displayFaceBox(this.calculateFaceBox(response))})
    
  }

  onRouteChange = (data) => {
    if(data === 'signout'){
      this.setState(initialState);
    }
    else if (data === 'home') {
      this.setState({isSignedIn:true});
    }
    this.setState({route : data});
  }

  render(){
  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      { this.state.route === 'home'
       ? <div>
       <Logo />
       <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      <ImageTextHolder onInputChange={this.onInputChange}
       onButtonChange={this.onButtonChange}
       />
       <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
       </div>
       : (this.state.route === 'signin' ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> ) 
     }
    </div>
  );
}

}

export default App;
