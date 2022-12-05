import React from 'react'
import { useQuery } from 'react-query';
import * as api from './usersApi';
import { useState } from 'react';
import UserForm from './UserForm';

function UserDetail({ userId }) {
    const [isEditing, setIsEditing] = useState(false);

    const { data, isLoading, isFetching } = useQuery(['user', userId], () =>
        api.getUser(userId), {
        enabled: Boolean(userId)   // userId가 있는경우만 useQuery를 작동
    });

    if (!userId) {
        return 'Select a user.'
    }

    if (isLoading) {
        return 'Loading user details'
    }

    return (
        <div>
            {isFetching && 'Background refetching...'} {/* 캐시에 한번 불러왔던 데이터를 다시 가져올때 (디폴트로 5분 저장) */}
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'CANCEL' : 'EDIT'}
            </button>

            {isEditing ? (
                <UserForm data={data} setIsEditing={setIsEditing} />
            ) : (<>
                <h2>id : {data?.id}</h2>
                <h2>name : {data?.name}</h2>
                <h2>email : {data?.email}</h2>
            </>)}
        </div>
    )
}

export default UserDetail
