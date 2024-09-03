import React, { Fragment } from 'react';
import escapeHTML from 'escape-html';
import { Text } from 'slate';

export const serializeJsonMarkdown = (children: any[]) =>
  children.map((node, i) => {
    if (Text.isText(node)) {
      let rawText = node.text;
      let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(rawText) }} />;

      // @ts-ignore
      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }

      // @ts-ignore
      if (node.code) {
        if (rawText.includes('<map')) {
          text = renderMap();
        } else {
          text = <code key={i}>{text}</code>;
        }
      }

      // @ts-ignore
      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      if (node.text === '') {
        text = <br />;
      }

      // Handle other leaf types here...

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case 'h1':
        return <h1 key={i}>{serializeJsonMarkdown(node.children)}</h1>;
      // Iterate through all headings here...
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
        return <p key={i}>{serializeJsonMarkdown(node.children)}</p>;
    }
  });

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
