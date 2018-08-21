import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const inputStyle={
  backgroundColor:"#fcfbdb",
  borderRadius:"0.5em",
  height:"100%",
  width:"80%",
  padding:"1em",
  border:"none",
  marginBottom:"1.8em",
  fontSize: "0.9em",
  fontFamily: "'Raleway', sans-serif",
}

var id=0;
var myJSON,myID;
console.log(React.version);

class App extends Component {

constructor(props){
super(props);
this.handleAddClick=this.handleAddClick.bind(this);
this.handleDelClick=this.handleDelClick.bind(this);
this.handleContentChange=this.handleContentChange.bind(this);
this.handleTitleChange=this.handleTitleChange.bind(this);

// Structure of object in list
// const note2={
//   id:++id,
//   name:"Note 2",
//   content:"this is the second note ",
// }
this.state={
  list:[]
}
}

componentDidUpdate(){
  myJSON=JSON.stringify(this.state);
  myID=JSON.stringify(id);
  localStorage.setItem("idJSON", myID);
  localStorage.setItem("stateJSON", myJSON);
}

componentDidMount(){
  this.setState(JSON.parse(localStorage.getItem("stateJSON")));
  id=(JSON.parse(localStorage.getItem("idJSON")));
}

handleAddClick(){
  this.setState(prevState => (prevState.list.push({ id: ++id ,name:"" , content:"" })));
  console.log(this.state.list);
}

handleDelClick(id){
  console.log("id:"+id);
  var len=this.state.list.length;
  for(var i=0;i<len;i++){
    if(this.state.list[i].id===id){
      this.setState(prevState => prevState.list.splice(i, 1));
      break; 
    }
  }
}

handleContentChange(id,event){
let temp = [];
temp=this.state.list;
console.log(id+" --- "+event.target.value);
var len=this.state.list.length;
for(var i=0;i<len;i++){
    if(this.state.list[i].id===id){
      temp[i].content = event.target.value;
      this.setState(prevState => (prevState.list : temp));
      console.log(" updated list in loop == "+this.state.list[i].content);
      break; 
    }
}
}

handleTitleChange(id,event){
let temp = [];
temp=this.state.list;
console.log(id+" --- "+event.target.value);
var len=this.state.list.length;
for(var i=0;i<len;i++){
    if(this.state.list[i].id===id){
      temp[i].name = event.target.value;
      this.setState(prevState => (prevState.list : temp));
      console.log(" updated list in loop == "+this.state.list[i].name);
      break; 
    }
}
}

render() {
return (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Notes</h1>
    </header>
    <ViewList list={this.state.list} handleDelClick={this.handleDelClick} handleContentChange={this.handleContentChange} handleTitleChange={this.handleTitleChange} />
    <AddButton handleAddClick={this.handleAddClick} />
  </div>
);
}
}

class ViewList extends Component{

render(){
const noteStyle={
  backgroundColor:"#f2e8b8",
  borderRadius:"0.5em",
  height:"100%",
  padding:"2em",
  margin:"1em",
};

const renderList=(this.props.list).map(
  entry=>(
    <div style={noteStyle}>
    <input type="text" style={inputStyle} placeholder="Enter the title here" onChange={(event)=>{this.props.handleTitleChange(entry.id,event);}} value={entry.name} />
    <br/>
    <textarea  style={inputStyle} placeholder="Enter the Details here"  onChange={(event)=>{this.props.handleContentChange(entry.id,event);}} >{entry.content}</textarea>
    <br/>
    <DeleteButton handleDelClick={()=>{this.props.handleDelClick(entry.id)}} />
    </div>));
    
return (<ul>{renderList}</ul>);
}
}

class AddButton extends Component{

render(){
const addStyle={
  backgroundColor:"#f2e8b8",
  borderRadius:"0.5em",
  height:"100%",
  padding:"0.5em",
  margin:"1em",
  border:"none",
  fontFamily: "'Julius Sans One', sans-serif"
};

return (<button style={addStyle} onClick={this.props.handleAddClick}><b>+</b> Add new Note</button>);
}
}

class DeleteButton extends Component{
render(){
const delStyle={
  backgroundColor:"#e2aaaa",
  borderRadius:"0.5em",
  height:"100%",
  padding:"0.5em",
  margin:"0.5em",
  border:"none",
  fontFamily: "'Julius Sans One', sans-serif"
};
return (<button style={delStyle} onClick={this.props.handleDelClick}>Delete</button>);
}
}

export default App;
