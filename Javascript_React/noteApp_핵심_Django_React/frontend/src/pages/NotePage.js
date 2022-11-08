import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from "../context/AuthContext";


export default function NotePage({ getNotes }) {
    const { id } = useParams();
    const [note, setNote] = useState(null)
    const { user, logoutUser, authTokens } = useContext(AuthContext)

    const navigate = useNavigate();

    useEffect(() => {
        let getNote = async () => {
            if (id === 'new') return

            let response = await fetch(`/api/notes/${id}/`)
            let data = await response.json()

            if(response.status === 200) {
                setNote(data)
            }else if(response.statusText === 'Unauthorized') {  // 토큰이 만료될때 자동 로그아웃
                logoutUser()
            }
        }
        getNote()
    }, [id])

    const createNote = async () => {
        if (note !== null) {
            await fetch(`/api/notes/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify({
                    body : note,
                    user : user.user_id,
                }),
            })
        }
        navigate('/')
    }

    const updateNote = async () => {
        if (id !== 'new') {
            if (!note) {
                deleteNote()
            } else {
                await fetch(`/api/notes/${id}/`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        body : note,
                        user : user.user_id,
                    })
                })
                navigate('/')
            }
        } else {
            navigate('/')
        }
    }

    const deleteNote = async () => {
        await fetch(`/api/notes/${id}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        navigate('/')
    }

    return (
        <div className="note">
            <div className="note-header">
                <span style={{ cursor: 'pointer' }} onClick={updateNote} className="material-icons-outlined">
                    arrow_back_ios
                </span>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>
                        Delete
                    </button>
                ) : (
                    <button onClick={createNote}>
                        Done
                    </button>
                )
                }
            </div>
            <textarea onChange={(e)=>setNote( e.target.value )} value={note?.body} /> {/* ? 는 body 가있으면 실행하고 없으면 내비둠*/}
        </div>
    )
}