import dynamic from 'next/dynamic';

const CustomEditor = dynamic( () => import( '@/components/textEditor' ), { ssr: false } );

export default function NewPost() {
    return (
        <section>
            <CustomEditor />
        </section>
    )
}