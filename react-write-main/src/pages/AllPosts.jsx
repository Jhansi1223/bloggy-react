import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
import { GET_POSTS } from '../appwrite/backendUrls';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(authStatus){
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
    }, [])
  
    if(authStatus) {
        if(!loading && posts.length === 0) {
            return(
                <div className="w-full py-8 text-center h-screen bg-slate-300">
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
                <div className='w-full py-8 bg-slate-300 h-screen'>
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
                <div className="w-full py-8 text-center h-screen bg-slate-300">
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
        <div className="w-full py-8 text-center h-screen bg-slate-300">
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

export default AllPosts