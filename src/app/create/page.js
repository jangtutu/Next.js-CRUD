"use client"; //사용자와 상호작용하기위한 클라이언트 컴포넌트 사용

import { useRouter } from "next/navigation"; //router를 위한 import

export default function Create() {
    const router = useRouter(); //페이지 리디렉션를 위한 API
    return(
        <form onSubmit={(e)=>{
            e.preventDefault(); // onSubmit이 실행됬을때 기본적인 동작방지(리로드방지)
            const title = e.target.title.value;
            const body = e.target.body.value;
            const options = { //서버쪽으로 데이터전송을 위한 옵션
                method : 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({title, body}) //JSON.stringify는 객체나 값을 JSON문자열로 변환하는 기능
            }
            fetch(process.env.NEXT_PUBLIC_API_URL+`topics`, options)
            .then(res=>res.json())
            .then(result=>{
                const lastId = result.id;
                router.push(`/read/${lastId}`);
                router.refresh();
            })
        }}>
            <p>
                <input type="text" name="title" placeholder="title"/>
            </p>
            <p>
                <textarea name="body" placeholder="body"/>
            </p>
            <p>
                <input type="submit" value="create"/>
            </p>
        </form>
    )
}