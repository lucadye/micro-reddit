// export default function Media({media}) {
//   return media.map((m)=>{
//     return m.type === 'image'
//       ? (<img src={m.url} width={m.width} height={m.height}/>)
//       : undefined (<video src={m.url} width={m.width} height={m.height}/>)
//   });
// }

export default function Media({media, style}) {
  return media && <img alt='Post' className={style} src={media}/>;
}
