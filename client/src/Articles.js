import React from 'react'
import { useQuery } from 'urql'
import Loading from './components/Loading'
import Alert from './components/Alert'


import img from './img/logo.png';

const Articles = ({uid}) => {

    console.log(uid);

    const [result] = useQuery({
        query: `query{
            articles{
                  artist
                  track
                  album
                  content
                  tags
                  img
                }
            }`,
    });

    const { fetching, data, error } = result;

    if(error)    
        return <Alert message={error} />

    console.log("data" + data);    

    return fetching ? <Loading /> :
        <div className="pa3 pa5-ns">        
            {data.articles.map((article) => (
                <div className="row">
                <div className="db center mw5 mt5 black link">

                <img className="db ba b--black-10 dim pointer" alt="Frank Ocean Blonde Album Cover" src={require("./img/" + article.img)}/>
                    <dl className="mt2 f6 lh-copy article-container">
                        <h2>{article.artist}</h2>
                        <dd className="ml0 fw9">{article.track}</dd>
                        <dt className="clip">Album</dt>
                        <dd className="ml0 gray">{article.album}</dd>
                    </dl>
                    <div>                        
                        <ul className="f5 lh-copy measure-narrow haiku" style={{listStyle: 'none', display: 'contents'}}>
                        {article.content.map((line) => (
                            <li>{line}</li>
                        ))}
                        </ul>                        
                    </div>
                </div>
                </div>        
            ))}
        </div>    
}

export default Articles;