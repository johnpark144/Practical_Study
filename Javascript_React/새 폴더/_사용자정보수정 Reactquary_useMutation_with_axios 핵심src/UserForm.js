import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateUser } from './usersApi';
import * as api from './usersApi';

function UserForm({ data, setIsEditing }) {

    const [fields, setFields] = useState({ ...data });
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation(api.updateUser, {
        onMutate: (updatedUser) => {
            queryClient.setQueryData(['user', data.id], updatedUser);
        }, // 방법1) updatedUser = fields 로 가져오기때문에 서버에서 불러옴 없이 데이터를 실시간으로 보여줌
        onSuccess: () => {
            // queryClient.invalidateQueries(['user', data.id])
            // 방법2) 유효성을 제거하여 캐싱되어있는 데이터를 보여주지 않고 서버에 새롭게 데이터를 요청
            setIsEditing(false);
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(fields) // 서버에 데이터를 수정
    }

    if(isLoading){
        return 'Saving your changes...';
    }

    return (
        <div style={{ paddingTop: 20 }}>
            <form onSubmit={handleSubmit}>
                <label>
                    name:{''}
                    <input
                        name='name'
                        type='text'
                        value={fields.name}
                        onChange={handleChange}
                        style={{ width: '100%', marginBottom: 20 }}
                    />
                </label>
                <label>
                    email:{''}
                    <input
                        name='email'
                        type='email'
                        value={fields.email}
                        onChange={handleChange}
                        style={{ width: '100%', marginBottom: 70 }}
                    />
                </label>
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default UserForm
