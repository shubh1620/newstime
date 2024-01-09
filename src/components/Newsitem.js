import React from 'react'

const Newsitem = (props)=> {

    let {title, description,imageUrl,newsUrl,author,date,source} = props
    return (
      <div className='my-3'>
        <div className="card" >
        <span className="position-absolute badge rounded-pill bg-danger npm  " style={{ zIndex:"1"}}>{source}</span>
            <img src={!imageUrl?"https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/cf9b4de9bfabb4eaa0446fe098824194.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small >By {!author?"Unkown":author} on {new Date (date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
      
    )
}

export default Newsitem
