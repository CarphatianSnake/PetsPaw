import './photoGrid.scss'

const PhotoGrid = (props) => {
  return (
    <>
      <div className="photo-grid">
        <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/_6x-3TiCA.jpg")'}} className='forw'><div className="hover-div"></div></div>
        <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg")'}}><div className="hover-div"></div></div>
        <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/BDb8ZXb1v.jpg")'}}><div className="hover-div"></div></div>
        <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/7isAO4Cav.jpg")'}} className='forw'><div className="hover-div"></div></div>
        <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/8D--jCd21.jpg")'}}><div className="hover-div"></div></div>
      </div>
      <div className="photo-grid">
        <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/xnsqonbjW.jpg")'}}><div className="hover-div"></div></div>
        <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/jvg3XfEdC.jpg")'}}><div className="hover-div"></div></div>
        <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/13MkvUreZ.jpg")'}} className='rev'><div className="hover-div"></div></div>
        <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/O3F3_S1XN.jpg")'}} className='rev'><div className="hover-div"></div></div>
        <div style={{backgroundImage: 'url("https://cdn2.thecatapi.com/images/SMuZx-bFM.jpg")'}}><div className="hover-div"></div></div>
      </div>
    </>
  )
}

export default PhotoGrid;