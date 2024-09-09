export default async function Read(props) {
    const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+`topics/${props.params.id}`
        , {cache : no-store}); //캐쉬 미사용
    const topic = await resp.json();
    return(
        <>
        <h2>{topic.title}</h2>
        {topic.body}
        </>
    )
}