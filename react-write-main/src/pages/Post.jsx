import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { DELETE_POST_URI, GET_POST_BY_ID } from "../appwrite/backendUrls";

export default function Post() {
    console.log("In Post Component")
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    console.log("The userData --> ",userData);
    

    const isAuthor = post && userData ? post.user.email === userData.email : false;

    useEffect(() => {
        if (slug) {
            fetch(GET_POST_BY_ID + `?id=${slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            .then(response => response.json())
            .then((data) => {
                if(data.error) navigate("/");
                else {
                    console.log("The Post Data in Post Component -->" ,data);
                    
                    setPost(data.data)
                };
            })
            .catch((error) => {
                console.log("Error While fetching the post by id"); 
            })


            // appwriteService.getPost(slug).then((post) => {
            //     if (post) setPost(post);
            //     else navigate("/");
            // });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = async () => {
        try {
            if (post) {
                const res = await fetch(DELETE_POST_URI + `/${post.id}`, {
                    method: "DELETE",
                    credentials: "include"
                })
                const response = await res.json();
                if (!response.error) {
                    navigate("/")
                }
            }

            
        } catch (error) {
            console.log("Error while deleting the post");
            
        }
        
    };

    return post ? (
        <div className="py-8 bg-[#f5f5f7]">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 bg-white">
                    <img
                        src={post.image_url}
                        alt={post.title}
                        className="rounded-xl object-fill h-96"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 bg-white">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css bg-white">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}