import Markdown from 'markdown-to-jsx'

export default function HtmlContent({content, style}) {
  return (<div
    className={`htmlContent `+style}
    ><Markdown>{content}</Markdown>
  </div>);
}
