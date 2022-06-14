import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Posts from './Posts';

const PostsContainer = ({username}) => {
    const [posts, setPosts] = useState({
        status: 'DONE',
        data: null,
    });
    const[page, setPage] = useState(0);

    useEffect(() => {
        async function getPosts() {
            const { data: response } = await axios.get('https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=12&page=0', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setPosts({ status: 'DONE', data: response.data });
        }

        getPosts();
    }, []);

    const nextPage = ()=> {
        try {
            setPage(page+1);
            
            async function getPosts() {
            const { data: response } = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=12&page=${page}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setPosts({ status: 'DONE', data: response.data });
            }
            
            getPosts();
          
        } catch (error) {
            console.log(error);
        }
    }
    const previousPage=() => {
        try {          
            setPage(page-1);
            async function getPosts() {
            const { data: response } = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=12&page=${page}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setPosts({ status: 'DONE', data: response.data });
            }
            
            getPosts();   
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="border-4 border-dashed border-gray-300 rounded-lg h-full m-2 flex flex-wrap justify-center">
                {
                    posts.data && posts.data.map((it) => <Posts username={username} struct={it} />)
                }
            </div>
            <div className="flex justify-between">
            <button className="bg-indigo-800 rounded-full text-white w-20 h-8" onClick={previousPage}>
                Anterior
            </button>
            <button className="bg-indigo-800 rounded-full text-white w-20 h-8" onClick={nextPage}>
                Siguiente
            </button>
            </div>
        </div>
    );
};

export default PostsContainer;