import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from "lucide-react"
import { Head, Link } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import SiteNav from '@/components/site-nav'
import SiteFooter from '@/components/site-footer'

// Inject custom styles for enhanced carousel
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style')
    styleSheet.textContent = `
    .carousel-container {
      perspective: 1200px;
      transform-style: preserve-3d;
    }

    .carousel-slide {
      backface-visibility: hidden;
      transform-style: preserve-3d;
      will-change: transform;
    }

    .shadow-3xl {
      box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
    }

    /* Smooth hardware acceleration */
    .carousel-container * {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }

    /* Ultra smooth transitions */
    .carousel-container .flex {
      transform-origin: center center;
    }

    /* Optimized hover effects */
    .carousel-slide:hover {
      transform: translateY(-4px) scale(1.02);
      transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* Smooth image scaling */
    .carousel-slide img {
      transform-origin: center center;
      will-change: transform;
    }

    @keyframes smoothSlide {
      0% {
        opacity: 0.8;
        transform: translateX(20px) scale(0.98);
      }
      100% {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
    }

    .slide-in {
      animation: smoothSlide 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* Prevent layout shifts */
    .carousel-container {
      contain: layout style paint;
    }
  `
    if (!document.head.querySelector('style[data-carousel-styles]')) {
        styleSheet.setAttribute('data-carousel-styles', 'true')
        document.head.appendChild(styleSheet)
    }
}

export default function ArchitecturalWebsite({ featuredCategories = [], featuredProjects = [] }) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isCarouselPaused, setIsCarouselPaused] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(true)
    const carouselImages = [
        "storage/projects/4bfeb9ee-7e9e-4f7a-ba92-ea431d1c5e07.jpg",
        "storage/projects/5c47e95d-33eb-4ffc-8ab3-b5b45d4eece6.JPG",
        "storage/projects/c585f6a6-47de-4775-8701-583b6880cf4f.JPG",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [carouselImages.length]);
    // Use CRUD-managed categories for the carousel
    const highlights = featuredCategories.length > 0 ? featuredCategories.map(category => ({
        id: category.id,
        slug: category.slug,
        image: category.image_path ? `/${category.image_path}` : null, // Use actual category image
        title: category.name,
        subtitle: `${category.projects_count} projet${category.projects_count !== 1 ? 's' : ''}`,
        description: category.description || 'Découvrez nos projets architecturaux dans cette catégorie.',
        color: category.color,
        projectCount: category.projects_count,
        hasImage: !!category.image_path
    })) : [
        // Fallback data if no categories are available
        {
            id: 1,
            slug: 'architecture',
            image: null,
            title: "Architecture",
            subtitle: "0 projets",
            description: "Ajoutez des catégories depuis le panneau d'administration pour présenter votre travail ici.",
            color: "#a3845b",
            projectCount: 0,
            hasImage: false
        }
    ]

    // Create extended array for infinite loop effect
    const extendedHighlights = [
        ...highlights.slice(-2), // Last 2 items at the beginning
        ...highlights,
        ...highlights.slice(0, 2), // First 2 items at the end
    ]

    const slideWidth = 400 // Width of each slide including gap
    const gap = 32 // Gap between slides

    // Auto-slide effect with infinite loop - smoother timing
    useEffect(() => {
        if (isCarouselPaused) return
        const interval = setInterval(() => {
            setCurrentSlide((prev) => prev + 1)
        }, 2000)
        return () => clearInterval(interval)
    }, [isCarouselPaused])

    // Handle infinite loop reset - smoother transitions
    useEffect(() => {
        if (currentSlide === highlights.length + 2) {
            setTimeout(() => {
                setIsTransitioning(false)
                setCurrentSlide(2)
                setTimeout(() => setIsTransitioning(true), 20) // Faster reset
            }, 600) // Wait for transition to complete
        } else if (currentSlide === -1) {
            setTimeout(() => {
                setIsTransitioning(false)
                setCurrentSlide(highlights.length + 1)
                setTimeout(() => setIsTransitioning(true), 20)
            }, 600)
        }
    }, [currentSlide, highlights.length])

    const goToSlide = (index) => {
        setCurrentSlide(index + 2) // Offset by 2 because of the extended array
    }

    // Use dynamic featured projects from database
    const projects = featuredProjects.length > 0 ? featuredProjects : []

    return (
        <>
            <Head title="Atelier A1" />
            <div className="min-h-screen bg-white">
                <SiteNav />

                {/* Hero Section */}
                <section className="relative h-screen flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        {carouselImages.map((src, index) => (
                            <img
                                key={src}
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                                    }`}
                            />
                        ))}
                        <div className="absolute inset-0 bg-secondary-950/50" />
                    </div>

                    <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
                        <h1 className="text-6xl md:text-8xl font-extralight mb-8 leading-tight tracking-wide">
                            Atelier  <span className=" font-light text-primary-300">A1</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-12 font-light max-w-3xl mx-auto leading-relaxed text-gray-100">
                            Façonner des espaces qui
                            révèlent le territoire et inspirent
                            ceux qui l’habitent.                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/projects">
                                <Button size="lg" className="bg-primary-500 text-white hover:bg-primary-600 px-10 py-4 text-lg font-medium tracking-wide transition-all duration-300">
                                    Voir nos réalisations
                                    <ArrowRight className="ml-3 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-white/30 text-black hover:bg-white hover:text-secondary-950 px-10 py-4 text-lg font-medium tracking-wide backdrop-blur-sm transition-all duration-300"
                                >
                                    Nous contacter
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-24 bg-primary-50/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-secondary-950 leading-tight">
                                    Concevoir des espaces qui
                                    <span className="block font-light text-primary-600">inspirent</span>
                                </h2>
                                <p className="text-lg text-secondary-700 mb-8 leading-relaxed">
                                    Chaque projet est pensé comme une rencontre entre un lieu, un programme
                                    et une communauté. Notre démarche conjugue savoir-faire architectural,
                                    lecture fine du contexte et attention portée aux usages, pour donner
                                    naissance à des espaces à la fois ancrés et ouverts, fonctionnels et porteurs de
                                    sens.
                                </p>
                                {/* <p className="text-lg text-secondary-700 mb-12 leading-relaxed">
                                    Notre approche combine un design de pointe et des pratiques durables, garantissant que chaque projet contribue positivement à son environnement et à sa communauté tout en conservant une élégance intemporelle.

                                </p> */}
                                <div className="grid grid-cols-3 gap-4  ">
                                    <div className="text-center">
                                        <div className="text-4xl font-light text-primary-600 mb-2">190+</div>
                                        <div className="text-sm text-secondary-600 uppercase tracking-wide">projets achevés</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-light text-primary-600 mb-2">5+</div>
                                        <div className="text-sm text-secondary-600 uppercase tracking-wide">concours gagnés</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-light text-primary-600 mb-2">15+</div>
                                        <div className="text-sm text-secondary-600 uppercase tracking-wide">années d’expériences
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <img
                                    src="storage/projects/4bfeb9ee-7e9e-4f7a-ba92-ea431d1c5e07.jpg"
                                    alt="Architectural Detail"
                                    className="w-full h-auto rounded-lg shadow-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/20 to-transparent rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Carousel Section */}
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-secondary-950 leading-tight">
                                Réalisations
                                <span className="block font-light text-primary-600">récentes</span>
                            </h2>
                        </div>

                        <div className="relative group overflow-hidden rounded-3xl bg-white p-8">
                            <style>{`
                              @keyframes category-scroll {
                                0% { transform: translate3d(0,0,0); }
                                100% { transform: translate3d(-33.3333%,0,0); }
                              }
                            `}</style>
                            <div
                                className="flex items-stretch gap-8"
                                style={{
                                    width: 'max-content',
                                    animation: 'category-scroll 18s linear infinite',
                                    willChange: 'transform',
                                    transform: 'translate3d(0,0,0)'
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
                                onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
                            >
                                {[...highlights, ...highlights, ...highlights].map((item, idx) => (
                                    <Link
                                        key={`${item.slug || item.title}-${idx}`}
                                        href={item.id ? `/projects?category=${encodeURIComponent(item.slug || item.title)}` : '#'}
                                        className="min-w-[320px] max-w-[320px] block"
                                    >
                                        <div className="relative overflow-hidden rounded-3xl aspect-[16/10] shadow-3xl group cursor-pointer">
                                            {item.hasImage ? (
                                                <>
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                                </>
                                            ) : (
                                                <>
                                                    <div
                                                        className="w-full h-full"
                                                        style={{ background: `linear-gradient(135deg, ${item.color}E6, ${item.color}B3, ${item.color}80)` }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                                </>
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                                                <div
                                                    className="mt-3 w-16 h-1 rounded-full"
                                                    style={{ backgroundColor: item.color }}
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-12">
                    <div className="text-center mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                            Projets à la une
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                            Découvrez notre portefeuille de solutions architecturales innovantes qui ont transformé les communautés et redéfini les horizons.
                        </p>
                        {projects.length > 0 && (
                            <Link href="/projects">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
                                >
                                    Voir tous les projets
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Individual Project Sections */}
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <div key={project.id} className="relative h-screen flex items-center overflow-hidden mb-16">
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={project.image_path || "https://via.placeholder.com/1920x1080/a3845b/ffffff?text=Project+Image"}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                            onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/1920x1080/a3845b/ffffff?text=Project+Image";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
                                </div>

                                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                                    <div className={`${index % 2 === 0 ? "text-left" : "text-right"}`}>
                                        <div className="max-w-2xl">
                                            <div className="flex gap-2 flex-wrap mb-6">
                                                {(project.categories || (project.category ? [project.category] : [])).map((cat, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        variant="secondary"
                                                        className="bg-white/20 text-white border-white/30"
                                                        style={{ backgroundColor: cat?.color ? `${cat.color}80` : 'rgba(163, 132, 91, 0.5)' }}
                                                    >
                                                        {cat?.name || 'Sans catégorie'}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <p className="text-2xl md:text-4xl font-light mb-8 text-white leading-tight">
                                                {project.title.split(" ").slice(0, -1).join(" ")}
                                                <span className="block font-bold">{project.title.split(" ").slice(-1)}</span>
                                            </p>
                                            <div className="flex items-center text-white/80 text-lg mb-8">
                                                <MapPin className="h-5 w-5 mr-2" />
                                                <span>{project.location}</span>
                                                <span className="mx-4">•</span>
                                                <span>{project.year}</span>
                                            </div>
                                            <p className="text-white/90 text-lg mb-8 leading-relaxed line-clamp-5">
                                                {project.description}
                                            </p>
                                            <Link href={`/projects/${project.id}`}>
                                                <Button
                                                    size="lg"
                                                    className="bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm"
                                                >
                                                    Voir le projet
                                                    <ArrowRight className="ml-2 h-5 w-5" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-24 bg-gray-50 rounded-2xl mx-4">
                            <div className="max-w-2xl mx-auto px-4">
                                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <MapPin className="h-12 w-12 text-gray-400" />
                                </div>
                                <h3 className="text-3xl font-light text-gray-600 mb-4">Aucun projet à la une pour le moment</h3>
                                <p className="text-lg text-gray-500 mb-8">
                                    Notre portfolio est en cours de mise à jour. Revenez bientôt pour découvrir nos dernières innovations architecturales.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/contact">
                                        <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                                            Discuter de votre projet
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                    <Link href="/about">
                                        <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white">
                                            En savoir plus sur nous
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
                {/* Contact Section */}
                <section id="contact" className="py-18">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                                    Créons <span className="font-bold">quelque chose d’extraordinaire</span>
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    Prêt à donner vie à votre vision architecturale ? Nous serions ravis d’en discuter avec vous et d’explorer comment nous pouvons vous aider à créer quelque chose d’exceptionnel.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                                            <Phone className="h-5 w-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Téléphone</div>
                                            <div className="text-gray-600">+212 5 2247 49 91</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                                            <Mail className="h-5 w-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Email</div>
                                            <div className="text-gray-600">info@atelierA1.com </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                                            <MapPin className="h-5 w-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Adresse</div>
                                            <div className="text-gray-600 whitespace-normal break-normal w-3/4">217 angle rue fraternité et bd zerktouni 3 ème étage 20 000 Casablanca</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <img
                                    src="storage/projects/4bfeb9ee-7e9e-4f7a-ba92-ea431d1c5e07.jpg"
                                    alt="Office Building"
                                    className="w-full h-auto rounded-lg shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                {/* Newsletter Section */}
                {/* <section className="py-12 bg-gray-900 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-light mb-6">
                            Stay
                            <span className="block font-bold">Informed</span>
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            Subscribe to our newsletter and be the first to know about our latest projects, architectural insights, and
                            industry innovations.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <Button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3">Subscribe</Button>
                        </div>

                        <p className="text-sm text-gray-400 mt-4">No spam, unsubscribe at any time. We respect your privacy.</p>
                    </div>
                </section> */}


                <SiteFooter />
            </div>
        </>
    )
}
