import React, { useState, useEffect } from 'react';
import profile_pic from '../assets/profile.png'
import axios from 'axios';
import bg_logo from '../assets/bg_logo.svg'

function Home(props) {

    const [users, setUsers] = useState([])
    const [friends, setFriends] = useState([])
    const [inReqs, setInReqs] = useState([])
    const [pendingReq, setPenReq] = useState([])
    const [rejectedReq, setRejRes] = useState([])
    const [loginStatus, setLoginStatus] = useState(0)
    const [tabId, setTabId] = useState(0)
    var loggedInUser = localStorage.getItem('email')

    useEffect( () => {
        if('email' in localStorage){
            setLoginStatus(1)
        }
        // axios.get("http://localhost:5000/get-users")
        //     .then(
        //         res => { setUsers(res.data) },
        //         err => {}
        //     )     
    })

    const sendRequest = (email) => {
        var reqData = {
            sender : loggedInUser,
            receiver : email
        }
        axios.post("http://localhost:5000/friend-req",reqData)
        .then(
            res => { console.log(res.data) },
            err => {}
        ) 
    }

    const acceptReq = (email) => {
        var reqData = {
            sender : loggedInUser,
            receiver : email
        }
        axios.post("http://localhost:5000/accept-req",reqData)
        .then(
            res => { console.log(res.data) },
            err => {}
        )
    }

    const rejectReq = (email) => {
        var reqData = {
            sender : loggedInUser,
            receiver : email
        }
        axios.post("http://localhost:5000/reject-req",reqData)
        .then(
            res => { console.log(res.data) },
            err => {}
        )
    }

    const toggleTab = (id) => {
        setTabId(id)
        var reqData = {
            sender : loggedInUser,
        }

        if(id ===1 ){
            axios.post("http://localhost:5000/get-friends",reqData)
            .then(
                res => { setFriends(res.data) },
                err => {}
            )  
        }
        if(id === 2){
            axios.post("http://localhost:5000/get-users",reqData)
            .then(
                res => { setUsers(res.data) },
                err => {}
            )  
        }
        if(id === 3){
            axios.post("http://localhost:5000/get-in-req",reqData)
            .then(
                res => { setInReqs(res.data) },
                err => {}
            )  
        }
        if(id === 4){
            axios.post("http://localhost:5000/get-pend-req",reqData)
            .then(
                res => { setPenReq(res.data) },
                err => {}
            ) 
        }
        if(id === 5){
            axios.post("http://localhost:5000/get-rej-req", reqData)
            .then(
                res => { setRejRes(res.data) },
                err => {}
            )
        }
    }

    return (
        <div>
            <div className="main-home">
                <div className="left-home">
                    <ul>
                        <li>
                            <button className={tabId===1? 'cta-02': 'btn'} onClick={() => toggleTab(1)}>My Friends</button>
                        </li>
                        <li>
                            <button className={tabId===2? 'cta-02': 'btn'} onClick={() => toggleTab(2)}>View All Users</button>
                        </li>
                        <li>
                            <button className={tabId===3? 'cta-02': 'btn'} onClick={() => toggleTab(3)}>View Requests</button>
                        </li>
                        <li>
                            <button className={tabId===4? 'cta-02': 'btn'} onClick={() => toggleTab(4)}>Pending Requests</button>
                        </li>
                        <li>
                            <button className={tabId===5? 'cta-02': 'btn'} onClick={() => toggleTab(5)}>Rejected Requests</button>
                        </li>
                    </ul>
                </div>
                <div className="right-home">
                    { loginStatus ?
                    <div className="user-info">
                        { 
                        tabId === 1 ? 
                        <table>
                            <h1>My Friends</h1>
                            { friends.length ? 
                            <tbody>
                        { friends.map(user => (
                            <tr>
                                <td width="10rem">
                                    <img src={profile_pic} alt="" />
                                </td>
                                <td width="100%">                              
                                    <p>{ user }</p>                               
                                </td>
                                <td width="10%">
                                    <button className='cta-02'>Friends</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        : <div className="empties">
                            <h6>Friend list is Empty</h6>
                        </div>}
                        </table>
                        : 
                        tabId === 2 ? 
                            <table>
                                <h1>Users</h1>
                        { users.length ? 
                            <tbody>
                        {users.filter(user => user != null).map(filteredUser => (
                            <tr>
                                <td>
                                    <img src={profile_pic} alt="" />
                                </td>
                                <td>                              
                                    <p>{filteredUser.userEmail}</p>                               
                                </td>
                                <td>
                                    <button onClick={()=>sendRequest(filteredUser.userEmail)} className='cta-02'>Send Request</button>
                                </td>
                            </tr>
                        )
                        )}
                        </tbody>
                        :
                        <div className="empties">
                            <h6>No users</h6>
                        </div>}
                        </table>
                        : 
                        tabId === 3 ? 
                        <table>
                            <h1>Incoming Requests</h1>
                        { inReqs.length ? 
                            <tbody>
                        { inReqs.map(user => ( 
                            <tr>
                                <td>
                                    <img src={profile_pic} alt="" />
                                </td>
                                <td>                              
                                    <p>{ user }</p>                               
                                </td>
                                <td>
                                    <button onClick={()=>acceptReq(user)} className='cta-02'>Accept</button>
                                </td>
                                <td>
                                    <button onClick={()=>rejectReq(user)} className='cta-02'>Reject</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        : <div className="empties">
                        <h6>No Incoming Requests</h6>
                    </div>}
                        </table>
                        : 
                        tabId === 4 ?
                        <table>
                            <h1>Pending Requests</h1>
                        { pendingReq.length ?
                            <tbody>
                        {pendingReq.map( user => ( 
                            <tr>
                                <td>
                                    <img src={profile_pic} alt="" />
                                </td>
                                <td>                              
                                    <p>{ user }</p>                               
                                </td>
                                {/* <td>
                                    <button>Send Request</button>
                                </td> */}
                            </tr>
                        ))}
                        </tbody>
                        : <div className="empties">
                            <h6>Pending Requests list is Empty</h6>
                        </div>}
                        </table> 
                        : 
                        tabId === 5 ?
                        <table>
                            <h1>Rejected Requests</h1>
                        {rejectedReq.length ?
                            <tbody>
                        { rejectedReq.map( user => ( 
                            <tr>
                                <td>
                                    <img src={profile_pic} alt="" />
                                </td>
                                <td>                              
                                    <p>{ user }</p>                               
                                </td>
                                {/* <td>
                                    <button>Send Request</button>
                                </td> */}
                            </tr>
                        ))}
                        </tbody>
                        : <div className="empties">
                            <h6>Rejected Users list is Empty</h6>
                        </div>}
                        </table> 
                        : <h1>Empty List</h1>
                        }
                    </div> : 
                    <div className="bg-logo">
                        <img src={bg_logo} alt="" />
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;