import { GetServerSideProps } from "next";
import { MongoClient, ObjectId } from "mongodb";
import Post from "./component/postComponent";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const slug = Array.isArray(context.params?.slug)
      ? context.params.slug[0]
      : context.params?.slug;
    if (!slug || typeof slug !== "string") {
      return { notFound: true };
    }

    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("notice");
    const collection = db.collection("noticeAuthTable");

    const post = await collection.findOne({ _id: new ObjectId(slug) });
    client.close();

    if (!post) {
      return { notFound: true };
    }

    return {
      props: {
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        id: slug,
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { notFound: true };
  }
};

export default Post;
