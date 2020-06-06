import React from 'react';
import { getUersPost } from './Apii'

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            posts : []
        }
    }

    async componentDidMount(){
        const { id } = this.props.match.params
        const res = await getUersPost(id)
        if(res.status){
            this.setState({posts: res.data})
        }
    }

    render(){
        const { posts } = this.state
        return (
            <div style={{textAlign: "center", marginTop: "20px"}}>
                {
                    posts.length > 0 ?
                    posts.map((val,key)=>{
                        return(
                            <div key={key}>
                                <h3>{val.title}</h3>
                                <p dangerouslySetInnerHTML={{__html: val.body}}/>
                                <hr/>
                            </div>
                        )
                    }) : <p>Lading . . . .</p>
                }
            </div>
        );
    }
}

export default App;
