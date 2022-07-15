import { useDispatch, useSelector } from 'react-redux'
import { getOrder, getType, getBreed, getLimit } from '../gallerySlice'
import { getBreedsList } from '../../breeds/breedsSlice'


const FilterElement = (props) => {

  const {name, data} = props

  const dispatch = useDispatch()
  const breedsList = useSelector(getBreedsList)

  const order = ['Random', 'Desc', 'Asc']
  const type = ['All', 'Static', 'Animated']
  const limit = ['5 items per page', '10 items per page', '15 items per page', '20 items per page']
  const breed = ['None']

  let selectType = []

  switch (name) {
    case 'Order':
      selectType = [...order]
      break
    case 'Type':
      selectType = [...type]
      break
    case 'Limit':
      selectType = [...limit]
      break
    case 'Breed':
      selectType = [...breed].concat(data.map(item => item.name))
      break
  }

  const onFilter = (e) => {
    const value = e.target.value
    switch (name) {
      case 'Order':
        dispatch(getOrder(value))
        break
      case 'Type':
        dispatch(getType(value))
        break
      case 'Limit':
        dispatch(getLimit(value))
        break
      case 'Breed':
        dispatch(getBreed(breedsList.filter(item => item.name === value)[0].id))
        break
    }
  }

  return (
    <div className="filter-element">
      <label className='gallery-label' htmlFor={name}>{name}</label>
      <select name={name} onChange={(e) => onFilter(e)} className='gallery-select'>
        {selectType.map((item, i) => {
          return (
            <option key={i} value={name === 'Limit' ? item.replace(/\D/g, '') : item}>
              {item}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default FilterElement