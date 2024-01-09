import React, { useState,useEffect } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {

 const capitalize= (string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
 
    // document.title =`NewsTime - ${capitalize(props.category)}`
  

  const updateNews = async()=>{
    props.setProgress(10);
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=036388b1c8524457966a5b7571c5496a&page=${page}&pageSize=${props.pageSize}`;
    setLoading( true)
    let data = await fetch(url);
    props.setProgress(30)
    let parsedata = await data.json()
    props.setProgress(70)
    //console.log(parsedata)
    setArticles(parsedata.articles)
    setTotalResults( parsedata.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
}, [])

  // const handleprevchange = async()=>{
  //   setPage(page-1)
  //   updateNews()
  // }

  // const handlenextchange = async()=>{
  //     setPage(page+1)
  //     updateNews()
  // }

  const fetchMoreData = async() =>{
    setPage(page+1)
      let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=036388b1c8524457966a5b7571c5496a&page=${page+1}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedata = await data.json()
      //console.log(parsedata)
      setArticles(articles.concat(parsedata.articles))
      setTotalResults(parsedata.totalResults)
      setLoading(false)
  }

  
    return (
      <>
        <h1 className="text-center" style={{margin: "30px 0px"}}>NewsTime-Top Headline of {capitalize(props.category)}</h1>
        {loading &&<Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <Newsitem
              title={element.title?element.title:""}
              description={element.description?element.description:""}
              imageUrl={element.urlToImage}
              newsUrl={element.url} author ={element.author} date = {element.publishedAt} source ={element.source.name}
            />
          </div>
          })}
         </div>
         </div>
         </InfiniteScroll>
      
      </>
    );
  }

News.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "general",
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News;
