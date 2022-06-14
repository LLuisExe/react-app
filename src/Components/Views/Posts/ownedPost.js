import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Posts from './myPost'

const PostsOwned= ({username}) => {
    const [posts, setPosts] = useState({
        status: 'DONE',
        data: null,
    });

    useEffect(() => {
        async function getPosts() {
            const { data: response } = await axios.get('https://posts-pw2021.herokuapp.com/api/v1/post/owned?limit=12&page=0', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setPosts({ status: 'DONE', data: response.data });
        }

        getPosts();
    }, []);

    return (
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-full m-2 flex flex-wrap justify-center">
            {
                posts.data && posts.data.map((it) => <Posts username={username} struct={it} />)
            }
        </div>
    );
};

export default PostsOwned;