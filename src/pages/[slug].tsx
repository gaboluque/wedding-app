import { GetServerSideProps } from "next";
import { apiUrl } from "@/config";
import { Page } from "@/pages/api/pages";
import { serializeJsonMarkdown } from "@/utils/serialize";

type PathParams = {
  slug: string,
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as PathParams;

  const page = await fetch(`${apiUrl}/pages/${slug}`).then((res) => res.json());

  if(page.message === 'Page not found') {
    return {
      notFound: true,
    }
  }

  return { props: { page } }
}

type PageProps = {
  page: Page
}

export default function PaintDetailPage({ page }: PageProps) {
  const serializedContent = serializeJsonMarkdown(page.content);

  return (
    <div>
      <h1>{page.title}</h1>
      {serializedContent}
    </div>
  );
}
