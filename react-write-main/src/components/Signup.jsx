import React, {useState} from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import {Button, Input, Logo} from "./index";
import { useForm } from 'react-hook-form';
import {login as storeLogin} from "./../store/authSlice";
import { useDispatch } from 'react-redux';
import ButtonLoader from "./ButtonLoader.jsx";
import {SIGN_UP_URI} from "../appwrite/backendUrls.js";

function Signup() {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const signup = async (data) => {
        setError("");
        setLoading(true);
        try {

            console.log(data)

            const res = await fetch(SIGN_UP_URI, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            })

            const response = await res.json();

            if (!response.error) {
                const currentUser = response.data.user;
                console.log("The currentUser --> ", currentUser);
                
                if (currentUser) {
                    dispatch(storeLogin(currentUser));
                    navigate("/");
                }
            }

            // const userData = await authService.createAccount(data);
            // if (userData) {
            //     const currentUser = authService.getCurrentUser();
            //     if (currentUser) {
            //         dispatch(storeLogin(currentUser));
            //         navigate("/");
            //     }
            // }

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
        

    }


    return (
        <div className="flex items-center justify-center bg-[#f5f5f7] h-screen">
            <div className="mx-auto w-full max-w-lg rounded-xl p-10 bg-white shadow-2xl">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                            />
                        <Button type="submit" className="w-full">
                            {loading ? <ButtonLoader /> : "Create Account"}
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup