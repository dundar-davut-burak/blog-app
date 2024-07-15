import Head from "next/head";

export default function HeadTag(props){
return(
    <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <link rel="icon" href={props.icon} />
    </Head>
)
}