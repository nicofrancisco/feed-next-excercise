import dynamic from "next/dynamic";

const FeedPage = dynamic(() => import("./feed/page"), {
  ssr: false,
});

const Home = () => {
  return (<FeedPage />)
}

export default Home

