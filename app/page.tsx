"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight,
  ArrowRight,
  Menu,
  X,
  ArrowUp,
  Check,
  Phone,
  Mail,
  Globe,
  Shield,
  Server,
  Code,
  Smartphone,
  Cloud,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  // Refs for sections
  const sectionRefs = {
    home: useRef(null),
    services: useRef(null),
    about: useRef(null),
    work: useRef(null),
    contact: useRef(null),
  }

  // Testimonials data
  const testimonials = [
    {
      quote:
        "Intelion transformed our IT infrastructure completely. Their team's expertise and dedication to our success made all the difference in our digital transformation journey.",
      author: "Sarah Johnson",
      position: "CTO, TechCorp",
      image: "/placeholder.svg?height=100&width=100&text=SJ",
      rating: 5,
    },
    {
      quote:
        "We've partnered with Intelion for over 5 years, and they've consistently delivered exceptional service and innovative solutions that keep us ahead of the competition.",
      author: "Michael Chen",
      position: "IT Director, Global Solutions",
      image: "/placeholder.svg?height=100&width=100&text=MC",
      rating: 5,
    },
    {
      quote:
        "The cloud migration handled by Intelion was seamless and exceeded our expectations. Their attention to detail and proactive approach to potential issues saved us time and resources.",
      author: "Emily Rodriguez",
      position: "Operations Manager, Innovate Inc.",
      image: "/placeholder.svg?height=100&width=100&text=ER",
      rating: 5,
    },
  ]

  // Services data
  const services = [
    {
      icon: <Server className="w-6 h-6" />,
      title: "Managed IT Services",
      description: "Comprehensive IT management solutions that free your team to focus on core business activities.",
      color: "bg-blue-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Cybersecurity",
      description: "Advanced security solutions to protect your business from evolving digital threats.",
      color: "bg-red-500",
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure that grows with your business needs.",
      color: "bg-purple-500",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Software Development",
      description: "Custom software solutions designed to address your specific business challenges.",
      color: "bg-green-500",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Development",
      description: "Engaging mobile applications that connect you with customers wherever they are.",
      color: "bg-yellow-500",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "IT Consulting",
      description: "Strategic technology guidance to help you make informed business decisions.",
      color: "bg-indigo-500",
    },
  ]

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      setIsScrolled(window.scrollY > 50)

      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 500)

      // Determine active section
      const scrollPosition = window.scrollY + 100

      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const element = ref.current as HTMLElement
          if (element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
            setActiveSection(section)
          }
        }
      })
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Testimonial auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    const section = sectionRefs[sectionId]?.current as HTMLElement
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-white shadow-lg py-2" : "bg-transparent py-4",
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center" onClick={() => scrollToSection("home")}>
              <div className="flex items-center">
                <div className="bg-blue-600 text-white p-2 rounded-lg mr-2">
                  <span className="text-xl font-bold">I</span>
                </div>
                <div className="text-gradient">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Intelion
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#home"
                className={cn(
                  "text-sm font-medium hover:text-blue-600 transition-colors",
                  activeSection === "home" ? "text-blue-600" : "text-gray-800",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("home")
                }}
              >
                HOME
              </Link>
              <Link
                href="#services"
                className={cn(
                  "text-sm font-medium hover:text-blue-600 transition-colors",
                  activeSection === "services" ? "text-blue-600" : "text-gray-800",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("services")
                }}
              >
                SERVICES
              </Link>
              <Link
                href="#about"
                className={cn(
                  "text-sm font-medium hover:text-blue-600 transition-colors",
                  activeSection === "about" ? "text-blue-600" : "text-gray-800",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("about")
                }}
              >
                ABOUT US
              </Link>
              <Link
                href="#work"
                className={cn(
                  "text-sm font-medium hover:text-blue-600 transition-colors",
                  activeSection === "work" ? "text-blue-600" : "text-gray-800",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("work")
                }}
              >
                OUR WORK
              </Link>
              <Link
                href="#contact"
                className={cn(
                  "text-sm font-medium hover:text-blue-600 transition-colors",
                  activeSection === "contact" ? "text-blue-600" : "text-gray-800",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("contact")
                }}
              >
                CONTACT
              </Link>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
                onClick={() => scrollToSection("contact")}
              >
                Get Started
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-4"
          >
            <nav className="flex flex-col gap-4">
              <Link
                href="#home"
                className={cn(
                  "text-xl py-3 border-b border-gray-100 font-medium",
                  activeSection === "home" ? "text-blue-600" : "text-gray-800",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("home")
                }}
              >
                Home
              </Link>
              <Link
                href="#services"
                className={cn(
                  "text-xl py-3 border-b border-gray-100 font-medium",
                  activeSection === "services" ? "text-blue-600" : "text-gray-800",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("services")
                }}
              >
                Services
              </Link>
              <Link
                href="#about"
                className={cn(
                  "text-xl py-3 border-b border-gray-100 font-medium",
                  activeSection === "about" ? "text-blue-600" : "text-gray-800",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("about")
                }}
              >
                About Us
              </Link>
              <Link
                href="#work"
                className={cn(
                  "text-xl py-3 border-b border-gray-100 font-medium",
                  activeSection === "work" ? "text-blue-600" : "text-gray-800",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("work")
                }}
              >
                Our Work
              </Link>
              <Link
                href="#contact"
                className={cn(
                  "text-xl py-3 border-b border-gray-100 font-medium",
                  activeSection === "contact" ? "text-blue-600" : "text-gray-800",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("contact")
                }}
              >
                Contact
              </Link>
              <div className="mt-6">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    scrollToSection("contact")
                  }}
                >
                  Get Started
                </Button>
              </div>
              <div className="mt-8 space-y-4">
                <a href="tel:0612-2500971" className="flex items-center gap-2 text-gray-800">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span>0612-2500971</span>
                </a>
                <a href="mailto:info@intelion.com" className="flex items-center gap-2 text-gray-800">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span>info@intelion.com</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section ref={sectionRefs.home} id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-2/3 h-full bg-blue-50 rounded-bl-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-100 rounded-full opacity-50 transform -translate-x-1/2"></div>
            <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-30"></div>
            <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-blue-200 rounded-full opacity-40"></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  #1 IT Solutions Provider
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Transforming Business Through <span className="text-blue-600">Technology</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-lg">
                  We deliver innovative IT solutions that empower your business to thrive in the digital age. Let us
                  handle your technology so you can focus on growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg"
                    onClick={() => scrollToSection("contact")}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full px-8 py-6 text-lg"
                    onClick={() => setVideoModalOpen(true)}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Video
                  </Button>
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                        <Image
                          src={`/placeholder.svg?height=40&width=40&text=${i}`}
                          alt={`Client ${i}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">Trusted by 2,000+ clients worldwide</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=600&width=800&text=IT+Solutions"
                    alt="IT Solutions"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-multiply"></div>
                </div>

                {/* Floating Stats Card */}
                <div className="absolute -bottom-10 -left-10 bg-white rounded-lg shadow-xl p-4 w-48">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">Projects Completed</span>
                    <span className="text-xs text-green-500 font-medium">+12%</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">470+</div>
                  <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

                {/* Floating Experience Card */}
                <div className="absolute -top-5 -right-5 bg-blue-600 rounded-lg shadow-xl p-4 text-white">
                  <div className="text-3xl font-bold">8+</div>
                  <div className="text-sm">Years of Experience</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-8">
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">TRUSTED BY INDUSTRY LEADERS</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={`/placeholder.svg?height=60&width=120&text=Partner${i}`}
                    alt={`Partner ${i}`}
                    width={120}
                    height={60}
                    className="h-12 w-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={sectionRefs.services} id="services" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
                OUR SERVICES
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comprehensive IT Solutions for Modern Businesses
              </h2>
              <p className="text-gray-600 text-lg">
                We offer a wide range of IT services designed to help your business thrive in today's digital landscape.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    <div
                      className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Link
                      href="#"
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                      Learn more <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6"
                onClick={() => scrollToSection("contact")}
              >
                Discuss Your Project
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={sectionRefs.about} id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=800&text=Our+Team"
                    alt="Our Team"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Experience Badge */}
                <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white rounded-lg p-4 shadow-lg">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm">Client Satisfaction</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  ABOUT INTELION
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  We're a Team of IT Experts Passionate About Your Success
                </h2>
                <p className="text-gray-600">
                  Founded in 2015, Intelion has grown to become a leading IT solutions provider, helping businesses of
                  all sizes navigate the complex digital landscape. Our team of experts brings decades of combined
                  experience across various technology domains.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">Expert Team</h3>
                      <p className="text-gray-600">Certified professionals with years of industry experience</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">Tailored Solutions</h3>
                      <p className="text-gray-600">Customized approaches for your specific business needs</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">24/7 Support</h3>
                      <p className="text-gray-600">Round-the-clock assistance whenever you need it</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">Innovative Approach</h3>
                      <p className="text-gray-600">Leveraging cutting-edge technologies for optimal results</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
                    onClick={() => scrollToSection("contact")}
                  >
                    Learn More About Us
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="space-y-2"
              >
                <div className="text-4xl md:text-5xl font-bold">8+</div>
                <p className="text-blue-100">Years of Experience</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="space-y-2"
              >
                <div className="text-4xl md:text-5xl font-bold">470+</div>
                <p className="text-blue-100">Projects Completed</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="space-y-2"
              >
                <div className="text-4xl md:text-5xl font-bold">98%</div>
                <p className="text-blue-100">Client Satisfaction</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="space-y-2"
              >
                <div className="text-4xl md:text-5xl font-bold">3</div>
                <p className="text-blue-100">Min Response Time</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Work Section */}
        <section ref={sectionRefs.work} id="work" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
                OUR PORTFOLIO
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recent Projects That Made an Impact</h2>
              <p className="text-gray-600 text-lg">
                Explore our successful case studies and see how we've helped businesses transform their digital
                presence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600&text=Cloud+Migration"
                    alt="Cloud Migration Project"
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white">Cloud Migration</h3>
                      <p className="text-gray-200 mt-2">
                        Enterprise cloud transformation for a financial services company
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Cloud Migration
                  </h3>
                  <p className="text-gray-600 mt-2">Financial Services</p>
                </div>
              </motion.div>

              {/* Project 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600&text=Security+Implementation"
                    alt="Security Implementation"
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white">Security Implementation</h3>
                      <p className="text-gray-200 mt-2">Comprehensive cybersecurity overhaul for healthcare provider</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Security Implementation
                  </h3>
                  <p className="text-gray-600 mt-2">Healthcare</p>
                </div>
              </motion.div>

              {/* Project 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600&text=App+Development"
                    alt="Mobile App Development"
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white">Mobile App Development</h3>
                      <p className="text-gray-200 mt-2">Customer-facing mobile application for retail chain</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Mobile App Development
                  </h3>
                  <p className="text-gray-600 mt-2">Retail</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full px-8">
                View All Projects
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
                TESTIMONIALS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
              <p className="text-gray-600 text-lg">
                Don't just take our word for it. Here's what our clients have to say about working with us.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-blue-600 rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                  </div>
                </div>

                <div className="pt-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <p className="text-xl md:text-2xl text-gray-700 italic mb-8">
                        "{testimonials[currentTestimonial].quote}"
                      </p>

                      <div className="flex flex-col items-center">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
                          <Image
                            src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                            alt={testimonials[currentTestimonial].author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">{testimonials[currentTestimonial].author}</h4>
                        <p className="text-gray-600">{testimonials[currentTestimonial].position}</p>
                        <div className="flex items-center mt-2">
                          {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex justify-center mt-8 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        currentTestimonial === index ? "bg-blue-600" : "bg-gray-300"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Let's discuss how our IT solutions can help you achieve your business goals.
              </p>
              <Button
                className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-6 text-lg"
                onClick={() => scrollToSection("contact")}
              >
                Schedule a Free Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={sectionRefs.contact} id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  GET IN TOUCH
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Let's Start a Conversation</h2>
                <p className="text-gray-600 text-lg">
                  Have questions about our services or want to discuss your project? Fill out the form and our team will
                  get back to you within 3 minutes.
                </p>

                <div className="space-y-4 pt-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 rounded-full p-3">
                        <Phone className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                      <p className="text-gray-600">0612-2500971</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 rounded-full p-3">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Email</h3>
                      <p className="text-gray-600">info@intelion.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 rounded-full p-3">
                        <Globe className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Location</h3>
                      <p className="text-gray-600">123 Tech Park, New Delhi, India</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {["facebook", "twitter", "linkedin", "instagram"].map((social) => (
                      <Link
                        key={social}
                        href="#"
                        className="bg-gray-100 hover:bg-blue-100 p-3 rounded-full transition-colors duration-300"
                      >
                        <Image
                          src={`/placeholder.svg?height=24&width=24&text=${social.charAt(0).toUpperCase()}`}
                          alt={social}
                          width={24}
                          height={24}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-xl p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <Input
                        id="first-name"
                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <Input
                        id="last-name"
                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Service Interested In
                    </label>
                    <Select>
                      <SelectTrigger className="w-full rounded-lg border-gray-300">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="managed-it">Managed IT Services</SelectItem>
                        <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                        <SelectItem value="cloud">Cloud Solutions</SelectItem>
                        <SelectItem value="software">Software Development</SelectItem>
                        <SelectItem value="mobile">Mobile Development</SelectItem>
                        <SelectItem value="consulting">IT Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      rows={4}
                      className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3">
                    Send Message
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="mb-6 flex items-center">
                <div className="bg-blue-600 text-white p-2 rounded-lg mr-2">
                  <span className="text-xl font-bold">I</span>
                </div>
                <div className="text-gradient">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Intelion
                  </span>
                </div>
              </div>
              <p className="text-gray-400 mb-6">Transforming businesses through innovative IT solutions since 2015.</p>
              <div className="flex space-x-4">
                {["facebook", "twitter", "linkedin", "instagram"].map((social) => (
                  <Link key={social} href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    <Image
                      src={`/placeholder.svg?height=24&width=24&text=${social.charAt(0).toUpperCase()}`}
                      alt={social}
                      width={24}
                      height={24}
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Managed IT Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Cybersecurity
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Cloud Solutions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Software Development
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Mobile Development
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    IT Consulting
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Our Work
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter to receive updates and insights.</p>
              <form className="space-y-4">
                <Input
                  placeholder="Your email address"
                  className="w-full bg-gray-800 border-gray-700 text-white rounded-lg focus:border-blue-500 focus:ring-blue-500"
                />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Intelion. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 transform hover:scale-110 z-50",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
        )}
      >
        <ArrowUp className="h-6 w-6" />
      </button>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors duration-300"
                onClick={() => setVideoModalOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=720&width=1280&text=Video+Placeholder"
                  alt="Company Video"
                  width={1280}
                  height={720}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-blue-600 rounded-full p-4">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

