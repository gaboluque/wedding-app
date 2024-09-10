import React, { Fragment, ReactNode } from 'react';
import escapeHTML from 'escape-html';
import { Text } from 'slate';
import { ProductsList } from "@/components/products/productsList";
import { Timeline } from "@/components/Timeline";

interface Node {
  type?: string;
  children?: Node[];
  text?: string;
  code?: boolean;
  bold?: boolean;
  italic?: boolean;
  url?: string;
}

export const serializeJsonMarkdown = (children: Node[]): ReactNode[] => {
  return children.map((node, i) => {
    if (!node) return null;

    if (node.code && typeof node.text === 'string') {
      if (node.text.includes('<map')) {
        return <Fragment key={i}>{renderMap()}</Fragment>;
      }
      if (node.text.includes('<products')) {
        return <Fragment key={i}>{renderProducts()}</Fragment>;
      }
      if (node.text.includes('<timeline')) {
        return <Fragment key={i}>{renderTimeline()}</Fragment>;
      }
    }

    if (Text.isText(node)) {
      return renderTextNode(node, i);
    }

    return renderBlockNode(node, i);
  });
}

const renderTextNode = (node: Node, key: number): ReactNode => {
  if (node.text === '' || node.text === "\n") return <br key={key} />;

  let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text || '') }} />;

  if (node.bold) text = <strong key={key}>{text}</strong>;
  if (node.code) text = <code key={key}>{text}</code>;
  if (node.italic) text = <em key={key}>{text}</em>;

  return <Fragment key={key}>{text}</Fragment>;
}

const renderBlockNode = (node: Node, key: number): ReactNode => {
  const childNodes = node.children ? serializeJsonMarkdown(node.children) : null;

  switch (node.type) {
    case 'h1': return <h1 key={key}>{childNodes}</h1>;
    case 'h2': return <h2 key={key}>{childNodes}</h2>;
    case 'h3': return <h3 key={key}>{childNodes}</h3>;
    case 'h4': return <h4 key={key}>{childNodes}</h4>;
    case 'h5': return <h5 key={key}>{childNodes}</h5>;
    case 'h6': return <h6 key={key}>{childNodes}</h6>;
    case 'blockquote': return <blockquote key={key}>{childNodes}</blockquote>;
    case 'ul': return <ul key={key}>{childNodes}</ul>;
    case 'ol': return <ol key={key}>{childNodes}</ol>;
    case 'li': return <li key={key}>{childNodes}</li>;
    case 'link': return (
      <a href={escapeHTML(node.url || '')} key={key}>
        {childNodes}
      </a>
    );
    default: return <Fragment key={key}>{childNodes}</Fragment>;
  }
}

const renderMap = () => (
  <iframe
    width="100%"
    height="400"
    id="gmap_canvas"
    src="https://maps.google.com/maps?width=520&height=400&hl=en&q=Hacienda%20Fagua%20Bogot%C3%A1+(Hacienda%20Fagua)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
    title="Google Map of Hacienda Fagua"
  />
);

const renderProducts = () => <ProductsList />;

const renderTimeline = () => <Timeline />;
