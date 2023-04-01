import { useState } from "react";
import Result from "../result/Result";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default function InputForm () {

  const [userData, setUserData] = useState({
    date: '',
    distance: '',
    results: []
  });

  const handlerFormChange = (evt) => {
    setUserData((prevData) => ({ ...prevData, [evt.target.name]: (evt.target.value) }));
  };

  const handlerSubmit = (evt) => {
    evt.preventDefault();
    disableSubmitButton(evt.target);

    if (userData.results.find(elem => elem.date === userData.date)) {

      setUserData((prevData) => ({...prevData, results: [
        ...userData.results.reduce((res, elem) => 
        elem.date === userData.date? 
          [...res, { ...elem, distance: (Number(elem.distance) + Number(userData.distance)).toFixed(1) } ] : 
          [...res, elem], [])
      ]
      }))
      setUserData((prevState) => ({ ...prevState, date: '', distance: ''}))
      return
    }

    setUserData((prevData) => ({ ...prevData, results:
      [...userData.results, 
      {
        id: nanoid(8),
        date: userData.date,
        distance: Number(userData.distance).toFixed(1)
      }]
    }));

    if (userData.results.length > 1) {
      setUserData((prevData) => ({...prevData, results: [...prevData.results].sort(sortDates)}))
    }
    
      setUserData((prevState) => ({ ...prevState, date: '', distance: ''}))
  };

  const sortDates = (firstDate, secondDate) => {
    const firstElem = dayjs(firstDate.date);
    const secondElem = dayjs(secondDate.date);
    const diffDays = firstElem.diff(secondElem, 'day');
    if (diffDays > 0) {
      return -1;
    }
    return 1;
  }; 
  

  const disableSubmitButton = (elem) => {
    elem.disabled = true;
    setTimeout(() => {
      elem.disabled = false;
    }, 1000);
  };

  const destroyResult = (resultId) => {
    setUserData((prevState) => ({ results: prevState.results.filter(elem => elem.id !== resultId)}) );
  };

  return (
    <div className="workout">
      <form onSubmit={handlerSubmit}>
        <fieldset className="input-fields">
          <div>
            <label htmlFor="date">Дата</label>
            <br/>
            <input 
              type="date"
              id="date"
              name="date"
              className="input-element"
              value={userData.date || ''}
              onChange={handlerFormChange}
            />
          </div>
          <div>
            <label htmlFor="distance">Дистанция</label>
            <br/>
            <input 
              type="number"
              id="distance" 
              name="distance" 
              className="input-element"
              placeholder="Введите пройденное расстояние" 
              value={userData.distance || ''} 
              onChange={handlerFormChange}
            />
          </div>
          <button onClick={handlerSubmit} className="input-button">Ok</button>
        </fieldset>
      </form>
        <Result newResult={userData.results} destroy={destroyResult}/>
    </div>
  )
}