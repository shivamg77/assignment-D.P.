import React from 'react';
import { Link } from "react-router-dom";
import { getUersList } from './Apii'
import './App.css'

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            users: [],
            filter: [],
            suggestion: [],
            inputVal: ''
        }
    }

    async componentDidMount(){
        const res = await getUersList()
        if(res.status){
            this.setState({users: res.data, filter: res.data})
        }
    }

    handelChange = (e) => {
        const { users } = this.state
        const inputVal = e.target.value
        const regex = new RegExp(/\d/g)
        let filterData = []
        let suggestion = ''

        if(inputVal){
            if(regex.test(inputVal)){
                users.forEach(element => {
                    const id = String(element.id)
                    if(id.search(inputVal) !== -1){
                        filterData.push(element)
                    }
                });
            }else{
                suggestion = '<ul>'
                users.forEach(element => {
                    const name = String(element.name).toLowerCase()
                    if(name.search(inputVal.toLowerCase()) !== -1){
                        suggestion += `<li>${element.name}</li>`
                    }
                });
                suggestion += '</ul>'
                filterData = [ ...users ]
            }
        }else{
            filterData = [ ...users ]
        }

        this.setState({inputVal, filter: filterData, suggestion})
    }

    render(){
        const { filter, inputVal, suggestion } = this.state
        return (
            <div style={{textAlign: "center", marginTop: "20px"}}>
                <input value={inputVal} type="text" placeholder="Search here..." onChange={(e)=>this.handelChange(e)}/>
                <div className="suggestion" dangerouslySetInnerHTML={{__html: suggestion}}/>
                <table align="center" cellSpacing={20}>
                    <thead>
                        <tr>    
                            <th>User Id</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        filter.length > 0 ?
                        filter.map((val,key)=>{
                            return(
                                <tr key={key}>
                                    <td>
                                        { val.id }
                                    </td>
                                    <td>
                                        <Link to={`/user-post/${val.id}`}>{ val.name }</Link>
                                    </td>
                                </tr>
                            )
                        }) : 
                        <tr>
                            <td colSpan="2">
                                No Data Found!
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
