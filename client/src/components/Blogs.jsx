import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../constants/apiurl';


export const Blogs = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get( baseurl+"/api/public/posts/")
        .then(res=> setData(res.data))
        .catch(err=>console.log(err))
    },[])
  return (
    <Container>
        {data.map(item=><Card key={item.id} onClick={()=>navigate("/blog/"+item.id)}>
            <Card.Header>
                <Card.Title>{item.title}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {item.content}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Card.Text>By {item.author_name}</Card.Text>
                
            </Card.Footer>
        </Card>)}
    </Container>
  )
}
