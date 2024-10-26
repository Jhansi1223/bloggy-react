import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';
import {GET_POST_BY_ID} from "../appwrite/backendUrls.js";

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            fetch(GET_POST_BY_ID + `?id=${slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
                .then((res) => res.json())
                .then((response) => {
                    if (!response.error) {
                        console.log("The Post fetched successfully In Edit Post Component --> ", response.data);
                        setPosts(response.data);
                    }

                })
                .catch((err) => console.log("Error while editing post"));
        } else {
            navigate("/");
        }




        // if (slug) {
        //     appwriteService.getPost(slug).then((post) => {
        //         if (post) {
        //             setPosts(post)
        //         }
        //     })
        // } else {
        //     navigate('/')
        // }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
        <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost