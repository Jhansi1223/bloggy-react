import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SuspenseLoader from './components/SuspenseLoader.jsx'
const Home = lazy(() => import('./pages/Home.jsx'));
import { AuthLayout } from './components/index.js'
// import { AuthLayout, Login } from './components/index.js'

const Login = lazy(() => import('./components/Login.jsx'))
const AddPost = lazy(() => import('./pages/AddPost'));
const Signup = lazy(() => import('./pages/Signup.jsx'))
const EditPost = lazy(() => import('./pages/EditPost.jsx'))
const Post = lazy(() => import('./pages/Post.jsx'))
const AllPosts = lazy(() => import('./pages/AllPosts.jsx'))

// import AddPost from "./pages/AddPost";
// import Signup from './pages/Signup'
// import EditPost from "./pages/EditPost";

// import Post from "./pages/Post";

// import AllPosts from "./pages/AllPosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: (
                <Suspense fallback={<SuspenseLoader />}>
                    <Home />
                </Suspense>
            ),
        },
        {
            path: "/login",
            element: (
                 <AuthLayout authentication={false}>
                    <Suspense fallback={<SuspenseLoader />}>
                        <Login />
                    </Suspense>                 
                 </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Suspense fallback={<SuspenseLoader />}>
                        <Signup />
                    </Suspense>   
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Suspense fallback={<SuspenseLoader />}>
                        
                        <AllPosts />
                    </Suspense>   
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Suspense fallback={<SuspenseLoader />}>
                        
                        <AddPost />
                    </Suspense>   
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Suspense fallback={<SuspenseLoader />}>
                        <EditPost />
                    </Suspense>   
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Suspense fallback={<SuspenseLoader />}>
                        <Post />
                    </Suspense>   
                </AuthLayout>
            ),
        },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </>,
)