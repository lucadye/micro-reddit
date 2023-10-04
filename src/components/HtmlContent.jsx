import showdown from 'showdown';
const converter = new showdown.Converter();

export default function HtmlContent({content, style}) {
  content = converter.makeHtml(content);
  return (<div
    className={`htmlContent `+style}
    dangerouslySetInnerHTML={{__html:content}}
  />);
}
