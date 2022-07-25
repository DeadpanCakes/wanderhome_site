import Link from "next/link";


const Cms = () => {
    return <>
        <Link href="/cms/playbooks">
            <a>Playbooks</a>
        </Link>
        <Link href="/cms/traits">
            <a>Traits</a>
        </Link>
        <Link href="/cms/natures">
            <a>Natures</a>
        </Link>
        <Link href="/cms/seasons">
            <a>Seasons</a>
        </Link>
    </>
}

export default Cms