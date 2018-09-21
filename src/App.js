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
      skills:'',
      calificacion:'1',
      domicilio:'',
      error:'',
      tabla:null

    }
}

componentWillMount(){
this.getRegistros();
}

getRegistros= ()=>{
  axios({
        method: 'get',
        url:  'http://127.0.0.1:8000/api/verempleados',
    }).then(response => {
          this.setState({
            tabla: response.data.data
          })
          console.log(response.data.data)
    })
    .catch(error => {
        console.log(error);
    })

}
  inputHandler = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
        error:''
      })

  }
  handleChange (date) {
    this.setState({
      fecha_nac: date
    });
  }

  guardarEmpleado = (event) => {
    //console.log(this.state);
        const { name, 
            email,
            puesto,
            fecha_nac,
            domicilio
          } = this.state;

 const skills = [{nombre: this.state.skills, calificacion: this.state.calificacion}]
 const data = {name, 
            email,
            puesto,
            fecha_nac,
            domicilio, skills}



  if(name!='' && email!='' && puesto!='' && fecha_nac!='' && domicilio!='' && skills[0].nombre!='' &&  skills[0].calificacion!='')
  {
    axios({
        method: 'post',
        url:  'http://127.0.0.1:8000/api/register',
        data: data,


    }).then(response => {
            this.getRegistros();
           console.log(response);
    })
    .catch(error => {
        console.log(error);
    })
  }
  else {
    this.setState({
      error: 'Favor de llenar todos los campos.'
    })
  }
    
  }
  render() {
    const { name, 
            email,
            puesto,
            fecha_nac,
            skills,
            calificacion,
            domicilio, 
            error,
            tabla
          } = this.state;

const errorMsj = error!=''?(
  <div><h1 className="alert">{error}</h1></div>
  ):(null);

const bodytable = tabla ? (
  <tbody>

  {tabla.map(user => {
        return (<tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.puesto}</td>
                </tr>
                )})}
</tbody>
  ) : null;



    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="form">
          <span>Nombre</span>
            <input type="text" value={name} onChange={this.inputHandler} name="name"/>
            <span>E-mail</span>
            <input type="text" value={email} onChange={this.inputHandler}  name="email"/>
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
        {errorMsj}

        <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Puesto</th>
          </tr>
        </thead>
          {bodytable}
        </table>
      </div>
    );
  }
}

export default App;
