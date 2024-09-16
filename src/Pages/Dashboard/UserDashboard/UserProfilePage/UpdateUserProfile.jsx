import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const UpdateUserProfile = () => {
    const {id} = useParams()
    console.log(id);
    const data = useLoaderData()
    console.log(data);
    return (
        <div>
            {data.user_name}
        </div>
    );
};
export default UpdateUserProfile;