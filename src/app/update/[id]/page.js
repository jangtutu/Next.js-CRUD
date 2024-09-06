"use client"; 
import { useParams, useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";

export default function Update() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState(''); // title과 body를 폼에 넣기위해 state 생성
    const router = useRouter(); 
    const params = useParams(); 
    const id = params.id;
    useEffect(()=>{ //클라이언트 컴포넌트에서 데이터를 가져오기위해 사용
        fetch('http://localhost:9999/topics/'+id)
        .then(resp=>resp.json())
        .then(result=>{
            setTitle(result.title);
            setBody(result.body); //title과 body값을 서버에서 가져온값으로 셋팅하기위해 설정
        });
    },[]);
    return(
        <form onSubmit={(e)=>{
            e.preventDefault(); 
            const title = e.target.title.value;
            const body = e.target.body.value;
            const options = { 
                method : 'PATCH', //수정은 PUSH or PATCH
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({title, body}) 
            }
            fetch(`http://localhost:9999/topics/`+id, options)
            .then(res=>res.json())
            .then(result=>{
                const lastId = result.id;
                router.push(`/read/${lastId}`);
                router.refresh(); //서버 컴포넌트를 강제로 다시 랜더링
            })
        }}>
            <p>
                <input type="text" name="title" placeholder="title" value={title} onChange={e=>setTitle(e.target.vlaue)}/>
            </p>
            <p>
                <textarea name="body" placeholder="body" value={body} onChange={e=>setBody(e.target.value)}/>
            </p>
            <p>
                <input type="submit" value="update"/>
            </p>
        </form>
    )
}