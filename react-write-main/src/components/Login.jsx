import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {login as storeLogin} from "../store/authSlice";
import {Button, Input, Logo} from "./index";
import authService from '../appwrite/auth';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import { GET_USER, LOGIN_URI } from "../appwrite/backendUrls.js";
import ButtonLoader from "../components/ButtonLoader.jsx"




function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async function(data) {
        console.log("On Submit clicked");
        setLoading(true)
        
        setError("");
        try {

            const response = await fetch(LOGIN_URI, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const responseBody = await response.json();
            
            
            if (responseBody?.error) {
                setError(responseBody.message);
            } else {
                console.log("In loggong");
                
                dispatch(storeLogin(responseBody.data.user));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);

    }




    return (
        <div className='w-full flex flex-col items-center justify-center bg-[#f5f5f7] h-screen'>
            <div className='mx-auto w-full max-w-lg rounded-xl p-10 bg-white shadow-2xl'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%'/>
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Sign in to your account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Dont&apos;t have an account?&nbsp;
                    <Link to="/signup" className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input 
                        label="Email: "
                        placeholder="Enter your email" 
                        type="email"
                        {...register("email",{
                            required: true,
                            validate: {
                                matchPattern: (value) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"

                            }
                        })}  
                        />
                        <Input 
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password",{
                            required: true
                        })}
                        />
                        <Button type="submit" className="w-full">{!loading ? "Sign In" : <ButtonLoader /> }</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;