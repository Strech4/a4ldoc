import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import { Block } from "@/components/basic/Block";
import Image from "next/image";
import Logo from "@/public/a4LHorizon.png"
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
    title: `${siteConfig.name} | Accueil`,
    description: siteConfig.description,
};

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <section className="p-5 grid grid-cols-12 gap-4">
            <Header />
        </section>
  );
}


const Header = () => {
    return (
        <Block className="col-span-12 md:cols-span-12">
            <div className="w-fit mx-auto mt-5">
                <Badge className="mx-auto" variant="outline">Crée pour arma for life par David Squell</Badge>
            </div>
            <div className='my-3'>
                <Image
                    src={Logo}
                    alt='Logo de arma for life'
                    width={650}
                    quality={100}
                    priority
                    className='mx-auto'
                />
            </div>
            <p className='max-w-3xl mx-auto text-center text-lg md:text-xl tracking-wide font-normal text-muted-foreground'>
                Le site est actuellement en phase de développement. Il est donc possible que des bugs ou des interruptions de service surviennent.
            </p>
        </Block>
    )
}

