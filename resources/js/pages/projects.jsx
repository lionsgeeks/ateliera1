import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Calendar, Filter, Grid, List } from "lucide-react"
import { Head, Link, router } from '@inertiajs/react'
import { useState, useEffect, useMemo } from 'react'
import SiteNav from '@/components/site-nav'
import SiteFooter from '@/components/site-footer'

export default function Projects({ projects, categories = [], selectedCategory = null }) {
    const [viewMode, setViewMode] = useState('grid')
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [displayedProjects, setDisplayedProjects] = useState([])
    // removed debug log

    // Set initial category from URL parameter
    const [activeCategory, setActiveCategory] = useState(() => {
        if (!selectedCategory) return 'all'
        // selectedCategory may be slug or name. Map slug to name for display and filtering
        const found = (categories || []).find(c => c.slug === selectedCategory || c.name === selectedCategory)
        return found ? found.name : 'all'
    })

    const filteredProjects = useMemo(() => {
        // If backend has already filtered (selectedCategory is set), just return all projects
        // Otherwise, do client-side filtering
        if (selectedCategory) {
            // Backend has already filtered, so return all projects
            return projects?.data || []
        }
        
        // Client-side filtering for 'all' or when no category is selected
        if (activeCategory === 'all') {
            return projects?.data || []
        }
        
        // Normalize category name for comparison (trim whitespace)
        const normalizedActiveCategory = activeCategory.trim()
        
        return (projects?.data || []).filter(project => {
            // New: multiple categories via array of category objects
            if (Array.isArray(project.categories) && project.categories.length > 0) {
                return project.categories.some(cat => {
                    const catName = (cat?.name || '').trim()
                    return catName === normalizedActiveCategory
                })
            }
            // Backward compatibility: single category object or name string
            const singleName = (project.category?.name || project.category || '').trim()
            return singleName === normalizedActiveCategory
        })
    }, [activeCategory, projects?.data, selectedCategory])

    // Update activeCategory when selectedCategory prop changes (from router navigation)
    useEffect(() => {
        if (!selectedCategory) {
            setActiveCategory('all')
        } else {
            // selectedCategory may be slug or name. Map slug to name for display and filtering
            const found = (categories || []).find(c => c.slug === selectedCategory || c.name === selectedCategory)
            if (found) {
                setActiveCategory(found.name)
            }
        }
    }, [selectedCategory, categories])

    // Initialize displayed projects on mount
    useEffect(() => {
        setDisplayedProjects(filteredProjects)
    }, [])

    // Sync displayed projects with filtered projects when activeCategory or projects change (but not during transitions)
    useEffect(() => {
        // Only update if not transitioning to avoid flickering during animations
        // This handles cases where activeCategory changes from URL or other sources
        if (!isTransitioning) {
            setDisplayedProjects(filteredProjects)
        }
    }, [filteredProjects, isTransitioning])

    const handleCategoryChange = (categoryName) => {
        if (categoryName === activeCategory) return // Don't animate if same category

        // Start transition
        setIsTransitioning(true)

        // Find category slug for URL (if categoryName is not 'all')
        let categorySlug = categoryName
        if (categoryName !== 'all') {
            const foundCategory = categories.find(c => c.name === categoryName)
            categorySlug = foundCategory?.slug || categoryName
        }

        // Use Inertia router to navigate and reload from backend with filtered results
        // This ensures the backend filters the projects correctly
        const url = categoryName === 'all' ? '/projects' : `/projects?category=${categorySlug}`
        
        router.visit(url, {
            preserveState: true,
            preserveScroll: true,
            only: ['projects', 'selectedCategory'], // Only reload projects and selectedCategory
            onStart: () => {
                setIsTransitioning(true)
            },
            onFinish: () => {
                // End transition after data is loaded
                setTimeout(() => {
                    setIsTransitioning(false)
                }, 100)
            }
        })
    }

    return (
        <>
            <Head title="Nos projets - Atelier A1" />
            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <SiteNav active="projects" />

                {/* Hero Section */}
                <section className="relative h-screen flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="storage/projects/5c47e95d-33eb-4ffc-8ab3-b5b45d4eece6.JPG"
                            alt="Nos projets"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-secondary-950/50" />
                    </div>

                    <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
                        <h1 className="text-6xl md:text-8xl font-extralight mb-8 leading-tight tracking-wide">
                            Nos <span className=" font-light text-primary-300">projets</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-12 font-light max-w-3xl mx-auto leading-relaxed text-gray-100">
                            Découvrez notre portefeuille de solutions architecturales innovantes qui ont transformé les communautés et redéfini les espaces
                        </p>
                    </div>
                </section>

                {/* Filter and Controls Section */}
                <section className="py-16 bg-primary-50/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                            {/* Category Filter */}
                            <div className="flex flex-wrap gap-3">
                                {/* All Categories Button */}
                                <button
                                    onClick={() => handleCategoryChange('all')}
                                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 tracking-wide uppercase ${activeCategory === 'all'
                                        ? 'bg-primary-600 text-white shadow-lg'
                                        : 'bg-white text-secondary-700 hover:bg-primary-100 hover:text-primary-700 shadow-sm'
                                        }`}
                                >
                                    Tous les projets
                                </button>

                                {/* Category Buttons */}
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategoryChange(category.name)}
                                        className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 tracking-wide uppercase relative ${activeCategory === category.name
                                            ? 'text-white shadow-lg'
                                            : 'bg-white text-secondary-700 hover:bg-primary-100 hover:text-primary-700 shadow-sm'
                                            }`}
                                        style={{
                                            backgroundColor: activeCategory === category.name ? category.color : undefined
                                        }}
                                    >
                                        {category.name}

                                    </button>
                                ))}
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-3 rounded-full transition-all duration-300 ${viewMode === 'grid' ? 'bg-primary-600 text-white shadow-md' : 'text-secondary-600 hover:bg-primary-100'}`}
                                >
                                    <Grid className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-3 rounded-full transition-all duration-300 ${viewMode === 'list' ? 'bg-primary-600 text-white shadow-md' : 'text-secondary-600 hover:bg-primary-100'}`}
                                >
                                    <List className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Grid/List */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Results Header */}
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                                {activeCategory === 'all'
                                    ? 'Tous les projets'
                                    : `Projets: ${activeCategory}`
                                }
                            </h2>
                      
                        </div>
                        {displayedProjects.length === 0 ? (
                            <div className={`text-center py-16 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                                <div className="max-w-md mx-auto">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Aucun projet trouvé
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        {activeCategory === 'all'
                                            ? 'Aucun projet n’a encore été ajouté.'
                                            : `Aucun projet trouvé dans la catégorie « ${activeCategory} ».`
                                        }
                                    </p>
                                    <Button
                                        onClick={() => handleCategoryChange('all')}
                                        className="bg-primary-600 hover:bg-primary-700"
                                    >
                                        Voir tous les projets
                                    </Button>
                                </div>
                            </div>
                        ) : viewMode === 'grid' ? (
                            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                                {displayedProjects.map((project, index) => (
                                    <Link key={project.id} href={`/projects/${project.id}`}>
                                        <div
                                            className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group transform ${isTransitioning
                                                ? 'opacity-0 scale-95 translate-y-4'
                                                : 'opacity-100 scale-100 translate-y-0'
                                                } cursor-pointer`}
                                            style={{
                                                transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms`
                                            }}
                                        >
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={project.image_path || '/placeholder.svg'}
                                                    alt={project.title}
                                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-secondary-950/20 group-hover:bg-secondary-950/10 transition-all duration-300"></div>
                                            </div>
                                            <div className="p-8">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-2">
                                                        {(() => {
                                                            const cats = project.categories || (project.category ? [project.category] : []);
                                                            const first = cats[0];
                                                            const remaining = Math.max(0, (cats?.length || 0) - 1);
                                                            return (
                                                                <>
                                                                    {first ? (
                                                                        <Badge
                                                                            variant="secondary"
                                                                            className="font-medium tracking-wide uppercase text-xs text-white truncate"
                                                                            style={{
                                                                                backgroundColor: first?.color || '#a3845b',
                                                                                display: 'inline-block',
                                                                                whiteSpace: 'nowrap',
                                                                                overflow: 'hidden',
                                                                                textOverflow: 'ellipsis',
                                                                            }}
                                                                        >
                                                                            {(first?.name?.split('+')[0]?.trim()) || 'Sans catégorie'}
                                                                        </Badge>


                                                                    ) : (
                                                                        <Badge variant="secondary" className="text-white">Sans catégorie</Badge>
                                                                    )}
                                                                    {remaining > 0 && (
                                                                        <span className="text-xs text-secondary-500">+{remaining}</span>
                                                                    )}
                                                                </>
                                                            );
                                                        })()}
                                                    </div>
                                                    <span className="text-sm text-secondary-500 font-light">{project.end_year || project.year}</span>
                                                </div>
                                                <h3 className="text-base font-light text-secondary-950 mb-3 leading-tight line-clamp-1">{project.title}</h3>
                                                <div className="flex items-center text-secondary-600 text-sm mb-4">
                                                    <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                                                    <span className="font-light">{project.location}</span>
                                                </div>
                                                <p className="text-secondary-600 text-sm leading-relaxed mb-6 font-light line-clamp-3">{project.description}</p>
                                                <div>
                                                    <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium tracking-wide transition-all duration-300">
                                                        Voir les détails
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className={`space-y-6 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                                {displayedProjects.map((project, index) => (
                                    <div
                                        key={project.id}
                                        className={`bg-white rounded-lg h-full shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform ${isTransitioning
                                            ? 'opacity-0 scale-95 translate-y-4'
                                            : 'opacity-100 scale-100 translate-y-0'
                                            }`}
                                        style={{
                                            transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms`
                                        }}
                                    >
                                        <div className="md:flex">
                                            <div className="md:w-1/3">
                                                <img
                                                    src={project.image_path || '/placeholder.svg'}
                                                    alt={project.title}
                                                    className="w-full h-64 md:h-full object-cover"
                                                />
                                            </div>
                                            <div className="md:w-2/3 p-6">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex gap-2 flex-wrap">
                                                        {(project.categories || (project.category ? [project.category] : [])).map((cat, idx) => (
                                                            <Badge key={idx}
                                                                variant="secondary"
                                                                className="text-white font-medium"
                                                                style={{ backgroundColor: cat?.color || '#a3845b' }}
                                                            >
                                                                {cat?.name || 'Sans catégorie'}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-gray-500">{project.end_year || project.year}</span>
                                                </div>
                                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                                                <div className="flex items-center text-gray-600 text-sm mb-3">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    <span>{project.location}</span>
                                                </div>
                                                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-5">{project.description}</p>
                                                <Link href={`/projects/${project.id}`}>
                                                    <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                                                        Voir les détails
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                  </section>
                  {/* Pagination section (restyled, moved up) */}
                  {projects.links && projects.links.length > 3 && (
                    <nav className="flex justify-center mb-16" aria-label="Pagination">
                      <ul className="inline-flex items-center space-x-2">
                        {projects.links.map((link, idx) => {
                          // Remove surrounding whitespace from label for disable logic
                          const isActive = link.active;
                          const isDisabled = !link.url;
                          // Numeric? Only match digits
                          const isNumber = /^\\d+$/.test(link.label.trim());
                          return (
                            <li key={idx}>
                              <Link
                                href={link.url || '#'}
                                className={
                                  `px-4 py-2 min-w-[40px] inline-flex justify-center items-center text-base transition font-medium rounded-full focus:outline-none ${
                                    isActive
                                      ? 'bg-primary-600 text-white shadow-lg'
                                      : isDisabled
                                      ? 'text-secondary-400 bg-secondary-100 cursor-not-allowed'
                                      : 'text-secondary-800 bg-white hover:bg-primary-100 hover:text-primary-700 border border-secondary-200'
                                  }
                                  ${isNumber ? 'font-bold' : 'font-normal'}`
                                }
                                tabIndex={isDisabled ? -1 : 0}
                                aria-current={isActive ? 'page' : undefined}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  )}

                {/* CTA Section */}
                <section className="py-24 mt-2 bg-gray-900 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-light mb-6">
                            Vous avez un projet
                            <span className="block font-bold">en tête ?</span>
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            Discutons de votre vision architecturale et donnons vie à vos idées grâce à notre expertise et notre créativité.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg">
                                    Démarrer votre projet
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/about">
                                <Button
                                    size="lg"
                                    className="bg-white/10 text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg backdrop-blur-sm"
                                >
                                    En savoir plus sur nous
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <SiteFooter />
            </div>
        </>
    )
}
