import React from 'react';
import appwriteService from "./../appwrite/config";
import {Link} from "react-router-dom";

function PostCard({
    id,
    title,
    image_url
}) {
    return (
        <Link to={`/post/${id}`}>
            <div className='w-full bg-white rounded-2xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={image_url} alt={title}
                    className='rounded-xl object-fit'
                    />
                </div>
                <h2 className='text-2xl font-bold'>{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard