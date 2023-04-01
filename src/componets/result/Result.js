import dayjs from 'dayjs';

export default function Result (props) {

  const {newResult = [], destroy} = props;

  const renderResults = () => newResult.map((elem) => (
    <li key={elem.id} className="result-line">
      <span>{dayjs(elem.date).format('DD.MM.YYYY')}</span> 
      <span>{elem.distance}</span>
      <span className="material-icons" onClick={ () => destroy(elem.id) }>close</span>
    </li>
  ));

  return (
    <div className='result-tablet'>
      <ul> 
        <li className='result-line'>
          <span>Дата</span>
          <span>Дистанция</span>
          <span>Действия</span>
        </li>
        <div className="tablet-wrap">
          {renderResults()}
        </div>
      </ul>
    </div>
  )
}
