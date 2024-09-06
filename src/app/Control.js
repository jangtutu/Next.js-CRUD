"use client"; //usePramas 를 사용하기 위해 컴포넌트를 따로 사용함
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation'

export function Control() {
    const params = useParams();
    const router = useRouter(); //리디렉션을 위한 라우터 추가
    const id = params.id;
    return (
      <ul>
      <li><Link href="/create">Create</Link></li>
      {id ? <>
        <li><Link href={"/update/"+id}>Update</Link></li>
        <li><input type="button" value="delete" onClick={()=>{
            const options = {method: 'DELETE'}//서버로 보낼 메서드

            fetch('http://localhost:9999/topics/'+id)
            .then(resp=>resp.json())
            .then(result=>{
                router.push('/');
                router.refresh();
            });
        }}/></li>
      </> : null}
    </ul> //id값이 있으면 출력 없으면 null
    );
  }