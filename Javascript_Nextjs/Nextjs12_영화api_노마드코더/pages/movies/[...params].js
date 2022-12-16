import { useRouter } from "next/router";
import Seo from "../../components/Seo";

function Detail({ params }) {
  const router = useRouter();
  const [title, id] = params || []; // ...params 는 배열형태로 
  return (
  <div>
    <Seo title={title} />
    {title}
  </div>
)}

export async function getServerSideProps({ query:{params} }){ // 백엔드 (getServerSideProps context prop제공)
  return {
    props: {
      params
    },
  }
}

export default Detail;
