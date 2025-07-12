import { Card, Button } from "antd";
import Image from "next/image";

const { Meta } = Card;

interface BlogProps {
  blogs: {
    id: number;
    title: string;
    cover: string;
    description: string;
  }[];
}

const Blog: React.FC<BlogProps> = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Card
          key={blog.id}
          cover={
            <Image src={blog.cover} alt={blog.title} width={300} height={200} />
          }
          actions={[<Button key="view">VIEW BLOG</Button>]}>
          <Meta title={blog.title} description={blog.description} />
        </Card>
      ))}
    </div>
  );
};

export default Blog;
