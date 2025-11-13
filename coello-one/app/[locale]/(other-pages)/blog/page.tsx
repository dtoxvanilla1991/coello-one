import { Card, Button } from "antd";
import Image from "next/image";

const { Meta } = Card;

const blogs = [
  {
    id: 1,
    title: "First Blog Post",
    cover: "/ai-generated/coming-soon.svg", // Placeholder image
    description: "This is the description for the first blog post.",
  },
  {
    id: 2,
    title: "Second Blog Post",
    cover: "/ai-generated/coming-soon-2.svg", // Placeholder image
    description: "This is the description for the second blog post.",
  },
];

interface BlogProps {
  blogs: {
    id: number;
    title: string;
    cover: string;
    description: string;
  }[];
}

const BlogList: React.FC<BlogProps> = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Card
          key={blog.id}
          cover={<Image src={blog.cover} alt={blog.title} width={300} height={200} />}
          actions={[<Button key="view">VIEW BLOG</Button>]}
        >
          <Meta title={blog.title} description={blog.description} />
        </Card>
      ))}
    </div>
  );
};

const BlogPage: React.FC = () => {
  return <BlogList blogs={blogs} />;
};

export default BlogPage;
