import { useQuery } from 'urql'
import Loading from './loading'
import Alert from './alert'

const Articles = ({uid}) => {

    console.log(uid);

    const [result] = useQuery({
        query: `query{ users{                    
                    id              
                    userName
                    age
                }
            }`,
    });

    const { fetching, data, error } = result;

    if(error)    
        return <Alert message={error} />

    console.log("data" + data);    

    return fetching ? <Loading /> :
        <div className="pa3 pa5-ns" style={{textAlign: "center"}}>        
            <div className="row">
            {data.users.map((user) => (
                <a className="card">
                    <h3>{user.userName}</h3>
                    <p>{user.age}</p>
                </a>
            ))}
            </div>            
        </div>    
}

export default Articles;