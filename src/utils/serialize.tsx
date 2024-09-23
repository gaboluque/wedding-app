import React, { Fragment, ReactNode } from 'react';
import escapeHTML from 'escape-html';
import { Text } from 'slate';
import { ProductsList } from "@/components/products/productsList";
import { Timeline } from "@/components/Timeline";
import { PinterestBoard } from "@/components/PinterestBoard";
import Link from "next/link";

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
      if (node.text.includes('<dressCode')) {
        return <Fragment key={i}>{renderDressCode()}</Fragment>;
      }
    }

    if (Text.isText(node)) {
      return renderTextNode(node, i);
    }

    return renderBlockNode(node, i);
  });
}

const renderTextNode = (node: Node, key: number): ReactNode => {
  if (node.text === '' || node.text === "\n") return <br key={key}/>;

  let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text || '') }}/>;

  if (node.bold) text = <strong key={key}>{text}</strong>;
  if (node.code) text = <code key={key}>{text}</code>;
  if (node.italic) text = <em key={key}>{text}</em>;

  return <p key={key}>{text}</p>;
}

const renderBlockNode = (node: Node, key: number): ReactNode => {
  const childNodes = node.children ? serializeJsonMarkdown(node.children) : null;

  switch (node.type) {
    case 'h1':
      return <h1 key={key}>{childNodes}</h1>;
    case 'h2':
      return <h2 key={key}>{childNodes}</h2>;
    case 'h3':
      return <h3 key={key}>{childNodes}</h3>;
    case 'h4':
      return <h4 key={key}>{childNodes}</h4>;
    case 'h5':
      return <h5 key={key}>{childNodes}</h5>;
    case 'h6':
      return <h6 key={key}>{childNodes}</h6>;
    case 'blockquote':
      return <blockquote key={key}>{childNodes}</blockquote>;
    case 'ul':
      return <ul key={key}>{childNodes}</ul>;
    case 'ol':
      return <ol key={key}>{childNodes}</ol>;
    case 'li':
      return <li key={key}>{childNodes}</li>;
    case 'link':
      return (
        <a href={escapeHTML(node.url || '')} key={key}>
          {childNodes}
        </a>
      );
    default:
      return <Fragment key={key}>{childNodes}</Fragment>;
  }
}

function myNavFunc(){
  // If it's an iPhone..
  if( (navigator.platform.indexOf("iPhone") != -1)
    || (navigator.platform.indexOf("iPod") != -1)
    || (navigator.platform.indexOf("iPad") != -1))
    window.open("maps://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=4.9214839,-74.0666753");
  else
    window.open("https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=4.9214839,-74.0666753");
}

function openInWaze(){
  window.open("https://www.waze.com/ul?ll=4.9119685,-74.0725079&navigate=yes");
}

const renderMap = () => (
  // <iframe
  //   width="100%"
  //   height="400"
  //   id="gmap_canvas"
  //   src="https://maps.google.com/maps?width=520&height=400&hl=en&q=Hacienda%20Fagua%20Bogot%C3%A1+(Hacienda%20Fagua)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
  //   title="Google Map of Hacienda Fagua"
  // />

  <div className="text-center flex flex-col items-center">
    <img src="/images/hacienda.png" onClick={myNavFunc} width={400}
         alt="Google Map of Hacienda Fagua"/>
    <button className="link" onClick={myNavFunc}>Abrir en Maps</button>
    <button className="link" onClick={openInWaze}>Abrir en Waze</button>
  </div>
);

const renderProducts = () => <ProductsList/>;

const renderTimeline = () => <Timeline/>;

const renderDressCode = () => (
  <div className="flex flex-col items-center">
    <img src="/images/dressCode.png" alt="Dress code" className="object-contain" width={500}/>
  </div>
)
