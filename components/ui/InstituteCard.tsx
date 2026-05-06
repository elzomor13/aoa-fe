'use client';

interface InstituteCardProps {
    name: string;
    est: string;
    estLabel?: string;
    desc: string;
    icon: React.ReactNode;
    image?: string;
    href?: string;
}

export default function InstituteCard({
                                          name,
                                          est,
                                          estLabel = 'Est.',
                                          image = '/theater.jpg',
                                          href = '#institutes',
                                      }: InstituteCardProps) {
    return (
        <article className="relative overflow-hidden rounded-md">
            <a href={href} className="group block" aria-label={name}>
                {/* Image — 16:9 mobile, 4:5 desktop */}
                <div className="overflow-hidden">
                    <img
                        src={image}
                        alt={name}
                        className="w-full aspect-[16/9] lg:aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                </div>

                {/* Gradient overlay */}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-black/75 pointer-events-none"/>

                {/* Text — bottom of card */}
                <div className="absolute bottom-0 left-0 w-full z-10 text-white px-5 py-5">
                    <h3 className="relative inline-block font-cormorant font-semibold text-white text-[2rem] leading-snug">
                        {name}
                        <span className="absolute bottom-0 left-0 right-0 h-px bg-[#C8102E] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </h3>
                </div>
            </a>
        </article>
    );
}
