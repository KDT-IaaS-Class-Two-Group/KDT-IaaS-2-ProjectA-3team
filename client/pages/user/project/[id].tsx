import { useRouter } from "next/router";

const Test = ()=>{
  const router = useRouter();
  const {id, page} = router.query;
  return(
    <div>
      <h1>{id}</h1>
      <h2>{page}</h2>
    </div>
  )
}
export default Test;
