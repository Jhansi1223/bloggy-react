import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux';
import { GET_POSTS, GET_USER } from '../appwrite/backendUrls';

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (authStatus) {
            fetch(GET_POSTS, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }).then((response) => {
                return response.json();
            }).then((res) => {
    
                if(!res.error && res?.data?.length) {
                    setPosts(res.data);
                }
            }).catch((err) => {
                console.log("Error While Loading Posts --> ", err);
                
            }).finally(() => {
                setLoading(false);
            })
        }
        
    }, [authStatus])
  
    if(authStatus) {
        if(!loading && posts.length === 0) {
            return(
                <div className="w-full py-8 text-center h-screen bg-[#f5f5f7]">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    there are no posts to show
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            )
        } else if (!loading) {
            return(
                <div className='w-full py-8 bg-[#f5f5f7] h-screen'>
                    <Container>
                        <div className='flex flex-wrap'>
                            {posts.map((post) => (
                                <div key={post.id} className='p-2 w-1/4'>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            )
        } else {
            return(
                <div className="w-full py-8 text-center h-screen bg-[#f5f5f7]">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    Loading...
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            )
        }
    }
    return (
        <div className="w-full py-8 text-center h-screen bg-[#f5f5f7]">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>    
    )
}

export default Home