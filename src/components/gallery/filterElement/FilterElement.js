

const FilterElement = (props) => {

  const {name} = props

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
      selectType = [...breed]
      break
  }

  return (
    <div className="filter-element">
      <label className='gallery-label' htmlFor={name}>{name}</label>
      <select name={name} className='gallery-select'>
        {selectType.map((item, i) => {
          return (
            <option key={i} value={item}>
              {item}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default FilterElement