import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../components/index";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ButtonLoader from "./ButtonLoader";
import {CREATE_POST_URI, UPDATE_POST_URI} from "../appwrite/backendUrls.js";
import FullScreenLoader from "./FullScreenLoader.jsx";

export default function PostForm({ post }) {

    console.log("In Post Form");

    console.log("The Post in Post Form as prop is --> ", post);

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.active ? "active" : "inactive"
        },
    });

    const [buttonLoading, setButtonLoading] = useState(false);

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

   

    const submit = async (data) => {
        try {
            // Show the loader
            setButtonLoading(true);
    
    
            const formData = new FormData();
            const title = data.title;
            const image = data.image[0] ? data.image[0] : null;
            const slug = data.slug;
            const active = data.status === "active";
            const content = data.content;
    
            formData.append("title", title);
            formData.append("slug", slug);
            formData.append("active", String(active));
            formData.append("content", content);
            if (image) {
                formData.append("image", image);
            }
    
            let response;
    
            if (post) {
                response = await fetch(`${UPDATE_POST_URI}/${post.id}`, {
                    method: "PUT",
                    body: formData,
                    credentials: "include",
                });
            } else {
                response = await fetch(CREATE_POST_URI, {
                    method: "POST", // Use POST for creating new posts
                    body: formData,
                    credentials: "include",
                });
            }
    
            const result = await response.json();
    
            if (!result.error) {
                navigate(`/post/${result.data.id}`);
            } else {
                console.error("Error:", result.error);
            }

        } catch (err) {
            console.error("Error while updating the post", err);
        } finally {
            // Hide the loader
            setButtonLoading(false);
        }

    };
    

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <>
        
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={post.image_url}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {buttonLoading ? <ButtonLoader /> : post ? "Update" : "Submit"}
                </Button>
            </div>
            
        </form>
        {buttonLoading && (<div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-blue-500">Loading...</p>
      </div>
    </div>)}
    </>);
    
}