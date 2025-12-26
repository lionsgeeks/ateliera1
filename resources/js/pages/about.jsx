import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, Phone, MapPin, Users, Award, Calendar, Target, Lightbulb } from "lucide-react"
import { Head, Link } from '@inertiajs/react'
import SiteNav from '@/components/site-nav'
import SiteFooter from '@/components/site-footer'
import chakibImage from '../../assets/images/team/chakib.jpeg'
import kassouImage from '../../assets/images/team/KASSOU.jpeg'
// DB-powered sponsors are provided by the server; defaults removed

export default function About({ milestones = [], sponsors }) {
    const team = [
        {
            id: 1,
            name: "CHAKIB Mustapha",
            role: "Architecte Associé",
            image: chakibImage,
            bio: "Fondateurs de l'agence, Mustapha orchestre les projets d'envergure avec une solide maîtrise des enjeux urbains et administratifs."
        },
        {
            id: 2,
            name: "KASSOU Abderrahim",
            role: "Architecte Associé",
            image: kassouImage,
            bio: "Fondateur investi dans la société civile, Abderrahim apporte à l'agence une vision élargie, nourrie par ses engagements associatifs et citoyens."
        },
        {
            id: 3,
            name: "BOUNASRI Aymen",
            role: "Architecte senior",
            image: null,
            bio: "Référence technique de l’équipe, Aymen veille à la précision des détails et à la transmission des savoir-faire auprès des plus jeunes."
        },
        {
            id: 4,
            name: "MABROUR Salma",
            role: "Architecte chargée de projet",
            image: null,
            bio: "Avec une approche créative et structurée, Salma pilote les opérations et incarne le lien entre conception et réalisation."
        },
        {
            id: 5,
            name: "KHABBAR Salma",
            role: "Architecte chargée de projet junior",
            image: null,
            bio: "Jeune voix de l’Atelier, Salma apporte une fraîcheur d’idées et une énergie nouvelle au sein des projets collectifs."
        },
        {
            id: 6,
            name: "MRANI Loubna",
            role: "Office Manager",
            image: null,
            bio: "Véritable cheville ouvrière de l’organisation, Loubna veille à la fluidité des démarches et à la rigueur des process internes."
        },
        {
            id: 7,
            name: "LKAYATI Malika",
            role: "Dessinatrice Projeteuse",
            image: null,
            bio: "Spécialiste des détails, Malika s’assure que chaque plan traduit fidèlement l’intention architecturale, en mettant l’accent sur la clarté et la qualité d’exécution."
        },
        {
            id: 8,
            name: "RIAHI Said",
            role: "Dessinateur Projeteur",
            image: null,
            bio: "Avec un œil attentif sur les structures et la précision des plans, Said transforme les concepts en documents techniques fiables, optimisant faisabilité et solidité des projets."
        },
        {
            id: 9,
            name: "AL ZEMOURI ABDERRAHMAN",
            role: "Infographiste 3D",
            image: null,
            bio: "Spécialiste de la représentation visuelle, Abderrahman donne vie aux idées en images, avec une attention particulière portée au détail et à la justesse des atmosphères."
        },
        {
            id: 10,
            name: "Astit Omar",
            role: "Agent logistique",
            image: null,
            bio: "Dernier maillon mais essentiel, Omar relie l’agence au terrain avec efficacité et fiabilité."
        }
    ];

    const values = [
        {
            icon: Users,
            title: "Dialogue et coopération",
            description: "Nous plaçons l’échange au cœur du processus, en favorisant un dialogue continu entre maîtrise d’ouvrage, usagers et concepteurs, pour faire émerger des projets porteurs de sens."
        },
        {
            icon: MapPin,
            title: "Ancrage territorial",
            description: "Chaque projet s’enracine dans son contexte urbain, paysager et culturel, afin de révéler les spécificités locales et valoriser le patrimoine existant."
        },
        {
            icon: Lightbulb,
            title: "Innovation responsable",
            description: "Nous explorons des solutions contemporaines et durables, intégrant les avancées techniques et environnementales tout en respectant les ressources et les usages."
        },
        {
            icon: Award,
            title: "Exigence et qualité",
            description: "Du dessin initial au chantier, nous cultivons une rigueur constante afin de garantir la cohérence, la précision et la pérennité de nos réalisations."
        }
    ];

    console.log(sponsors);



    return (
        <>
            <Head title="À propos - Atelier A1" />
            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <SiteNav active="about" />

                {/* Hero Section */}
                <section className="relative h-screen flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
                            alt="Notre studio"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>

                    <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
                        <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
                            À propos <span className="block font-bold">Atelier A1</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed">
                            Depuis ses débuts, l’Atelier s’est construit autour d’une vision partagée :
                            concevoir des espaces qui reflètent la richesse des contextes urbains et
                            culturels dans lesquels ils s’inscrivent.                        </p>
                    </div>
                </section>

                {/* Company Story Section */}
                <section className="py-24 bg-gray-50">
                    <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start px-6 lg:px-20 py-16 bg-gray-50">
                            {/* Left Content */}
                            <div>
                                {/* Heading */}
                                <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900 leading-tight">
                                    Notre <span className=" font-bold text-primary-600">histoire</span>
                                </h2>

                                {/* Intro */}
                                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                    L’agence a été fondée avec la volonté de développer une pratique architecturale construite autour du projet urbain et territorial.
                                    Cette approche, basée sur près de 20 ans d’expérience des architectes Abderrahim Kassou et Mustapha Chakib et de leur équipe,
                                    s’articule autour d’un dialogue continu entre les acteurs du projet, le programme et le site.
                                </p>

                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    La trajectoire de l’agence s’est construite autour de projets d’une grande diversité de programmes, de sites et d’échelles qui vont
                                    de la réalisation de complexes intégrés aux aménagements urbains en passant par la conception et la réalisation d’équipements
                                    structurants. Les fondateurs de Atelier A1 étaient préalablement membres fondateurs de l’agence Kilo. A ce titre, ils ont participé
                                    à la production d’une architecture résolument contemporaine et ont participé au renouveau de la scène architecturale au Maroc durant
                                    toutes les années 2000.
                                </p>

                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Agissant aussi bien dans les domaines de l’architecture que de l’urbanisme, du paysage et de l’aménagement, l’équipe de Atelier
                                    A1 est composée d’architectes, urbanistes, décorateurs et projeteurs ayant développé une connaissance fine et complexe du tissu
                                    urbain marocain.
                                </p>



                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-6 mt-12">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary-600 mb-2">190+</div>
                                        <div className="text-sm text-gray-500 uppercase tracking-wide">
                                            projets achevés
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary-600 mb-2">5+</div>
                                        <div className="text-sm text-gray-500 uppercase tracking-wide">
                                            concours gagnés
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
                                        <div className="text-sm text-gray-500 uppercase tracking-wide">
                                            années d’expérience
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Image */}
                            <div className="relative mt-10 lg:mt-20">
                                <img
                                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=700&fit=crop"
                                    alt="Notre bureau"
                                    className="w-full h-[700px] object-cover rounded-2xl shadow-xl"
                                />
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>


                    </div>
                </section>

                {/* Values Section */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                                Nos <span className="font-bold">valeurs</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Notre démarche repose sur des convictions fortes qui orientent
                                chaque projet et guident notre manière de concevoir et de construire.                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <value.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                                Notre  <span className=" font-bold">équipe</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Une équipe pluridisciplinaire où chaque parcours et chaque talent
                                contribue à la richesse de l’Atelier.                            </p>
                        </div>

                        <div className="w-full flex flex-wrap justify-center gap-8">
                            {team.slice(0, 2).map((member) => (
                                <div
                                    key={member.id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl w-[45%] transition-shadow flex"
                                >
                                    <div className="flex-shrink-0 w-64 h-auto">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col justify-center">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                                        <p className="text-gray-600 font-medium mb-3">{member.role}</p>
                                        <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                                    </div>
                                </div>
                            ))}
                            {/*
                            {team.slice(2).map((member) => (
                                <div
                                    key={member.id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl w-[22%] transition-shadow"
                                >
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                                        <p className="text-gray-600 font-medium mb-3">{member.role}</p>
                                        <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                        {/* Sponsors (Partenaires) */}
                        <div className="mt-20">
                            <h3 className="text-3xl md:text-4xl font-light mb-8 text-gray-900 text-center">
                                Nos <span className="font-bold">partenaires</span>
                            </h3>
                            {/* Inline keyframes for smooth marquee */}
                            <style>{`
                              @keyframes sponsor-scroll {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(-50%); }
                              }
                            `}</style>
                            <div className="relative group overflow-hidden max-w-5xl mx-auto">
                                <div
                                    className="flex items-center gap-16 w-[200%]"
                                    style={{
                                        animation: 'sponsor-scroll 18s linear infinite',
                                        animationPlayState: 'running'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
                                    onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
                                >
                                    {[...sponsors, ...sponsors].map((sponsor, idx) => (
                                        <div
                                            key={`logo-${idx}`}
                                            className="h-28 flex items-center justify-center min-w-[200px]"
                                        >
                                            <a
                                                href={sponsor.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block"
                                            >
                                                <img
                                                    src={`/storage/${sponsor.logo_path}`}
                                                    alt="sponsor"
                                                    className="h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                                                />

                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Timeline Section - horizontal like the reference image */}
                <section className="py-24">
                    <div className=" mx-auto px-6">
                        {/* Heading */}
                        <div className="text-center mb-6">
                            <h2 className="text-4xl md:text-5xl tracking-wide text-gray-900">
                                <span className="font-light">NOTRE </span>
                                <span className="font-bold">PARCOURS</span>
                            </h2>
                            <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
                                Depuis ses origines, l’Atelier s’est construit au fil de rencontres, de projets et d’engagements qui ont façonné sa trajectoire.
                            </p>
                        </div>

                        {/* Horizontal timeline */}
                        <div className="relative w-full py-20">
                            {/* Main horizontal black line */}
                            <div className="absolute top-[19.5%] left-1/2 -translate-x-1/2 w-[95%] h-[3px] bg-black rounded" />

                            <div className="relative flex justify-between items-start w-[95%] ">
                                {milestones
                                    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                                    .map((m, idx) => (
                                        <div key={idx} className="relative flex flex-col items-center text-center w-[35.6%]">
                                            {/* Rotated year above the dot */}
                                            <div className="-translate-y-6 rotate-[-45deg] text-[18px] font-semibold text-gray-800 tracking-wide select-none mb-6">
                                                {m.year}
                                            </div>

                                            {/* Dot */}
                                            <div className="w-7 h-7 bg-black rounded-full border-[6px] border-white z-10" />

                                            {/* Dashed guide line */}
                                            <div
                                                className={`border-l border-dashed border-gray-400 mt-[-2px] ${idx % 2 === 0 ? "h-[100px]" : "h-[170px]"
                                                    }`}
                                            />


                                            {/* Content */}
                                            <div className="text-center px-2 mt-4">
                                                {idx === 1 ? (
                                                    <div>
                                                        <h2 className="text-[20px] md:text-[22px] font-extrabold text-[#a3845b] uppercase leading-tight mb-2 tracking-wide">
                                                            CRÉATION<br />D’ATELIER A1
                                                        </h2>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <h3 className="text-[10px] md:text-[16px] font-semibold text-gray-900 leading-snug mb-2">
                                                            {m.title}
                                                        </h3>
                                                        {m.description && (
                                                            <p className="text-[10px] md:text-[12px] leading-7 text-gray-800 font-serif max-w-[260px] mx-auto">
                                                                {m.description}
                                                            </p>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-gray-900 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-light mb-6">
                            Prêt à travailler
                            <span className="block font-bold">avec nous ?</span>
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            Discutons de votre vision architecturale et créons ensemble quelque chose d’exceptionnel.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg">
                                    Nous contacter
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/projects">
                                <Button
                                    size="lg"
                                    className="bg-white/10 text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg backdrop-blur-sm"
                                >
                                    Voir nos réalisations
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                <SiteFooter />
            </div>
        </>
    )
}
