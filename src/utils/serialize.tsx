import React, { Fragment } from 'react';
import escapeHTML from 'escape-html';
import { Text } from 'slate';
import { ProductsList } from "@/components/products/productsList";

export const serializeJsonMarkdown = (children: any[]) => {
  return children.map((node, i) => {
    if (!node) return null;

    if (node.code && node.text.includes('<map')) {
      return <Fragment key={i}>{renderMap()}</Fragment>;
    }

    if (node.code && node.text.includes('<products')) {
      return <Fragment key={i}>{renderProducts()}</Fragment>;
    }

    if (Text.isText(node)) {
      let rawText = node.text;
      let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(rawText) }} />;

      // @ts-ignore
      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }

      // @ts-ignore
      if (node.code) {
        text = <code key={i}>{text}</code>;
      }

      // @ts-ignore
      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      if (node.text === '') {
        text = <br />;
      }

      // Handle other leaf types here...

      return <p key={i}>{text}</p>;
    }

    switch (node.type) {
      case 'h1':
        return <h1 key={i}>{serializeJsonMarkdown(node.children)}</h1>;
      case 'h2':
        return <h2 key={i}>{serializeJsonMarkdown(node.children)}</h2>;
      case 'h3':
        return <h3 key={i}>{serializeJsonMarkdown(node.children)}</h3>;
      case 'h4':
        return <h4 key={i}>{serializeJsonMarkdown(node.children)}</h4>;
      case 'h5':
        return <h5 key={i}>{serializeJsonMarkdown(node.children)}</h5>;
      case 'h6':
        return <h6 key={i}>{serializeJsonMarkdown(node.children)}</h6>;
      case 'blockquote':
        return <blockquote key={i}>{serializeJsonMarkdown(node.children)}</blockquote>;
      case 'ul':
        return <ul key={i}>{serializeJsonMarkdown(node.children)}</ul>;
      case 'ol':
        return <ol key={i}>{serializeJsonMarkdown(node.children)}</ol>;
      case 'li':
        return <li key={i}>{serializeJsonMarkdown(node.children)}</li>;
      case 'link':
        return (
          <a href={escapeHTML(node.url)} key={i}>
            {serializeJsonMarkdown(node.children)}
          </a>
        );

      default:
        return <Fragment key={i}>{serializeJsonMarkdown(node.children)}</Fragment>;
    }
  });
}


const renderMap = () => {
  return (
    <>
      <iframe
        width="100%"
        height="400"
        id="gmap_canvas"
        src="https://maps.google.com/maps?width=520&height=400&hl=en&q=Hacienda%20Fagua%20Bogot%C3%A1+(Hacienda%20Fagua)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
      ></iframe>
      <a href="https://dissertationschreibenlassen.com/">Dissertation schreiben Hilfe</a>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script
        type="text/javascript"
        src="https://embedmaps.com/google-maps-authorization/script.js?id=5024bf8bd1afc606fc573e3c6d2bb0ab52298ebd"
      ></script>
    </>
  );
};

const renderProducts = () => {
  return <ProductsList />;
}
