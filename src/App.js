import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import moment from 'moment/min/moment-with-locales';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



class App extends Component {
constructor() {
    super();
    this.state = {
      name:'',
      email:'',
      puesto:'',
      fecha_nac:moment(),
      skills:[{"nombre":"Responsabilidad","calificacion":5},
{"nombre":"Honestidad","calificacion":4}],
      calificacion:'',
      domicilio:''


    }
}
  inputHandler = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })

  }
  handleChange (date) {
    this.setState({
      fecha_nac: date
    });
  }

  guardarEmpleado = (event) => {
    //console.log(this.state);

    axios({
        method: 'post',
        url:  'http://127.0.0.1:8000/api/register',
        data: this.state,
    }).then(response => {

           console.log(response);
    })
    .catch(error => {
        console.log(error);
    })
  }
  render() {
    const { name, 
            email,
            puesto,
            fecha_nac,
            skills,
            calificacion,
            domicilio
          } = this.state;


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <span>Nombre</span>
            <input type="text" value={name} onChange={this.inputHandler} name="name"/>
            <span>E-mail</span>
            <input type="email" value={email} onChange={this.inputHandler}  name="email"/>
            <span>Puesto</span>
            <input type="text" value={puesto} onChange={this.inputHandler}  name="puesto"/>
            <span>Fecha Nacimiento</span>
           <DatePicker selected={fecha_nac} onChange={this.handleChange.bind(this)} />

            <span>Domicilio</span>
            <input type="text" value={domicilio} onChange={this.inputHandler}  name="domicilio"/>
            <span>Skills</span>
            <input type="text" value={skills} onChange={this.inputHandler}  name="skills"/>
            <select value={calificacion} onChange={this.inputHandler} name="calificacion">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button onClick={this.guardarEmpleado} type="button">Envíar</button>
        </div>
      </div>
    );
  }
}

export default App;
