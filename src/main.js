import './style.css'
import crud from '/crud.png'
import { usersApp } from './users/use-cases/users-app'



document.querySelector('#app').innerHTML = `
  <div>
 
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${crud}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>CRUD</h1>
    <div class="card">
    
    </div>
   
  </div>
`

const element = document.querySelector('.card')

usersApp( element );
