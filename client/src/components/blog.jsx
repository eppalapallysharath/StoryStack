import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseurl } from '../constants/apiurl'
import Spinner from 'react-bootstrap/Spinner';

export const Blog = () => {
    const {id} = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        axios.get(`${baseurl}/api/public/posts/${id}/`)
        .then(res=> {setData(res.data), setLoading(false)})
        .catch(er=>{console.log(er), setLoading(false)})
    },[])
  return (
    <div>
        {loading ? <><Spinner animation="border" /> <span>Loading....</span></>  : <> <h3>{data.title}</h3> <p>{data.content}</p> </>}
    </div>
  )
}
