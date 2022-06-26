import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom'
import PostForm from '../../components/PostForm'
import HomePosts from '../../components/HomePosts/HomePosts'
import Logout from '../../components/Logout/Logout'
import NavBar from '../../components/NavBar/NavBar'

const Home = () => {
    const [user, setUser] = useState()
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/user/logout", {}, { withCredentials: true })
            .then(res => {
                setUser(null)
                navigate('/')
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        axios.get(`http://localhost:8000/api/auth`, { withCredentials: true })
            .then(res => {
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <NavBar/>
            <h1>HOMEPAGE</h1>
            {
                user&&<PostForm userID={user._id}/>
            }
            
            <div className="display-flex-center">
                <HomePosts />
            </div>
            {/* add a new one for recent */}
            
            {user ? <div className="logged">
                <p>
                    Signed in as: {user.firstName} {user.lastName} {user._id}
                </p>
                <button onClick={handleSubmit}>Logout</button>
            </div>
            :
            <Link to="/login">Login</Link>}
        </div>
    )
}

export default Home