"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Users,
  Gift,
  Camera,
  Phone,
  Mail,
  QrCode,
  Menu,
  X,
  Star,
  Sparkles,
  Cloud,
} from "lucide-react"
import Image from "next/image"
import Counter from '../components/Counter'
import { motion } from "framer-motion"
import Stack from '../components/Stack'
import MessageWallForm from '../components/MessageWallForm'
import MessageMarquee from '../components/MessageMarquee'
import QRCode from 'qrcode'
import { FaFacebookF, FaInstagram, FaFacebookMessenger, FaArrowUp } from 'react-icons/fa';
import RSVPForm from '@/components/RSVPForm';
import BookOfGuests from '@/components/BookOfGuests';
import MessageWallDisplay from '../components/MessageWallDisplay';

type Message = {
  timestamp: string;
  name: string;
  message: string;
};

export default function WeddingWebsite() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [churchQR, setChurchQR] = useState<string | null>(null)
  const [websiteQR, setWebsiteQR] = useState<string | null>(null)

  const weddingDate = new Date("2025-06-14T10:00:00")

  const coupleImages = [
    "/couplePicture/image_1.png",
    "/couplePicture/image_2.png",
    "/couplePicture/image_3.png",
    "/couplePicture/image_4.png",
    "/couplePicture/image_5.png",
    "/couplePicture/image_6.png",
    "/couplePicture/image_7.png",
    "/couplePicture/image_8.png",
  ]

  const churchMapUrl = "https://www.google.com/maps/place/Saint+Joseph+Parish+Church+-+Linga,+Pila,+Laguna+(Diocese+of+San+Pablo)/@14.2546574,121.3567373,17z/data=!3m1!4b1!4m6!3m5!1s0x3397e22f40000001:0x7f312324a94e9578!8m2!3d14.2546522!4d121.3593122!16s%2Fg%2F11xlbb5cv?entry=ttu&g_ep=EgoyMDI1MDYwNC4wIKXMDSoASAFQAw%3D%3D"

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % coupleImages.length)
    }, 5000) // Change image every 5 seconds

    QRCode.toDataURL(churchMapUrl, { width: 256, margin: 2, color: { dark: '#B91C1C', light: '#FFF' } })
      .then(setChurchQR)

    // Generate QR code for website URL
    if (typeof window !== 'undefined') {
      QRCode.toDataURL(window.location.href, { 
        width: 256, 
        margin: 2, 
        color: { dark: '#B91C1C', light: '#FFF' } 
      })
      .then(setWebsiteQR)
    }

    return () => {
      clearInterval(timer)
      clearInterval(imageInterval)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "countdown", label: "Countdown" },
    { id: "gallery", label: "Gallery" },
    { id: "details", label: "Details" },
    { id: "entourage", label: "Entourage" },
    { id: "rsvp", label: "RSVP" },
    { id: "registry", label: "Registry" },
    { id: "faq", label: "FAQ" },
  ]

  const galleryImages = [
    { id: 1, caption: "Our First Date", color: "bg-rose-200" },
    { id: 2, caption: "Engagement Day", color: "bg-pink-200" },
    { id: 3, caption: "Family Gathering", color: "bg-orange-200" },
    { id: 4, caption: "Weekend Getaway", color: "bg-rose-300" },
    { id: 5, caption: "Anniversary Celebration", color: "bg-pink-300" },
    { id: 6, caption: "Pre-Wedding Shoot", color: "bg-orange-300" },
  ]

  // Replace SVG floral with PNG image for section corners
  const RealFloralTopLeft = () => (
    <img src="/decoration/flower2.png" alt="Floral Decoration" className="absolute top-0 left-0 w-40 h-auto z-10 pointer-events-none select-none" style={{filter: 'drop-shadow(0 4px 12px rgba(191,161,74,0.15))'}} />
  )
  const RealFloralBottomRight = () => (
    <img src="/decoration/flower2.png" alt="Floral Decoration" className="absolute bottom-0 right-0 w-48 h-auto z-10 pointer-events-none select-none rotate-180" style={{filter: 'drop-shadow(0 4px 12px rgba(191,161,74,0.15))'}} />
  )

  const GoldFrame = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="60,40 940,40 960,560 40,560 60,40" stroke="#B76E79" strokeWidth="6" fill="none"/>
      <polyline points="80,80 920,80 920,520 80,520 80,80" stroke="#D4A5A5" strokeWidth="2" fill="none"/>
    </svg>
  )

  const SectionHeader = ({ children, noFloral }: { children: React.ReactNode, noFloral?: boolean }) => (
    <div className="relative mb-10 md:mb-16">
      {!noFloral && <RealFloralTopLeft />}
      <h2 className="great-vibes-regular text-3xl md:text-5xl lg:text-6xl text-[#B91C1C] mb-4 md:mb-6 text-center drop-shadow-lg z-20 relative">{children}</h2>
      <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-4 md:mb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#BFA14A] to-transparent flex-1 max-w-16 md:max-w-32"></div>
        <Star className="h-4 w-4 text-[#BFA14A]" />
        <div className="h-px bg-gradient-to-r from-transparent via-[#BFA14A] to-transparent flex-1 max-w-16 md:max-w-32"></div>
      </div>
    </div>
  )

  const SectionFooter = () => (
    <div className="w-full flex justify-center mt-8">
      <div className="w-24 h-1 bg-rose-200"></div>
    </div>
  );

  const Footer = () => (
    <footer className="w-full py-6 mt-12 bg-rose-50">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 text-sm">
          Developed by{" "}
          <a
            href="https://lance28-beep.github.io/portfolio-website/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-400 hover:text-rose-500 transition-colors"
          >
            Lance
          </a>
        </p>
      </div>
    </footer>
  );

  // Add new floral decoration components
  const RealFloralTopRight = () => (
    <img src="/decoration/flower.png" alt="Floral Decoration" className="absolute top-0 right-0 w-32 sm:w-40 h-auto z-10 pointer-events-none select-none opacity-70" style={{filter: 'drop-shadow(0 4px 12px rgba(183,110,121,0.10))'}} />
  )
  const RealFloralBottomLeft = () => (
    <img src="/decoration/flower3.png" alt="Floral Decoration" className="absolute bottom-0 left-0 w-32 sm:w-40 h-auto z-10 pointer-events-none select-none opacity-70" style={{filter: 'drop-shadow(0 4px 12px rgba(183,110,121,0.10))'}} />
  )

  // Add a floral accent icon for countdown
  const CountdownFloral = () => (
    <img src="/decoration/flower3.png" alt="Floral Accent" className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 opacity-80 select-none pointer-events-none" />
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 animate-float">
          <Star className="h-4 w-4 text-rose-300 animate-pulse-soft" />
        </div>
        <div className="absolute top-40 right-20 animate-float">
          <Sparkles className="h-6 w-6 text-pink-300 animate-pulse-soft" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float">
          <Heart className="h-5 w-5 text-rose-400 animate-pulse-soft" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float">
          <Star className="h-3 w-3 text-orange-300 animate-pulse-soft" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-card z-50 border-b border-rose-200/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-rose-500 animate-pulse-soft" />
              <span className="great-vibes-regular text-2xl text-rose-600">M & R</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="playfair-display text-rose-700 hover:text-rose-900 transition-all duration-300 font-medium hover:scale-105 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-rose-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-rose-600" /> : <Menu className="h-6 w-6 text-rose-600" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-rose-200/30 glass-card">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 px-2 text-rose-700 hover:text-rose-900 hover:bg-rose-100/50 transition-all duration-300 rounded-lg playfair-display"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-gradient-to-br from-[#FFF1F1] via-[#FDE6E6] to-[#FDF6F0]">
        {/* Floral Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img src="/decoration/image.png" alt="Floral Background" className="w-full h-full object-cover object-center opacity-80" style={{filter: 'blur(0px)'}} />
        </div>
        {/* Animated Floral Decorations */}
        <div className="absolute top-0 left-0 z-20 animate-float-slow">
          <RealFloralTopLeft />
        </div>
        <div className="absolute top-0 right-0 z-20 animate-float-slow-reverse">
          <RealFloralTopRight />
        </div>
        <div className="absolute bottom-0 left-0 z-20 animate-float-slow">
          <RealFloralBottomLeft />
        </div>
        <div className="absolute bottom-0 right-0 z-20 animate-float-slow-reverse">
          <RealFloralBottomRight />
        </div>
        {/* Terracotta Geometric Frame */}
        <GoldFrame />
        {/* Subtle Terracotta Sparkles Overlay */}
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(183,110,121,0.12)_0,transparent_70%)]"></div>
          <div className="w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(183,110,121,0.10)_0,transparent_70%)]"></div>
          {/* Animated vignette for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fff3] to-[#B76E79]/20 pointer-events-none animate-vignette-fade"></div>
        </div>
        {/* Glassmorphism Card */}
        <div className="relative z-40 flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/60 border border-[#B76E79]/30 rounded-3xl shadow-2xl p-4 sm:p-8 flex flex-col items-center w-full">
            <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-[#B76E79] shadow-2xl mb-4 sm:mb-6 bg-white/60 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#F3C6C6] shadow-lg blur-sm z-10 pointer-events-none"></div>
              <Image
                src="/couplePicture/image_1.png"
                alt="Couple Photo"
                fill
                className="object-cover object-center relative z-20"
                priority
              />
            </div>
            <div className="text-center space-y-3 sm:space-y-4 px-2 w-full">
              <p className="text-base sm:text-lg md:text-xl font-serif text-[#B76E79] tracking-wider uppercase leading-relaxed">
                You are cordially invited to attend the wedding of
              </p>
              <div className="relative flex flex-col items-center justify-center animate-fade-in">
                <h1 className="great-vibes-regular text-5xl sm:text-6xl md:text-7xl text-[#B91C1C] font-bold mb-2 leading-tight drop-shadow-lg shimmer-text" style={{textShadow: '0 2px 12px #fff6, 0 1px 0 #B76E79'}}>Myke <span className="mx-2">&</span> Rose</h1>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-40 h-10 rounded-full bg-[#B76E79]/10 blur-2xl opacity-70 animate-glow"></div>
                </div>
                <div className="w-24 sm:w-32 h-3 -mt-2 flex items-center justify-center">
                  <svg width="100%" height="100%" viewBox="0 0 120 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6 Q60 18 110 6" stroke="#B76E79" strokeWidth="2" fill="none"/>
                    <circle cx="60" cy="6" r="2.5" fill="#B76E79"/>
                  </svg>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3 mt-2">
                <p className="text-base sm:text-lg md:text-xl font-serif text-[#B76E79] leading-relaxed">
                  Saturday, June 14, 2025 &bull; 10:00 AM
                </p>
                <p className="text-sm sm:text-base md:text-lg font-serif text-[#B76E79] leading-relaxed">
                  St. Joseph Parish, Barangay Linga, Pila, Laguna
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 w-full">
                <Button 
                  aria-label="RSVP Now"
                  onClick={() => scrollToSection("rsvp")}
                  className="bg-[#B76E79] hover:bg-[#9B5A63] text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg font-semibold animate-pulse-soft focus:ring-2 focus:ring-[#B76E79]/50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                  RSVP Now
                </Button>
                <Button 
                  aria-label="View Details"
                  onClick={() => scrollToSection("details")}
                  variant="outline"
                  className="border-[#B76E79] text-[#B76E79] hover:bg-[#B76E79] hover:text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-lg font-semibold focus:ring-2 focus:ring-[#B76E79]/50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20l9-5-9-5-9 5 9 5z"/></svg>
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section id="countdown" className="py-12 sm:py-24 bg-gradient-to-r from-[#FFF1F1] via-[#FDE6E6] to-[#FDF6F0] relative overflow-hidden">
        {/* Animated popping heart decoration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.7 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
          className="absolute left-1/2 -translate-x-1/2 -top-8 sm:-top-12 z-30"
        >
          <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-[#B91C1C] drop-shadow-lg" fill="#B91C1C" />
        </motion.div>
        <SectionHeader noFloral>Countdown to Our Big Day</SectionHeader>
        <div className="container mx-auto px-2 sm:px-4 relative z-20">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-[#B76E79] to-transparent flex-1 max-w-20 sm:max-w-32"></div>
            <p className="playfair-display text-[#B76E79] text-base sm:text-xl">Every moment brings us closer to forever</p>
            <div className="h-px bg-gradient-to-r from-transparent via-[#B76E79] to-transparent flex-1 max-w-20 sm:max-w-32"></div>
          </div>
          {/* Glassmorphism card for countdown grid */}
          <div className="relative max-w-xs sm:max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-white/70 rounded-2xl blur-sm z-0" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 relative z-10">
              {[{ label: "Days", value: timeLeft.days, aria: 'Days left' },
                { label: "Hours", value: timeLeft.hours, aria: 'Hours left' },
                { label: "Minutes", value: timeLeft.minutes, aria: 'Minutes left' },
                { label: "Seconds", value: timeLeft.seconds, aria: 'Seconds left', highlight: true },
              ].map((item, idx) => (
                <div
                  key={item.label}
                  className={`backdrop-blur-lg bg-gradient-to-br from-[#FFF1F1] via-white to-[#FDE6E6] border-4 border-transparent rounded-2xl shadow-2xl transition-all duration-500 flex flex-col items-center py-6 px-3 sm:py-10 sm:px-6 min-w-[90px] max-w-[140px] mx-auto relative
                    ${item.highlight ? 'ring-2 ring-[#B76E79]/60 ring-offset-2 animate-glow' : ''}`}
                  style={{
                    borderImage: 'linear-gradient(135deg, #B76E79 0%, #F3E5AB 40%, #B91C1C 100%) 1',
                    boxShadow: '0 4px 24px 0 #B76E7922, inset 0 2px 8px #fff8',
                  }}
                  aria-label={item.aria}
                >
                  <Counter
                    value={item.value}
                    places={[10, 1]}
                    fontSize={40}
                    padding={4}
                    gap={4}
                    textColor="#B91C1C"
                    fontWeight={900}
                    containerStyle={{ width: '100%', justifyContent: 'center' }}
                    counterStyle={{ width: '100%', justifyContent: 'center' }}
                    digitStyle={{ minWidth: 28, textAlign: 'center' }}
                    gradientHeight={10}
                    gradientFrom="#fff"
                    gradientTo="transparent"
                  />
                  <div className="playfair-display text-[#B76E79] font-semibold text-sm sm:text-lg tracking-wide uppercase letter-spacing-wider mt-3">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <SectionFooter />
      </section>

      {/* Gallery Section with Marquee */}
      <section id="gallery" className="py-24 bg-gradient-to-br from-[#FFF1F1] via-[#FDE6E6] to-[#FDF6F0] relative overflow-hidden">
        <SectionHeader>Our Love Story</SectionHeader>
        <div className="container mx-auto px-4 flex flex-col items-center gap-10">
          <div className="max-w-2xl w-full mx-auto mb-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-[#B76E79]/30 p-6 sm:p-10 text-center">
            <h3 className="great-vibes-regular text-2xl sm:text-3xl text-[#B91C1C] mb-4">From Kuya to Forever</h3>
            <p className="playfair-display text-[#B76E79] text-base sm:text-lg leading-relaxed">
              We met at Continental — two people working in the same company, just living out our daily routines. She used to call me Kuya, just a term of respect, nothing more. At first, I smiled at the thought — it meant she saw me as someone she could rely on.<br/><br/>
              But time has a way of changing everything.<br/><br/>
              Conversations turned into laughter, lunches became moments I looked forward to, and before I knew it, I wasn't just her Kuya — I was falling. Slowly, deeply, silently.<br/><br/>
              And then one day, she looked at me differently. Not as a kuya, not as a colleague — but as someone she could share forever with.<br/><br/>
              Now, here we are. I'm not just the guy she used to call Kuya. I'm the man she's about to marry. From strangers to teammates, from Kuya to fiancé…<br/><br/>
              Today, she becomes my bride. And I get to say I do to the love I never saw coming — but one I'll never let go.
            </p>
          </div>
          <Stack
            randomRotation={true}
            sensitivity={180}
            sendToBackOnClick={false}
            cardDimensions={{ width: 300, height: 300 }}
            cardsData={[
              { id: 1, img: "/couplePicture/image_1.png" },
              { id: 2, img: "/couplePicture/image_2.png" },
              { id: 3, img: "/couplePicture/image_3.png" },
              { id: 4, img: "/couplePicture/image_4.png" },
              { id: 5, img: "/couplePicture/image_5.png" },
              { id: 6, img: "/couplePicture/image_6.png" },
              { id: 7, img: "/couplePicture/image_7.png" },
              { id: 8, img: "/couplePicture/image_8.png" },
   
            ]}
          />
        </div>
        <SectionFooter />
      </section>

      
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 via-white to-pink-50/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="great-vibes-regular text-4xl md:text-5xl text-rose-600 mb-6">Message Wall</h2>
            <p className="playfair-display text-rose-500 text-lg max-w-xl mx-auto">
              See the love and blessings from friends and family below! Your message will be posted instantly and shared with everyone who visits this page. Add your own and help make this wall a living memory for the couple.
            </p>
          </div>
          {(() => {
            const [messages, setMessages] = useState<Message[]>([]);
            const [loading, setLoading] = useState(true);
            const fetchMessages = useCallback(() => {
              setLoading(true);
              fetch('https://script.google.com/macros/s/AKfycbyv4gErkI7w7vmRGjvGjPedlCYGx6ZUl8PwH3c5iEgWvKz-M0ZYLSAqDax9sutxkyCv/exec')
                .then(res => res.json())
                .then(data => {
                  const rows: string[][] = data.GoogleSheetData;
                  const [header, ...entries] = rows;
                  const idxName = header.findIndex((h: string) => h.toLowerCase().includes('name'));
                  const idxMsg = header.findIndex((h: string) => h.toLowerCase().includes('message'));
                  const idxTime = header.findIndex((h: string) => h.toLowerCase().includes('timestamp'));
                  const parsed = entries
                    .map((row: string[]) => ({
                      timestamp: row[idxTime],
                      name: row[idxName],
                      message: row[idxMsg],
                    }))
                    .reverse();
                  setMessages(parsed);
                  setLoading(false);
                });
            }, []);
            useEffect(() => { fetchMessages(); }, [fetchMessages]);
            return <>
              <div className="flex flex-col items-center justify-center mb-4 px-2 gap-2">
                <span className="text-sm text-[#B76E79] font-medium">
                  Messages: {messages.length}
                </span>
                <a
                  href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSZmAM85PhE-OhAdz8vkzlqeWOGk2sLC9N0GMqDnF4bVqiX26q0JenRbFC2FG-ZrGZ_99TdKr7Fo63G/pubhtml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#B76E79] text-white font-semibold shadow hover:bg-[#B91C1C] transition-all text-xs sm:text-sm"
                >
                  View All Messages in Google Sheets
                </a>
              </div>
              <div className="space-y-6 md:space-y-10">
                <MessageWallDisplay messages={messages} loading={loading} />
              </div>
              <div className="text-center mb-10 mt-8">
                <h3 className="great-vibes-regular text-2xl md:text-3xl text-rose-600 mb-2">Leave Your Congratulations</h3>
                <p className="playfair-display text-rose-500 text-base max-w-xl mx-auto">
                  Add your message below and help make this wall a living memory for the couple!
                </p>
              </div>
              <MessageWallForm onSuccess={fetchMessages} />
            </>;
          })()}
        </div>
      </section>

      {/* Wedding Details Section */}
      <section id="details" className="py-24 bg-gradient-to-br from-[#FFF1F1] via-[#FDE6E6] to-[#FDF6F0] relative">
        <SectionHeader>Wedding Details</SectionHeader>
        <div className="container mx-auto px-4">
          {/* Enhanced Church Card */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-4xl mx-auto mb-16 bg-white/90 rounded-3xl shadow-2xl border-2 border-[#D4AF37] p-8 md:p-12 relative z-10">
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center">
              <img
                src="/church.png"
                alt="St. Joseph Parish Church"
                className="rounded-2xl shadow-lg border-4 border-[#F3CF7A] w-full max-w-xs object-cover mb-4 md:mb-0"
              />
              <span className="text-xs text-[#B8860B] mt-2 playfair-display">St. Joseph Parish, Barangay Linga, Pila, Laguna</span>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center gap-4">
              <h3 className="playfair-display text-[#B91C1C] text-2xl font-bold flex items-center gap-2 justify-center"><Calendar className="h-7 w-7 text-[#D4AF37]" /> Ceremony</h3>
              <div>
                <h4 className="playfair-display font-semibold text-[#B91C1C] text-lg mb-1">Date & Time</h4>
                <p className="text-[#B8860B] text-lg">Saturday, June 14, 2025 at 10:00 AM</p>
              </div>
              <div>
                <h4 className="playfair-display font-semibold text-[#B91C1C] text-lg mb-1">Location</h4>
                <p className="text-[#B91C1C] text-lg font-medium">ST. JOSEPH PARISH</p>
                <p className="text-[#B8860B]">Barangay Linga, Pila, Laguna</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-2 w-full">
                <a
                  href={churchMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B76E79] hover:bg-[#9B5A63] text-white font-semibold shadow transition-all duration-300 text-lg focus:ring-2 focus:ring-[#B76E79]/50 justify-center"
                >
                  <MapPin className="h-5 w-5" />
                  Open in Google Maps
                </a>
                {/* Dynamically generated QR code for Google Maps link */}
                <div className="flex flex-col items-center justify-center">
                  {churchQR && (
                    <img
                      src={churchQR}
                      alt="Google Maps QR Code"
                      className="w-28 h-28 rounded-xl border-2 border-[#BFA14A] shadow-md bg-white"
                    />
                  )}
                  <span className="text-xs text-[#B8860B] mt-1 playfair-display">Scan for directions</span>
                </div>
              </div>
            </div>
          </div>
          {/* Reception Section - Enhanced */}
          <div className="w-full flex justify-center items-center mb-12">
            <Card className="border-2 border-[#D4AF37] shadow-2xl bg-white/90 rounded-3xl px-8 py-10 max-w-lg w-full flex flex-col items-center">
              <CardHeader className="w-full flex flex-col items-center text-center mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-8 w-8 text-[#D4AF37]" />
                  <CardTitle className="playfair-display text-[#B91C1C] text-2xl sm:text-3xl font-bold">Reception</CardTitle>
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37] to-[#D4AF37]/0 rounded-full mb-2" />
              </CardHeader>
              <CardContent className="w-full flex flex-col gap-6 items-center justify-center text-center">
                <div className="w-full flex flex-col gap-4">
                  <div className="bg-rose-50/70 border border-rose-100 rounded-xl py-5 px-4 flex flex-col items-center shadow-sm">
                    <span className="text-[#B91C1C] font-semibold text-lg flex items-center gap-2 mb-1"><Clock className="inline w-5 h-5 text-[#BFA14A]" /> Time</span>
                    <span className="text-[#B8860B] text-xl font-bold tracking-wide">12:00 PM</span>
                  </div>
                  <div className="bg-rose-50/70 border border-rose-100 rounded-xl py-5 px-4 flex flex-col items-center shadow-sm">
                    <span className="text-[#B91C1C] font-semibold text-lg flex items-center gap-2 mb-1"><MapPin className="inline w-5 h-5 text-[#BFA14A]" /> Location</span>
                    <span className="text-[#B91C1C] text-xl font-bold">CRUZ Residence</span>
                    <span className="text-[#B8860B] text-base mt-1">Barangay Linga, Pila, Laguna</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="max-w-5xl mx-auto border-2 border-[#D4AF37] shadow-xl glass-card mb-8 bg-white/80 flex flex-col items-center justify-center text-center">
            <CardHeader className="w-full flex flex-col items-center justify-center text-center">
              <CardTitle className="playfair-display text-[#B91C1C] text-2xl w-full text-center">Attire Guide</CardTitle>
            </CardHeader>
            <CardContent className="p-8 flex flex-col items-center justify-center text-center w-full">
              <p className="mb-6 text-[#B8860B] text-lg playfair-display text-center">
                We would encourage you to dress according to our wedding colors:
              </p>
              <div className="flex flex-wrap gap-4 mb-8 justify-center items-center w-full">
                {[
                  { color: "#c86f5e", name: "Terracotta" },
                  { color: "#f3cf7a", name: "Golden" },
                  { color: "#e7b3b3", name: "Dusty Rose" },
                  { color: "#fccde2", name: "Blush Pink" },
                  { color: "#fcefee", name: "Cream" },
                ].map((colorItem) => (
                  <div
                    key={colorItem.color}
                    className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-[#FFF1F1] transition-colors text-center"
                  >
                    <div
                      className="w-12 h-12 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform"
                      style={{ backgroundColor: colorItem.color }}
                    ></div>
                    <span className="text-sm text-[#B8860B] playfair-display font-medium text-center">{colorItem.name}</span>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6 w-full justify-center items-center text-center">
                <div className="space-y-4 flex flex-col items-center text-center">
                  <div>
                    <h4 className="playfair-display font-semibold text-[#B91C1C] text-lg mb-2 text-center">Principal Sponsors:</h4>
                    <p className="text-[#B8860B] text-center">Formal attire</p>
                  </div>
                  <div>
                    <h4 className="playfair-display font-semibold text-[#B91C1C] text-lg mb-2 text-center">Ladies:</h4>
                    <p className="text-[#B8860B] text-center">Long Gown/Dress, Formal Coordinates</p>
                  </div>
                </div>
                <div className="space-y-4 flex flex-col items-center text-center">
                  <div>
                    <h4 className="playfair-display font-semibold text-[#B91C1C] text-lg mb-2 text-center">Gentlemen:</h4>
                    <p className="text-[#B8860B] text-center">Barong, Long Sleeves or Polo and Slacks</p>
                  </div>
                  <div>
                    <h4 className="playfair-display font-semibold text-[#B91C1C] text-lg mb-2 text-center">Other guests:</h4>
                    <p className="text-[#B8860B] text-center">Semi-formal</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="max-w-4xl mx-auto border-2 border-[#D4AF37] shadow-xl bg-gradient-to-r from-[#FFFDD0] to-[#FDE6E6]">
            <CardHeader>
              <CardTitle className="playfair-display text-[#B91C1C] flex items-center text-2xl">
                <Phone className="h-8 w-8 mr-3 text-[#D4AF37]" />
                Unplugged Ceremony
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-[#B8860B] text-lg leading-relaxed playfair-display">
                We truly appreciate the genuine happiness felt on this celebration with you. Please turn off/silent your
                phones and cameras until after the ceremony.
              </p>
            </CardContent>
          </Card>
        </div>
        <SectionFooter />
      </section>

      {/* Entourage Section */}
      <section id="entourage" className="py-12 sm:py-24 bg-gradient-to-r from-[#FFF1F1] via-[#FDE6E6] to-[#FDF6F0] relative">
        <SectionHeader>The Entourage</SectionHeader>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-8 sm:mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-[#BFA14A] to-transparent flex-1 max-w-16 sm:max-w-32"></div>
            <p className="playfair-display text-[#B8860B] text-base sm:text-xl text-center">Our beloved family and friends who will stand with us</p>
            <div className="h-px bg-gradient-to-r from-transparent via-[#BFA14A] to-transparent flex-1 max-w-16 sm:max-w-32"></div>
          </div>
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-12">
            {/* Parents */}
            <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
              <Card className="relative overflow-hidden group">
                <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative p-4 sm:p-6">
                  <CardTitle className="great-vibes-regular text-rose-600 text-2xl sm:text-3xl">Parents of the Groom</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-8 text-center">
                  <div className="space-y-3 sm:space-y-4">
                    <p className="text-gray-700 text-base sm:text-xl playfair-display hover:text-rose-600 transition-colors">Rosalinda Pachica</p>
                    <p className="text-gray-700 text-base sm:text-xl playfair-display hover:text-rose-600 transition-colors">Carlito Pachica</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden group">
                <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative p-4 sm:p-6">
                  <CardTitle className="great-vibes-regular text-rose-600 text-2xl sm:text-3xl">Parents of the Bride</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-8 text-center">
                  <div className="space-y-3 sm:space-y-4">
                    <p className="text-gray-700 text-base sm:text-xl playfair-display hover:text-rose-600 transition-colors">Angelita Cruz</p>
                    <p className="text-gray-700 text-base sm:text-xl playfair-display hover:text-rose-600 transition-colors">Jose Eneric Cruz</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Principal Sponsors */}
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-lg"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
              <CardHeader className="text-center p-4 sm:p-6">
                <CardTitle className="great-vibes-regular text-rose-600 text-2xl sm:text-3xl">Principal Sponsors</CardTitle>
                <p className="playfair-display text-rose-500 text-base sm:text-xl">To stand as witness to our vows</p>
              </CardHeader>
              <CardContent className="p-4 sm:p-8">
                <div className="grid md:grid-cols-2 gap-3 sm:gap-6">
                  {[
                    "Susana Cortez & Ernesto Cortez",
                    "Jenalyn Cruz & Antonio Cruz Jr.",
                    "Anita Estuche & Mario Pachica",
                    "Anna Lyn Cruz & Ferdinand Cruz",
                    "Teresita Gata & Domingo Gata",
                    "Arlene Datoy & Ramiro Datoy",
                  ].map((sponsor) => (
                    <div key={sponsor} className="text-center p-3 sm:p-4 rounded-lg bg-rose-50/50 border border-rose-100 hover:bg-rose-50 transition-all duration-300 hover:scale-105 hover:shadow-md">
                      <p className="text-gray-700 text-sm sm:text-lg playfair-display">{sponsor}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Best Man & Maid of Honor */}
            <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
              <Card className="relative overflow-hidden group">
                <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative p-4 sm:p-6">
                  <CardTitle className="great-vibes-regular text-rose-600 text-2xl sm:text-3xl">Best Man</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-8 text-center">
                  <p className="text-gray-700 text-base sm:text-xl playfair-display hover:text-rose-600 transition-colors">Benedict Pachica</p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden group">
                <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative p-4 sm:p-6">
                  <CardTitle className="great-vibes-regular text-rose-600 text-2xl sm:text-3xl">Maid of Honor</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-8 text-center">
                  <p className="text-gray-700 text-base sm:text-xl playfair-display hover:text-rose-600 transition-colors">Erica Angela Cruz</p>
                </CardContent>
              </Card>
            </div>

            {/* Secondary Sponsors */}
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-lg"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
              <CardHeader className="text-center p-4 sm:p-6">
                <CardTitle className="great-vibes-regular text-rose-600 text-2xl sm:text-3xl">Secondary Sponsors</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-8">
                <div className="grid md:grid-cols-3 gap-3 sm:gap-6">
                  <div className="text-center p-4 sm:p-6 rounded-lg bg-rose-50/50 border border-rose-100 hover:bg-rose-50 transition-all duration-300 hover:scale-105 hover:shadow-md">
                    <h4 className="great-vibes-regular text-rose-700 text-xl sm:text-2xl mb-3 sm:mb-4">To Light Our Path</h4>
                    <p className="text-gray-700 text-sm sm:text-lg playfair-display">Rodel Cecilio Rios</p>
                    <p className="text-gray-700 text-sm sm:text-lg playfair-display">Raven Cruz</p>
                  </div>
                  <div className="text-center p-4 sm:p-6 rounded-lg bg-pink-50/50 border border-rose-100 hover:bg-pink-50 transition-all duration-300 hover:scale-105 hover:shadow-md">
                    <h4 className="great-vibes-regular text-rose-700 text-xl sm:text-2xl mb-3 sm:mb-4">To Cloth Us Together</h4>
                    <p className="text-gray-700 text-sm sm:text-lg playfair-display">Mark Gomez</p>
                    <p className="text-gray-700 text-sm sm:text-lg playfair-display">Lara Nicole Reyes</p>
                  </div>
                  <div className="text-center p-4 sm:p-6 rounded-lg bg-orange-50/50 border border-rose-100 hover:bg-orange-50 transition-all duration-300 hover:scale-105 hover:shadow-md">
                    <h4 className="great-vibes-regular text-rose-700 text-xl sm:text-2xl mb-3 sm:mb-4">To Bind Us As One</h4>
                    <p className="text-gray-700 text-sm sm:text-lg playfair-display">Kershey Adriel Abolizo</p>
                    <p className="text-gray-700 text-sm sm:text-lg playfair-display">Zoe Denise Abolizo</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Wedding Party - Enhanced Groomsmen Section */}
            <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
              <Card className="relative overflow-hidden group">
                <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative p-4 sm:p-6">
                  <CardTitle className="great-vibes-regular text-rose-600 text-2xl sm:text-3xl">Groomsmen</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-8 text-center">
                  <div className="space-y-4 sm:space-y-6">
                    {[
                      { name: "Rolando Valle", role: "Lead Groomsman" },
                      { name: "Jairus Earl Gata", role: "Senior Groomsman" },
                      { name: "Karl Lawrence Pachica", role: "Junior Groomsman" },
                    ].map((groomsman, index) => (
                      <div key={index} className="group/item p-2 sm:p-3 rounded-lg hover:bg-rose-50/50 transition-all duration-300">
                        <p className="text-gray-700 text-base sm:text-xl playfair-display hover:text-rose-600 transition-colors">
                          {groomsman.name}
                        </p>
                        <p className="text-rose-400 text-xs sm:text-sm playfair-display opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                          {groomsman.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden group">
                <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative p-4 sm:p-6">
                  <CardTitle className="great-vibes-regular text-rose-600 text-2xl sm:text-3xl">Bridesmaids</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-8 text-center">
                  <div className="space-y-3 sm:space-y-4">
                    <p className="text-gray-700 text-base sm:text-xl playfair-display hover:text-rose-600 transition-colors">Cheska Javier</p>
                    <p className="text-gray-700 text-base sm:text-xl playfair-display hover:text-rose-600 transition-colors">Mary Kaye Gata</p>
                    <p className="text-gray-700 text-base sm:text-xl playfair-display hover:text-rose-600 transition-colors">Robbie Arriane De Guzman</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Special Roles */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { title: "Coin Bearer", name: "Kid Xavier Gomez" },
                { title: "Bible Bearer", name: "Rylie Angelo Matienzo" },
                { title: "Ring Bearer", name: "Yuri Marcus Nacional" },
              ].map((role) => (
                <Card key={role.title} className="relative overflow-hidden group">
                  <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="text-center relative p-4 sm:p-6">
                    <CardTitle className="great-vibes-regular text-rose-600 text-xl sm:text-2xl">{role.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 text-center">
                    <p className="text-gray-700 text-base sm:text-xl playfair-display hover:text-rose-600 transition-colors">{role.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
              <Card className="relative overflow-hidden group">
                <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative p-4 sm:p-6">
                  <CardTitle className="great-vibes-regular text-rose-600 text-2xl sm:text-3xl">Flower Girls</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-8 text-center">
                  <div className="space-y-3 sm:space-y-4">
                    <p className="text-gray-700 text-base sm:text-xl playfair-display hover:text-rose-600 transition-colors">Elisha Bethany Saquing</p>
                    <p className="text-gray-700 text-base sm:text-xl playfair-display hover:text-rose-600 transition-colors">Aeycee Viiladiego</p>
                    <p className="text-gray-700 text-base sm:text-xl playfair-display hover:text-rose-600 transition-colors">Kiana Veronica Ramos</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden group">
                <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative p-4 sm:p-6">
                  <CardTitle className="great-vibes-regular text-rose-600 text-2xl sm:text-3xl">Little Bride</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-8 text-center">
                  <p className="text-gray-700 text-base sm:text-xl playfair-display hover:text-rose-600 transition-colors">Faith Herjen Cruz</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <SectionFooter />
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-12 sm:py-24 bg-gradient-to-br from-[#FFF1F1] via-[#FDE6E6] to-[#FDF6F0] relative">
        <SectionHeader>RSVP</SectionHeader>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-[#BFA14A] to-transparent flex-1 max-w-16 sm:max-w-32"></div>
            <p className="playfair-display text-[#B8860B] text-base sm:text-xl text-center">Please confirm your attendance by JUNE 13, 2025</p>
            <div className="h-px bg-gradient-to-r from-transparent via-[#BFA14A] to-transparent flex-1 max-w-16 sm:max-w-32"></div>
          </div>
          <Card className="max-w-3xl mx-auto border-0 shadow-2xl glass-card">
            <CardContent className="p-4 sm:p-12">
              <RSVPForm />
            </CardContent>
          </Card>
        </div>
        <SectionFooter />
      </section>

      {/* Book of Guests Section */}
      <section className="py-12 sm:py-24 bg-gradient-to-br from-[#FFF1F1] via-[#FDE6E6] to-[#FDF6F0] relative">
        <SectionHeader>Book of Guests</SectionHeader>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-[#BFA14A] to-transparent flex-1 max-w-16 sm:max-w-32"></div>
            <p className="playfair-display text-[#B8860B] text-base sm:text-xl text-center">See who's joining us on our special day</p>
            <div className="h-px bg-gradient-to-r from-transparent via-[#BFA14A] to-transparent flex-1 max-w-16 sm:max-w-32"></div>
          </div>
          <BookOfGuests />
        </div>
        <SectionFooter />
      </section>

      {/* Registry Section */}
      <section id="registry" className="py-12 sm:py-24 bg-gradient-to-r from-[#FFF1F1] via-[#FDE6E6] to-[#FDF6F0] relative">
        <SectionHeader>Gift Guide</SectionHeader>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-8 sm:mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-[#BFA14A] to-transparent flex-1 max-w-16 sm:max-w-32"></div>
            <p className="playfair-display text-[#B8860B] text-base sm:text-xl text-center">Your presence is the greatest gift of all</p>
            <div className="h-px bg-gradient-to-r from-transparent via-[#BFA14A] to-transparent flex-1 max-w-16 sm:max-w-32"></div>
          </div>
          <div className="max-w-5xl mx-auto">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-rose-100 via-pink-100 to-orange-100 relative overflow-hidden">
              <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-lg opacity-50"></div>
              <CardContent className="p-6 sm:p-12 text-center">
                <Gift className="h-16 w-16 sm:h-20 sm:w-20 text-rose-400 mx-auto mb-6 sm:mb-8 animate-float" />
                <h3 className="great-vibes-regular text-3xl sm:text-4xl md:text-5xl text-rose-600 mb-6 sm:mb-8">
                  With All That We Have, We've Been Truly Blessed
                </h3>
                <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto">
                  <p className="text-base sm:text-xl text-gray-700 playfair-display leading-relaxed">
                    Your presence and prayers are all that we request. But if you desire to give nonetheless, a monetary
                    gift is one we humbly suggest.
                  </p>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-rose-200 max-w-2xl mx-auto">
                    <h4 className="playfair-display font-semibold text-rose-700 mb-4 text-lg sm:text-xl">GCash Details</h4>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                      <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-xl overflow-hidden border-2 border-[#D4AF37] bg-white p-2">
                        <Image
                          src="/gcashQR.png"
                          alt="GCash QR Code"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="text-center sm:text-left space-y-3">
                        <p className="text-gray-600 text-sm sm:text-base playfair-display">
                          Scan the QR code or use the following details:
                        </p>
                        <div className="space-y-2">
                          <p className="text-rose-700 font-medium playfair-display">Account Name: <span className="text-gray-700">Myke & Rose</span></p>
                          <p className="text-rose-700 font-medium playfair-display">GCash Number: <span className="text-gray-700">09XX XXX XXXX</span></p>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 playfair-display italic mt-4">
                          *Please include your name in the reference/note when sending
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 playfair-display italic">
                    "The greatest gift you can give someone is your time, because when you give your time, you are giving a portion of your life that you will never get back."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <SectionFooter />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 sm:py-24 bg-gradient-to-br from-[#FFF1F1] via-[#FDE6E6] to-[#FDF6F0] relative">
        <SectionHeader noFloral>Frequently Asked Questions</SectionHeader>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-8 sm:mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-[#BFA14A] to-transparent flex-1 max-w-16 sm:max-w-32"></div>
            <p className="playfair-display text-[#B8860B] text-base sm:text-xl text-center">Everything you need to know about our special day</p>
            <div className="h-px bg-gradient-to-r from-transparent via-[#BFA14A] to-transparent flex-1 max-w-16 sm:max-w-32"></div>
          </div>
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {[
              {
                question: "What time should I arrive?",
                answer: "Please arrive at least 30 minutes before the ceremony starts (9:30 AM) to allow time for seating and preparation.",
                icon: "Clock"
              },
              {
                question: "Is there parking available?",
                answer: "Yes, parking is available at both the church and reception venue. Additional parking instructions will be provided closer to the date.",
                icon: "MapPin"
              },
              {
                question: "What if it rains?",
                answer: "The ceremony will be held indoors at ST. JOSEPH PARISH, so weather won't be an issue. The reception venue also has covered areas.",
                icon: "Cloud"
              },
              {
                question: "Are children welcome?",
                answer: "We love children! However, we kindly request that only children in the wedding party attend to ensure a peaceful ceremony.",
                icon: "Heart"
              },
              {
                question: "What's the hashtag for photos?",
                answer: "#MYKEpicksThePerfectROSE - Please use this hashtag when sharing photos from our special day!",
                icon: "Camera"
              },
            ].map((faq, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-lg opacity-50"></div>
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-rose-50 flex items-center justify-center border-2 border-[#D4AF37]">
                      {faq.icon === "Clock" && <Clock className="w-6 h-6 text-rose-600" />}
                      {faq.icon === "MapPin" && <MapPin className="w-6 h-6 text-rose-600" />}
                      {faq.icon === "Users" && <Users className="w-6 h-6 text-rose-600" />}
                      {faq.icon === "Cloud" && <Cloud className="w-6 h-6 text-rose-600" />}
                      {faq.icon === "Heart" && <Heart className="w-6 h-6 text-rose-600" />}
                      {faq.icon === "Camera" && <Camera className="w-6 h-6 text-rose-600" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="playfair-display font-semibold text-rose-700 mb-2 text-lg sm:text-xl">{faq.question}</h3>
                      <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* QR Share Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-50/30 via-white to-pink-50/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="great-vibes-regular text-5xl md:text-6xl text-rose-600 mb-6">Share Our Joy</h2>
            <div className="flex items-center justify-center space-x-4">
              <div className="h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent flex-1 max-w-32"></div>
              <p className="playfair-display text-rose-500 text-xl">Help us spread the word about our special day</p>
              <div className="h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent flex-1 max-w-32"></div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <Card className="border-0 shadow-xl glass-card mb-12">
              <CardContent className="p-12">
                <div className="relative w-48 h-48 mx-auto mb-8">
                  {websiteQR ? (
                    <img
                      src={websiteQR}
                      alt="Website QR Code"
                      className="w-full h-full object-contain rounded-xl border-2 border-rose-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-rose-50 rounded-xl border-2 border-rose-200">
                      <QrCode className="h-12 w-12 text-rose-400 animate-pulse" />
                    </div>
                  )}
                </div>
                <h3 className="playfair-display text-2xl font-semibold text-rose-700 mb-6">
                  Scan to Share Our Website
                </h3>
                <p className="text-gray-600 mb-8 text-lg playfair-display leading-relaxed">
                  Share this QR code with friends and family so they can easily access our wedding website
                </p>
                <div className="bg-rose-50 rounded-xl p-6 border border-rose-200">
                  <p className="text-sm text-rose-600 font-medium playfair-display">
                    {typeof window !== 'undefined' ? window.location.href : 'Loading...'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-r from-rose-100 to-pink-100">
              <CardContent className="p-6 sm:p-10">
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6">
                    <div className="absolute inset-0 bg-rose-200 rounded-full animate-pulse"></div>
                    <Camera className="h-12 w-12 sm:h-16 sm:w-16 text-rose-600 mx-auto relative z-10 animate-float" />
                  </div>
                  <h3 className="great-vibes-regular text-2xl sm:text-3xl text-rose-700 mb-2 sm:mb-4">Snap & Share</h3>
                  <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg playfair-display leading-relaxed max-w-xl text-center">
                    Help us document our special day by sharing your captured moments using our official hashtag
                  </p>
                  <div className="space-y-6 w-full max-w-md">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-rose-200">
                      <Badge
                        variant="secondary"
                        className="text-base sm:text-lg font-semibold px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-rose-200 to-pink-200 text-rose-700 playfair-display mb-2 sm:mb-4"
                      >
                        #MYKEpicksThePerfectROSE
                      </Badge>
                      <p className="text-sm text-gray-600 playfair-display">
                        Use this hashtag on your social media posts to be featured in our wedding gallery
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-rose-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <svg className="w-6 h-6 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                          <span className="text-gray-700 font-medium">Twitter</span>
                        </div>
                        <p className="text-xs text-gray-500 text-center group-hover:text-rose-600 transition-colors">
                          Share on Twitter
                        </p>
                      </div>
                      
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-rose-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <svg className="w-6 h-6 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                          </svg>
                          <span className="text-gray-700 font-medium">Instagram</span>
                        </div>
                        <p className="text-xs text-gray-500 text-center group-hover:text-rose-600 transition-colors">
                          Share on Instagram
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-rose-200">
                      <p className="text-sm text-gray-600 playfair-display text-center">
                        Your photos will be automatically added to our wedding gallery when you use our hashtag
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#B76E79] text-white py-12 sm:py-16 relative overflow-hidden">
        {/* Removed RealFloralBottomRight and Heart icons */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-4 mb-6 sm:mb-8">
              <span className="great-vibes-regular text-3xl sm:text-5xl">Myke & Rose</span>
              <div className="flex items-center justify-center gap-4 mt-1 sm:mt-2">
                <a href="https://facebook.com/ehmjhayyy027#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#BFA14A] transition-colors text-xl sm:text-2xl"><FaFacebookF /></a>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#BFA14A] transition-colors text-xl sm:text-2xl"><FaInstagram /></a>
                <a href="https://m.me/ehmjhayyy027#" target="_blank" rel="noopener noreferrer" aria-label="Messenger" className="hover:text-[#BFA14A] transition-colors text-xl sm:text-2xl"><FaFacebookMessenger /></a>
              </div>
            </div>
            <p className="text-[#FFFDD0] mb-6 sm:mb-8 text-base sm:text-xl playfair-display">Thank you for being part of our love story</p>
            <div className="flex flex-col justify-center items-center space-y-3 sm:space-y-0 mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-[#D4AF37]" />
                <span className="playfair-display text-sm sm:text-lg">mykeandrose2025@gmail.com</span>
              </div>
            </div>
            <Separator className="bg-[#D4AF37]/50 mb-6 sm:mb-8 max-w-2xl mx-auto" />
            <div className="space-y-2 sm:space-y-4">
              <p className="text-[#FFFDD0] text-sm sm:text-lg playfair-display italic">
                "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day."
              </p>
              <p className="text-[#F3E5AB] text-xs sm:text-sm playfair-display">
                © 2025 Myke & Rose Wedding. Made with ❤️ for our special day.
              </p>
              <p className="text-[#F3E5AB] text-xs sm:text-sm playfair-display mt-4">
                Developed by{" "}
                <a
                  href="https://lance28-beep.github.io/portfolio-website/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:text-[#BFA14A] transition-colors"
                >
                  Lance
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Messenger Floating CTA */}
      <a
        href="https://m.me/ehmjhayyy027#"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#0084FF] hover:bg-[#005ecb] text-white rounded-full p-4 shadow-xl flex items-center justify-center transition-all animate-float"
        aria-label="Chat with us on Messenger"
        style={{ boxShadow: '0 4px 24px 0 #0084FF55' }}
      >
        <FaFacebookMessenger className="w-7 h-7" />
      </a>
    </div>
  )
}
