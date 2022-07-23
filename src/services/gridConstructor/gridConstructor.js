import { nanoid } from "@reduxjs/toolkit"

const gridConstructor = (arr, innerElement = null) => {
  
  const gridStyles = (arr) => {
    let gridRowStart = 1
    let gridRowEnd = 3

    const gridRowPlus = (n) => {
      gridRowStart = gridRowStart + n
      gridRowEnd = gridRowEnd + n
    }

    return arr.map((item, i) => {

      const gridBase = Math.floor(i / 10) * 10

      const _class = 'photo-grid-item'
      const classesBase = `${_class}${item.url ? '' : ' no-photo'}`
      const stylesBase = {backgroundImage: `url(${item.url})`}

      const gridElementStyles = (classes, start, end, n) => {
        const result = {
          classes: `${classesBase} ${classes}`,
          styles: {...stylesBase, gridRow: `${start}/${end}`}
        }
        gridRowPlus(n)
        return result
      }

      switch (i) {
        case 0 + gridBase:
          return gridElementStyles(`${_class}_vert ${_class}_vert_col-left`, gridRowStart, gridRowEnd, 1)
        case 3 + gridBase:
          return gridElementStyles(`${_class}_big-square ${_class}_big-square_col-right`, gridRowStart, gridRowEnd, 2)
        case 7 + gridBase:
          return gridElementStyles(`${_class}_vert ${_class}_vert_col-right`, gridRowStart, gridRowEnd, 1)
        case 8 + gridBase:
          return gridElementStyles(`${_class}_big-square ${_class}_big-square_col-left`, gridRowStart, gridRowEnd, 2)
        default: return {styles: stylesBase, classes: classesBase}
      }
    })
  }

  const gridArray = gridStyles(arr)

  return arr.map((item, i) => {

    const {styles, classes} = gridArray[i]

    return (
        <div
          key={nanoid()}
          style={styles}
          className={classes}>
            {innerElement === null ? null : innerElement(item.name, item.id, item.favId)}
        </div>
      )
  })

}

export default gridConstructor