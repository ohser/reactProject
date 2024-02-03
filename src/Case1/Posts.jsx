import React from 'react'

import Post from './Post';

export default function Posts(props) {
    return (
        <div>
            {props.posts.map((item) => {
                return (
                    <Post key={item.id} user={item} userid={item.userId} />
                );
            })}
        </div>
    )
}
