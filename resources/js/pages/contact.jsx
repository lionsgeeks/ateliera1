import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react"
import { Head, Link, useForm } from '@inertiajs/react'
import { useModal } from '@/components/ui/modal'
import SiteNav from '@/components/site-nav'
import SiteFooter from '@/components/site-footer'

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        project_type: '',
        budget: '',
        message: ''
    })

    const { showSuccess, ModalComponent } = useModal()

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/contact', {
            onSuccess: () => {
                reset()
                showSuccess(
                    'Message envoyé avec succès !',
                    'Merci pour votre message ! Nous reviendrons vers vous rapidement.'
                )
            }
        })
    }
    const contactInfo = [
        {
            icon: Phone,
            title: "Téléphone",
            details: ["+212 5 2247 49 91"],
            description: "Appelez-nous pour toute information"
        },
        {
            icon: Mail,
            title: "Email",
            details: ["info@atelierA1.com"],
            description: "Envoyez-nous un message"
        },
        {
            icon: MapPin,
            title: "Bureau", // Renamed from 'Adresse' to match the image
            details: [
                "217 angle rue fraternité et bd zerktouni",
                "3 ème étage",
                "20 000 Casablanca"
            ],
            description: "Rendez-nous visite"
        },
        {
            icon: Clock,
            title: "Horaires",
            details: [
                "de Lundi à Vendredi",
                "de 9h à 13h",
                "de 14 h 30 à 18h30"
            ],
            description: "Heures d'ouverture du bureau"
        }
    ]
    const projectTypes = [
        "Résidentiel",
        "Architecture commerciale",
        "Design intérieur",
        "Urbanisme",
        "Rénovation",
        "Conseil",
        "Autre"
    ]

    const budgetRanges = [
        "Moins de 50 000 $",
        "50 000 $ - 100 000 $",
        "100 000 $ - 250 000 $",
        "250 000 $ - 500 000 $",
        "500 000 $ - 1 000 000 $",
        "Plus de 1 000 000 $"
    ]

    return (
        <>
            <Head title="Nous contacter - Atelier A1" />
            <div className="min-h-screen bg-white">
                <SiteNav active="contact" />

                {/* Hero Section */}
                <section className="relative h-screen flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&h=1080&fit=crop"
                            alt="Nous contacter"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>

                    <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
                        <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
                            Créons quelque chose d’extraordinaire
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed">
                            Une question, un projet ou une collaboration ?
                            Notre équipe est à votre écoute
                        </p>
                    </div>
                </section>

                {/* Contact Information Section */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                                Restez <span className=" font-bold">informé</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Abonnez-vous à notre newsletter et soyez les premiers informés de nos projets, de nos réflexions architecturales et de nos innovations.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <info.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{info.title}</h3>
                                    <div className="space-y-1 mb-3">
                                        {info.details.map((detail, idx) => (
                                            <p key={idx} className="text-gray-700 font-medium">{detail}</p>
                                        ))}
                                    </div>
                                    <p className="text-gray-600 text-sm">{info.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Form */}
                            <div>
                                <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                                    Démarrez votre projet
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    Parlez-nous de votre projet et nous reviendrons vers vous avec une proposition détaillée et un calendrier.

                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Nom complet *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                                placeholder="Votre nom complet"
                                            />
                                            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Adresse e-mail *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                                placeholder="your@email.com"
                                            />
                                            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="+212 5 2247 49 91"
                                        />
                                        {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                                                Type de projet *
                                            </label>
                                            <select
                                                id="project_type"
                                                name="project_type"
                                                required
                                                value={data.project_type}
                                                onChange={(e) => setData('project_type', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            >
                                                <option value="">Sélectionnez un type de projet</option>
                                                {projectTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                            {errors.project_type && <p className="text-red-600 text-sm mt-1">{errors.project_type}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                                                Fourchette budgétaire
                                            </label>
                                            <select
                                                id="budget"
                                                name="budget"
                                                value={data.budget}
                                                onChange={(e) => setData('budget', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            >
                                                <option value="">Sélectionnez une fourchette</option>
                                                {budgetRanges.map((range) => (
                                                    <option key={range} value={range}>{range}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Description du projet *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={6}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="Parlez-nous de votre projet, de votre calendrier et de vos besoins spécifiques..."
                                        />
                                        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={processing}
                                        className="w-full bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 text-lg font-medium tracking-wide transition-all duration-300"
                                    >
                                        {processing ? 'Envoi...' : 'Envoyer le message'}
                                        <Send className="ml-2 h-5 w-5" />
                                    </Button>
                                </form>
                            </div>

                            {/* Office Image and Info */}
                            <div>
                                <div className="relative mb-8">
                                    <img
                                        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=700&fit=crop"
                                        alt="Notre studio"
                                        className="w-full h-96 object-cover rounded-lg shadow-2xl"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-2xl font-bold mb-2">Visitez notre studio</h3>
                                        <p className="text-gray-200">Découvrez notre processus de conception</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Pourquoi choisir Atelier A1 ?</h3>
                                        <ul className="space-y-3 text-gray-600">
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                <span>Plus de 15 ans d’excellence architecturale</span>
                                            </li>
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                <span>190+ projets réussis</span>
                                            </li>
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                <span>Approche durable et récompensée</span>
                                            </li>
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                <span>Processus de conception collaboratif</span>
                                            </li>
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                <span>Solutions architecturales complètes
                                                </span>
                                            </li>
                                        </ul>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                                Foire aux <span className=" font-bold">questions</span>
                            </h2>
                            <p className="text-lg text-gray-600">
                                Questions fréquentes sur nos services et notre processus
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    question: "Quel est votre délai moyen pour un projet ?",
                                    answer: "Les délais varient selon l'ampleur et la complexité. Les projets résidentiels prennent généralement 3 à 6 mois pour la conception et 6 à 12 mois pour la construction. Les projets commerciaux peuvent durer 6 à 18 mois ou plus. Nous fournirons un calendrier détaillé lors de la consultation initiale."
                                },
                                {
                                    question: "Gérez-vous à la fois la conception et la construction ?",
                                    answer: "Nous sommes spécialisés dans la conception architecturale et travaillons avec des partenaires de construction de confiance. Nous pouvons recommander des entrepreneurs qualifiés et assurer le suivi de chantier pour garantir la conformité à nos plans."
                                },
                                {
                                    question: "Quels sont vos honoraires ?",
                                    answer: "Nos honoraires varient selon l'étendue, la complexité et les services requis. Nous facturons généralement un pourcentage du coût des travaux ou un tarif horaire pour les petits projets. Une proposition détaillée sera fournie après la consultation initiale."
                                },
                                {
                                    question: "Intervenez-vous en dehors de New York ?",
                                    answer: "Oui, nous travaillons sur des projets aux États-Unis et à l'international. Pour les projets en dehors de notre zone locale, nous collaborons avec des professionnels locaux et des frais de déplacement peuvent s'appliquer."
                                },
                                {
                                    question: "Comment intégrez-vous la durabilité ?",
                                    answer: "La durabilité est au cœur de notre approche. Nous privilégions les systèmes économes en énergie, les matériaux durables, les stratégies passives et les certifications environnementales comme LEED lorsque cela est pertinent."
                                }
                            ].map((faq, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}




                <SiteFooter />
            </div>

            {/* Modal Component */}
            <ModalComponent />
        </>
    )
}
