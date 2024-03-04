import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'
function App() {
  const [date, setdate] = useState(null);
  const [items,setItems] = useState([])
  const handleDateChange = async(date) => {
    setdate(date);
    const response = await axios.post('http://localhost:5000/specificDay',{date})
    console.log(response)
  };

  useEffect(async () => {
    const response = await axios.post('http://localhost:5000/getItems')
    setItems(response.data)
  } ,[])

  const submit = async(e,item) => {
    const { checked } = e.target
    const quantity = document.getElementById(`quantity-${item}`).value
    if (checked) {
      try{
        const response = await axios.post('http://localhost:5000/setQuantity',{date,item,quantity})
        console.log(response)
      }catch(error){
        console.error(error)
      }
    }else{
      try{
        const response = await axios.post('http://localhost:5000/unsetQuantity',{date,item})
        console.log(response)
      }catch(error){
        console.error(error)
      }
    }
  } 

  return (
    <div>
      <h2>Select a Date</h2>
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
      />
      {date && <p>Selected Date: {date.toLocaleDateString()}</p>}
      {items.map( item => 
      <div>
      <label>
        {item} : <input type='number' id={`quantity-${item}`} placeholder={"Enter Quantity"}/>
        <input type='checkbox' onClick={(e) => submit(e,item)}/>
      </label> 
      </div>
      )}
    </div>
  );
}

export default App;
