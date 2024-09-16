import { GetServerSideProps } from "next";
import { apiUrl } from "@/config";
import { serializeJsonMarkdown } from "@/utils/serialize";
import { IPage } from "@/models/Page";

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
  page: IPage
}

export default function PaintDetailPage({ page }: PageProps) {
  const serializedContent = serializeJsonMarkdown(page.content);

  return serializedContent;
}
