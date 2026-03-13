'use client'

import { useRef, useState, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const CATS = ['All','Full Stack','Frontend','Backend','UI/UX','Mobile','AI/ML','Clone']

const PROJECTS = [
  { id:1,  title:'Nalanda Open University',   cat:'Full Stack', tags:['Python','Django','MySQL','HTML','CSS'],           year:'2024', desc:'Academic portal with admin dashboard, student data and attendance tracking.',            accent:'#ff2d78', status:'Live' },
  { id:2,  title:'Library Management System', cat:'Full Stack', tags:['MongoDB','Express','React','Node.js'],            year:'2024', desc:'MERN stack LMS with full CRUD, JWT auth and responsive UI.',                          accent:'#ffd60a', status:'Live' },
  { id:3,  title:'E-Commerce Dashboard',      cat:'Full Stack', tags:['Next.js','MongoDB','Tailwind','Redux'],           year:'2024', desc:'Admin dashboard — inventory, orders, analytics and product management.',              accent:'#ff7d1a', status:'Live' },
  { id:4,  title:'Food Delivery App',          cat:'Full Stack', tags:['React','Node.js','MongoDB','Stripe'],            year:'2024', desc:'Food ordering with real-time tracking, cart and payment gateway.',                   accent:'#ff2d78', status:'Live' },
  { id:5,  title:'Blog CMS Platform',          cat:'Full Stack', tags:['Next.js','Prisma','PostgreSQL','Tailwind'],      year:'2024', desc:'CMS with rich text editor, tags, categories and SEO optimization.',                  accent:'#ffd60a', status:'Live' },
  { id:6,  title:'Job Portal',                 cat:'Full Stack', tags:['MERN','JWT','Cloudinary','Redux'],               year:'2023', desc:'Job listing platform with recruiter/candidate roles and resume upload.',             accent:'#c026d3', status:'Live' },
  { id:7,  title:'Hospital Management',        cat:'Full Stack', tags:['React','Node.js','MongoDB','Express'],           year:'2024', desc:'Patient records, doctor scheduling and appointment booking with role-based access.', accent:'#ff2d78', status:'Beta' },
  { id:8,  title:'Real Estate Platform',       cat:'Full Stack', tags:['Next.js','MongoDB','Mapbox','Cloudinary'],       year:'2024', desc:'Property listings with map view, filters, contact forms and agent profiles.',        accent:'#ffd60a', status:'Live' },
  { id:9,  title:'Social Media App',           cat:'Full Stack', tags:['React','Node.js','Socket.io','MongoDB'],         year:'2024', desc:'Social platform — posts, likes, comments, follow system and real-time chat.',        accent:'#ff7d1a', status:'Beta' },
  { id:10, title:'Online Learning Platform',   cat:'Full Stack', tags:['Next.js','MongoDB','Stripe','Cloudinary'],       year:'2024', desc:'Course platform with video streaming, quiz, progress tracking and certificates.',    accent:'#ff2d78', status:'Live' },
  { id:11, title:'Travel Booking App',         cat:'Full Stack', tags:['MERN','Stripe','Mapbox','Redux'],                year:'2024', desc:'Book hotels, flights and tours with itinerary builder and payment.',                 accent:'#c026d3', status:'Live' },
  { id:12, title:'Expense Tracker',            cat:'Full Stack', tags:['React','Node.js','MongoDB','Chart.js'],          year:'2023', desc:'Personal finance tracker with income/expense charts and budget goals.',              accent:'#ffd60a', status:'Live' },
  { id:13, title:'Real-time Chat App',         cat:'Full Stack', tags:['React','Socket.io','Node.js','MongoDB'],         year:'2024', desc:'Messaging with rooms, online status, file sharing and notifications.',               accent:'#ff2d78', status:'Live' },
  { id:14, title:'Inventory Management',       cat:'Full Stack', tags:['Next.js','PostgreSQL','Prisma','Tailwind'],      year:'2024', desc:'Stock management with barcode support, purchase orders and reporting.',              accent:'#ff7d1a', status:'Live' },
  { id:15, title:'Event Management Platform',  cat:'Full Stack', tags:['MERN','Stripe','Nodemailer','Redux'],            year:'2024', desc:'Create and sell tickets with QR code check-in system.',                             accent:'#ffd60a', status:'Live' },
  { id:16, title:'Lenskart Clone',             cat:'Frontend',   tags:['React.js','CSS','React Router','JS'],           year:'2024', desc:'Responsive Lenskart clone — product listing, cart and routing.',                    accent:'#ff2d78', status:'Live' },
  { id:17, title:'GTA VI Landing Page',        cat:'Frontend',   tags:['React','Framer Motion','Tailwind','GSAP'],       year:'2024', desc:'Interactive GTA VI page with cinematic scroll and parallax.',                       accent:'#ffd60a', status:'Live' },
  { id:18, title:'OCHI Design Clone',          cat:'Frontend',   tags:['React','GSAP','Framer Motion'],                 year:'2024', desc:'Premium agency site with smooth scroll, custom cursor and transitions.',             accent:'#c026d3', status:'Live' },
  { id:19, title:'Apple Website Clone',        cat:'Frontend',   tags:['React','Three.js','GSAP','Tailwind'],           year:'2024', desc:'3D iPhone scroll animation and product showcase inspired by Apple.com.',             accent:'#ff2d78', status:'Live' },
  { id:20, title:'Nike Store UI',              cat:'Frontend',   tags:['React','Tailwind','Framer Motion'],             year:'2024', desc:'Minimal Nike product landing with high-performance scroll.',                         accent:'#ff7d1a', status:'Live' },
  { id:21, title:'Portfolio Website v1',       cat:'Frontend',   tags:['HTML','CSS','JavaScript','GSAP'],               year:'2023', desc:'First personal portfolio with scroll animations and responsive layout.',             accent:'#ffd60a', status:'Live' },
  { id:22, title:'Portfolio Website v2',       cat:'Frontend',   tags:['React','Framer Motion','Tailwind'],             year:'2024', desc:'Upgraded portfolio with Three.js background and dark mode.',                         accent:'#ff2d78', status:'Live' },
  { id:23, title:'Agency Landing Page',        cat:'Frontend',   tags:['Next.js','GSAP','Tailwind','ScrollTrigger'],    year:'2024', desc:'Modern agency page with horizontal scroll and magnetic buttons.',                   accent:'#c026d3', status:'Live' },
  { id:24, title:'SaaS Dashboard UI',          cat:'Frontend',   tags:['React','Recharts','Tailwind','Headless UI'],    year:'2024', desc:'Analytics dashboard with charts, tables and dark/light toggle.',                    accent:'#ffd60a', status:'Live' },
  { id:25, title:'Spotify UI Clone',           cat:'Frontend',   tags:['React','Tailwind CSS','CSS Grid'],              year:'2024', desc:'Pixel-perfect Spotify web player — sidebar, player bar and playlists.',             accent:'#ff2d78', status:'Live' },
  { id:26, title:'Tesla Website Clone',        cat:'Frontend',   tags:['React','Styled Components','Framer Motion'],   year:'2023', desc:'Fullscreen scroll sections showcasing Tesla models.',                                accent:'#ff7d1a', status:'Live' },
  { id:27, title:'Weather App UI',             cat:'Frontend',   tags:['React','OpenWeather API','CSS'],                year:'2023', desc:'Weather dashboard with 7-day forecast and animated icons.',                          accent:'#ffd60a', status:'Live' },
  { id:28, title:'YouTube Clone UI',           cat:'Frontend',   tags:['React','YouTube API','Material UI'],            year:'2023', desc:'YouTube-like video browsing with search and video player.',                          accent:'#ff2d78', status:'Live' },
  { id:29, title:'Twitter/X Clone UI',         cat:'Frontend',   tags:['React','Tailwind','Framer Motion'],             year:'2024', desc:'Tweet feed, profile pages and trending with dark mode.',                            accent:'#c026d3', status:'Live' },
  { id:30, title:'Crypto Dashboard',           cat:'Frontend',   tags:['React','CoinGecko API','Chart.js','Tailwind'],  year:'2024', desc:'Live crypto prices, portfolio tracker and market cap charts.',                     accent:'#ffd60a', status:'Live' },
  { id:31, title:'REST API — Auth Service',    cat:'Backend',    tags:['Node.js','Express','JWT','MongoDB'],            year:'2024', desc:'Secure auth microservice — login, register, refresh tokens.',                       accent:'#ff2d78', status:'Live' },
  { id:32, title:'GraphQL API Server',         cat:'Backend',    tags:['Node.js','GraphQL','Apollo','MongoDB'],         year:'2024', desc:'Full GraphQL API with resolvers, subscriptions and auth.',                          accent:'#ff7d1a', status:'Live' },
  { id:33, title:'File Upload Service',        cat:'Backend',    tags:['Node.js','Multer','Cloudinary','Express'],      year:'2023', desc:'Multi-file upload API with image compression and cloud storage.',                   accent:'#ffd60a', status:'Live' },
  { id:34, title:'Email Notification System',  cat:'Backend',    tags:['Node.js','Nodemailer','Bull Queue','Redis'],    year:'2024', desc:'Queued email service with templates, retries and delivery tracking.',               accent:'#ff2d78', status:'Live' },
  { id:35, title:'Payment Gateway API',        cat:'Backend',    tags:['Node.js','Stripe','Razorpay','Webhooks'],       year:'2024', desc:'Stripe + Razorpay integration with webhooks and refunds.',                          accent:'#c026d3', status:'Live' },
  { id:36, title:'WebSocket Chat Server',      cat:'Backend',    tags:['Node.js','Socket.io','Redis','MongoDB'],        year:'2024', desc:'Real-time chat backend with rooms, typing indicators and presence.',                accent:'#ffd60a', status:'Live' },
  { id:37, title:'Blog API',                   cat:'Backend',    tags:['Node.js','Express','MongoDB','Cloudinary'],     year:'2023', desc:'CRUD blog API with tags, categories, pagination and image upload.',                 accent:'#ff2d78', status:'Live' },
  { id:38, title:'E-Commerce Order API',       cat:'Backend',    tags:['Node.js','MongoDB','Express','JWT'],            year:'2024', desc:'Order management API — cart, checkout, inventory deduction.',                      accent:'#ff7d1a', status:'Live' },
  { id:39, title:'URL Shortener Service',      cat:'Backend',    tags:['Node.js','Redis','MongoDB','Express'],          year:'2023', desc:'High-performance URL shortener with analytics and custom aliases.',                 accent:'#ffd60a', status:'Live' },
  { id:40, title:'Push Notification Service',  cat:'Backend',    tags:['Node.js','FCM','Express','MongoDB'],            year:'2024', desc:'Firebase push notifications for web and mobile with topics.',                       accent:'#ff2d78', status:'Live' },
  { id:41, title:'EdTech App Design',          cat:'UI/UX',      tags:['Figma','Prototyping','Design System'],          year:'2024', desc:'Full mobile learning app — screens, flows, components.',                            accent:'#c026d3', status:'Done' },
  { id:42, title:'FinTech Dashboard Design',   cat:'UI/UX',      tags:['Figma','Auto Layout','Variables'],              year:'2024', desc:'Banking dashboard with dark mode, data visualization and components.',             accent:'#ffd60a', status:'Done' },
  { id:43, title:'Healthcare App UI',          cat:'UI/UX',      tags:['Figma','Prototyping','User Research'],          year:'2024', desc:'Patient-facing mobile app — appointment booking and health tracking.',             accent:'#ff2d78', status:'Done' },
  { id:44, title:'Food Delivery UI Kit',       cat:'UI/UX',      tags:['Figma','Component Library','Variants'],        year:'2024', desc:'50+ screens UI kit — home, cart, order tracking.',                                  accent:'#ff7d1a', status:'Done' },
  { id:45, title:'SaaS Onboarding Flow',       cat:'UI/UX',      tags:['Figma','Prototyping','Micro-interactions'],     year:'2024', desc:'Onboarding wizard with animated transitions and user delight.',                    accent:'#c026d3', status:'Done' },
  { id:46, title:'NFT Marketplace UI',         cat:'UI/UX',      tags:['Figma','Dark Mode','Glassmorphism'],            year:'2024', desc:'NFT trading platform — gallery, detail view, bidding flow.',                        accent:'#ffd60a', status:'Done' },
  { id:47, title:'Travel App Redesign',        cat:'UI/UX',      tags:['Figma','UX Research','Usability Testing'],      year:'2024', desc:'Complete redesign improving booking flow by 40%.',                                  accent:'#ff2d78', status:'Done' },
  { id:48, title:'Agency Website Design',      cat:'UI/UX',      tags:['Figma','Motion Design','Scroll Design'],        year:'2024', desc:'Premium agency design — parallax hero, case studies, team.',                       accent:'#c026d3', status:'Done' },
  { id:49, title:'Portfolio Design System',    cat:'UI/UX',      tags:['Figma','Design Tokens','Components'],           year:'2024', desc:'Personal brand system — typography, colors, icons, components.',                   accent:'#ffd60a', status:'Done' },
  { id:50, title:'Mobile Banking App Design',  cat:'UI/UX',      tags:['Figma','iOS Guidelines','Material Design'],     year:'2024', desc:'Complete banking UI — transfers, bills, card management.',                          accent:'#ff2d78', status:'Done' },
  { id:51, title:'React Native Todo App',      cat:'Mobile',     tags:['React Native','AsyncStorage','Expo'],           year:'2024', desc:'Cross-platform todo with categories, reminders and offline sync.',                  accent:'#ff7d1a', status:'Live' },
  { id:52, title:'Fitness Tracker App',        cat:'Mobile',     tags:['React Native','Redux','HealthKit','Expo'],      year:'2024', desc:'Workout logger — custom routines, progress charts, streak tracking.',              accent:'#ff2d78', status:'Beta' },
  { id:53, title:'Recipe App',                 cat:'Mobile',     tags:['React Native','Spoonacular API','Expo'],        year:'2024', desc:'Discover, save and cook recipes with ingredient search.',                           accent:'#ffd60a', status:'Live' },
  { id:54, title:'Meditation App',             cat:'Mobile',     tags:['React Native','Animated API','Expo Audio'],     year:'2024', desc:'Guided meditation — breathing animations, timers, ambient sounds.',                accent:'#c026d3', status:'Beta' },
  { id:55, title:'News Reader App',            cat:'Mobile',     tags:['React Native','News API','Redux','Expo'],       year:'2023', desc:'Personalized news feed — categories, bookmarks, offline reading.',                 accent:'#ff2d78', status:'Live' },
  { id:56, title:'E-Commerce Mobile App',      cat:'Mobile',     tags:['React Native','Redux','Stripe','Expo'],         year:'2024', desc:'Full shopping app — gallery, cart, checkout, order history.',                      accent:'#ff7d1a', status:'Live' },
  { id:57, title:'Chat Mobile App',            cat:'Mobile',     tags:['React Native','Firebase','Socket.io'],          year:'2024', desc:'WhatsApp-like chat — real-time messages, media sharing, status.',                  accent:'#ffd60a', status:'Live' },
  { id:58, title:'Expense Manager App',        cat:'Mobile',     tags:['React Native','SQLite','Victory Charts'],       year:'2024', desc:'Track income and expenses with monthly summaries and graphs.',                     accent:'#ff2d78', status:'Live' },
  { id:59, title:'Quiz Game App',              cat:'Mobile',     tags:['React Native','Trivia API','Expo'],             year:'2023', desc:'Trivia quiz with timer, leaderboard and streak tracking.',                          accent:'#c026d3', status:'Live' },
  { id:60, title:'Weather Mobile App',         cat:'Mobile',     tags:['React Native','OpenWeather','Expo'],            year:'2023', desc:'Hourly forecast, wind, humidity and UV index.',                                    accent:'#ff7d1a', status:'Live' },
  { id:61, title:'AI Image Generator',         cat:'AI/ML',      tags:['React','OpenAI DALL-E','Node.js','Cloudinary'], year:'2024', desc:'DALL-E powered generator with prompt engineering and gallery.',                    accent:'#ff2d78', status:'Live' },
  { id:62, title:'ChatGPT Clone',              cat:'AI/ML',      tags:['Next.js','OpenAI API','MongoDB','Tailwind'],    year:'2024', desc:'ChatGPT-like interface with history, models and streaming.',                       accent:'#ffd60a', status:'Live' },
  { id:63, title:'AI Code Reviewer',           cat:'AI/ML',      tags:['React','OpenAI','Monaco Editor','Node.js'],    year:'2024', desc:'Paste code, get AI review with bugs, suggestions and fixes.',                     accent:'#c026d3', status:'Beta' },
  { id:64, title:'Resume Analyzer AI',         cat:'AI/ML',      tags:['Python','OpenAI','FastAPI','React'],            year:'2024', desc:'Upload resume, get AI score, missing skills and suggestions.',                     accent:'#ff2d78', status:'Beta' },
  { id:65, title:'AI Writing Assistant',       cat:'AI/ML',      tags:['Next.js','OpenAI','Vercel AI SDK'],             year:'2024', desc:'Blog and email writer powered by GPT-4 with tone controls.',                       accent:'#ff7d1a', status:'Live' },
  { id:66, title:'Sentiment Analyzer',         cat:'AI/ML',      tags:['Python','NLTK','Flask','React'],                year:'2024', desc:'Analyze reviews and social media for positive/negative sentiment.',                accent:'#ffd60a', status:'Live' },
  { id:67, title:'AI Chatbot Widget',          cat:'AI/ML',      tags:['React','OpenAI','Framer Motion'],               year:'2024', desc:'Embeddable AI chatbot with custom persona and knowledge base.',                    accent:'#ff2d78', status:'Live' },
  { id:68, title:'Object Detection App',       cat:'AI/ML',      tags:['React','TensorFlow.js','COCO-SSD','Canvas'],   year:'2024', desc:'Real-time browser object detection using webcam and TensorFlow.js.',               accent:'#c026d3', status:'Beta' },
  { id:69, title:'Text Summarizer',            cat:'AI/ML',      tags:['Python','HuggingFace','FastAPI','React'],       year:'2024', desc:'Summarize long articles and PDFs with AI models.',                                  accent:'#ffd60a', status:'Live' },
  { id:70, title:'AI Interview Prep',          cat:'AI/ML',      tags:['Next.js','OpenAI','MongoDB'],                   year:'2024', desc:'Practice interviews with AI feedback and scoring.',                                accent:'#ff2d78', status:'Beta' },
  { id:71, title:'Amazon Clone',              cat:'Clone',       tags:['React','Firebase','Stripe','CSS'],              year:'2023', desc:'Full Amazon clone — products, cart, checkout, order history.',                     accent:'#ff7d1a', status:'Live' },
  { id:72, title:'Netflix Clone',             cat:'Clone',       tags:['React','Firebase','TMDB API','CSS'],            year:'2023', desc:'Netflix UI with movie rows, trailers and auth.',                                    accent:'#ff2d78', status:'Live' },
  { id:73, title:'Airbnb Clone',              cat:'Clone',       tags:['Next.js','MongoDB','Mapbox','Tailwind'],        year:'2024', desc:'Property rental with listings, map, search filters and booking.',                  accent:'#ffd60a', status:'Live' },
  { id:74, title:'Uber Clone',                cat:'Clone',       tags:['React Native','Google Maps','Firebase'],        year:'2024', desc:'Ride booking with real-time map, driver matching and fare calc.',                  accent:'#c026d3', status:'Beta' },
  { id:75, title:'Swiggy Clone',              cat:'Clone',       tags:['React','Node.js','MongoDB','Tailwind'],         year:'2024', desc:'Food delivery with restaurants, cart, checkout and live orders.',                  accent:'#ff2d78', status:'Live' },
  { id:76, title:'LinkedIn Clone',            cat:'Clone',       tags:['React','Firebase','Redux','CSS'],               year:'2023', desc:'Professional network with posts, profiles, connections and feed.',                 accent:'#ff7d1a', status:'Live' },
  { id:77, title:'GitHub Clone UI',           cat:'Clone',       tags:['React','GitHub API','Tailwind'],                year:'2024', desc:'GitHub profile explorer with repos, contribution graph, stats.',                  accent:'#ffd60a', status:'Live' },
  { id:78, title:'Notion Clone',              cat:'Clone',       tags:['Next.js','Convex','Tailwind','Clerk'],          year:'2024', desc:'Block-based editor with nested pages, drag-and-drop, real-time sync.',             accent:'#ff2d78', status:'Live' },
  { id:79, title:'Instagram Clone',           cat:'Clone',       tags:['React','Firebase','Tailwind','Recoil'],         year:'2023', desc:'Posts, stories, likes, comments and DMs.',                                          accent:'#c026d3', status:'Live' },
  { id:80, title:'Discord Clone',             cat:'Clone',       tags:['Next.js','Socket.io','Prisma','Clerk'],         year:'2024', desc:'Server/channel app with voice, text and roles.',                                   accent:'#ff7d1a', status:'Live' },
  { id:81, title:'Trello Clone',              cat:'Clone',       tags:['React','DnD Kit','Tailwind','Firebase'],        year:'2024', desc:'Kanban board with drag-drop, checklists and team sharing.',                        accent:'#ffd60a', status:'Live' },
  { id:82, title:'WhatsApp Web Clone',        cat:'Clone',       tags:['React','Firebase','Socket.io','Tailwind'],      year:'2024', desc:'Web chat with real-time messages and read receipts.',                              accent:'#ff2d78', status:'Live' },
  { id:83, title:'Figma Clone',               cat:'Clone',       tags:['Next.js','Fabric.js','Liveblocks','Tailwind'],  year:'2024', desc:'Collaborative design tool with shapes, text and real-time cursors.',              accent:'#c026d3', status:'Beta' },
  { id:84, title:'Slack Clone',               cat:'Clone',       tags:['Next.js','Convex','Clerk','Tailwind'],          year:'2024', desc:'Workspace messaging with channels, threads, DMs and reactions.',                   accent:'#ff7d1a', status:'Live' },
  { id:85, title:'Medium Clone',              cat:'Clone',       tags:['React','Node.js','MongoDB','Quill.js'],         year:'2023', desc:'Blogging platform with rich editor, claps and bookmarks.',                          accent:'#ffd60a', status:'Live' },
  { id:86, title:'Zoom Clone',                cat:'Clone',       tags:['Next.js','Stream','Clerk','Tailwind'],          year:'2024', desc:'Video conferencing with rooms, screen share and recording.',                        accent:'#ff2d78', status:'Beta' },
  { id:87, title:'Reddit Clone',              cat:'Clone',       tags:['Next.js','Supabase','Tailwind','Prisma'],       year:'2024', desc:'Community platform with subreddits, upvotes and comments.',                       accent:'#c026d3', status:'Live' },
  { id:88, title:'Shopify Store Clone',       cat:'Clone',       tags:['Next.js','Shopify API','Tailwind','Stripe'],    year:'2024', desc:'Custom storefront with Shopify backend, cart and checkout.',                       accent:'#ff7d1a', status:'Live' },
  { id:89, title:'Dribbble Clone',            cat:'Clone',       tags:['React','Supabase','Tailwind','Framer Motion'],  year:'2024', desc:'Design portfolio with shots gallery, likes and comments.',                          accent:'#ffd60a', status:'Live' },
  { id:90, title:'Canva Clone',               cat:'Clone',       tags:['React','Fabric.js','Cloudinary','Tailwind'],    year:'2024', desc:'Graphic design tool with templates, text, shapes and export.',                     accent:'#ff2d78', status:'Beta' },
  { id:91, title:'Coursera Clone',            cat:'Clone',       tags:['MERN','Stripe','Redux','Cloudinary'],           year:'2024', desc:'Course marketplace with video player, quizzes and certificates.',                  accent:'#c026d3', status:'Live' },
  { id:92, title:'Zomato Clone',              cat:'Clone',       tags:['React','Node.js','MongoDB','Google Maps'],      year:'2024', desc:'Restaurant discovery and food delivery with reviews.',                              accent:'#ff7d1a', status:'Live' },
  { id:93, title:'Paytm Clone',               cat:'Clone',       tags:['MERN','JWT','Tailwind','Zod'],                  year:'2024', desc:'Digital wallet — money transfer, transactions and balance.',                        accent:'#ffd60a', status:'Live' },
  { id:94, title:'BookMyShow Clone',          cat:'Clone',       tags:['React','Node.js','MongoDB','Stripe'],           year:'2024', desc:'Movie ticket booking with seat selection and payment.',                             accent:'#ff2d78', status:'Live' },
  { id:95, title:'OLX Clone',                 cat:'Clone',       tags:['MERN','Cloudinary','Firebase','Tailwind'],      year:'2024', desc:'C2C marketplace with image upload, location filter and chat.',                    accent:'#c026d3', status:'Live' },
  { id:96, title:'Zepto Clone',               cat:'Clone',       tags:['React','Node.js','MongoDB','Redux'],            year:'2024', desc:'Quick commerce grocery delivery with 10-min slot UI.',                              accent:'#ff7d1a', status:'Live' },
  { id:97, title:'PhonePe Clone',             cat:'Clone',       tags:['React Native','Node.js','MongoDB','Razorpay'], year:'2024', desc:'Mobile payment app — UPI, bill pay and history.',                                  accent:'#ffd60a', status:'Beta' },
  { id:98, title:'Udemy Clone',               cat:'Clone',       tags:['MERN','Stripe','Cloudinary','Redux'],           year:'2024', desc:'Course marketplace with instructor dashboard and video player.',                    accent:'#ff2d78', status:'Live' },
  { id:99, title:'MakeMyTrip Clone',          cat:'Clone',       tags:['Next.js','MongoDB','Stripe','Mapbox'],          year:'2024', desc:'Flights, hotels, holiday packages and EMI booking.',                               accent:'#c026d3', status:'Live' },
  { id:100,title:'Behance Clone',             cat:'Clone',       tags:['Next.js','MongoDB','Cloudinary','Tailwind'],    year:'2024', desc:'Creative portfolio showcase with projects, appreciations and profiles.',            accent:'#ff7d1a', status:'Live' },
]

function Card({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div ref={ref} layout
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: Math.min(i * 0.025, 0.25) }}
      className="group">
      <div className="glass rounded-2xl p-4 sm:p-5 h-full relative overflow-hidden"
        style={{ transition: 'border-color 0.3s, transform 0.3s', borderColor: 'rgba(255,45,120,0.08)' }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${p.accent}30`; el.style.transform = 'translateY(-4px)' }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(255,45,120,0.08)'; el.style.transform = 'translateY(0)' }}>
        {/* glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none" style={{ transition: 'opacity 0.4s', background: `radial-gradient(280px at 50% 0%, ${p.accent}09, transparent 70%)` }} />
        {/* corner */}
        <div className="absolute top-0 right-0 w-12 h-12 opacity-10 group-hover:opacity-25 pointer-events-none" style={{ transition: 'opacity 0.3s', background: `conic-gradient(from 225deg, ${p.accent}, transparent 40%)`, borderRadius: '0 1rem 0 100%' }} />
        {/* num */}
        <span className="absolute top-3 left-4 font-mono text-[9px] opacity-20" style={{ color: p.accent }}>{String(p.id).padStart(2,'0')}</span>

        <div className="flex items-center justify-between mt-4 mb-2">
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em]" style={{ color: p.accent }}>{p.cat}</span>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[8px] px-1.5 py-0.5 rounded-full border" style={{ color: p.accent, borderColor: `${p.accent}35`, background: `${p.accent}08` }}>{p.status}</span>
            <span className="font-mono text-[9px]" style={{ color: 'var(--muted)' }}>{p.year}</span>
          </div>
        </div>

        <h3 className="text-base sm:text-lg leading-tight mb-2 font-medium" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', transition: 'color 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as any).style.color = p.accent }}
          onMouseLeave={e => { (e.currentTarget as any).style.color = 'var(--text-primary)' }}>
          {p.title}
        </h3>
        <p className="text-[11px] sm:text-xs leading-relaxed mb-3 font-light line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {p.tags.slice(0, 3).map(t => (
            <span key={t} className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--muted)', border: '1px solid rgba(255,255,255,0.05)' }}>{t}</span>
          ))}
          {p.tags.length > 3 && <span className="font-mono text-[8px] px-1.5 py-0.5 rounded" style={{ color: 'var(--muted)' }}>+{p.tags.length - 3}</span>}
        </div>

        <div className="flex items-center gap-1" style={{ transition: 'gap 0.2s' }}>
          <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: p.accent }}>View</span>
          <span className="text-xs group-hover:translate-x-1" style={{ color: p.accent, transition: 'transform 0.2s', display: 'inline-block' }}>→</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState('All')
  const [showAll, setShowAll] = useState(false)
  const INIT = 12

  const filtered = useMemo(() => active === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === active), [active])
  const visible = showAll ? filtered : filtered.slice(0, INIT)

  return (
    <section id="work" className="relative py-16 sm:py-28 px-4 sm:px-8 md:px-16" style={{ background: 'var(--bg)' }}>
      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--pink) 1px,transparent 1px),linear-gradient(90deg,var(--pink) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      {/* glow top right */}
      <div className="absolute top-20 right-0 w-80 h-80 rounded-full pointer-events-none opacity-[0.06]" style={{ background: 'var(--pink)', filter: 'blur(100px)' }} />

      <div ref={ref} className="max-w-7xl mx-auto mb-10 relative z-10">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="section-tag">Selected work</motion.div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
          <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.16,1,0.3,1], delay: 0.1 }}
            className="text-[clamp(2.8rem,8vw,6.5rem)] leading-none" style={{ fontFamily: 'var(--font-display)' }}>
            <span style={{ color: 'var(--text-primary)' }}>100+ </span>
            <span className="grad-text">PROJECTS</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.35 }}
            className="text-xs sm:text-sm font-light max-w-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Full stack, frontend, mobile, AI/ML, UI/UX and popular app clones — all built hands-on.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.28 }}
          className="flex flex-wrap gap-2">
          {CATS.map(c => (
            <button key={c} onClick={() => { setActive(c); setShowAll(false) }}
              className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all duration-250"
              style={{
                borderColor: active === c ? 'var(--pink)' : 'rgba(255,45,120,0.18)',
                color: active === c ? 'var(--bg)' : 'var(--text-secondary)',
                background: active === c ? 'var(--pink)' : 'transparent',
              }}>
              {c}{c !== 'All' && <span className="opacity-50 ml-1">({PROJECTS.filter(p => p.cat === c).length})</span>}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => <Card key={p.id} p={p} i={i} />)}
          </AnimatePresence>
        </motion.div>

        {filtered.length > INIT && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap justify-center gap-3 mt-10">
            <button onClick={() => setShowAll(!showAll)}
              className="font-mono text-[10px] uppercase tracking-[0.25em] px-8 py-3.5 rounded-full transition-all duration-300"
              style={{ background: showAll ? 'transparent' : 'var(--grad-1)', color: showAll ? 'var(--pink)' : '#fff', border: '1px solid var(--pink)' }}>
              {showAll ? 'Show Less ↑' : `Show All ${filtered.length} →`}
            </button>
            <a href="https://github.com/rohitkashyap7398" target="_blank" rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.25em] px-8 py-3.5 rounded-full transition-colors duration-300"
              style={{ border: '1px solid rgba(255,45,120,0.25)', color: 'var(--text-secondary)' }}
              onMouseEnter={e => { (e.currentTarget as any).style.color = 'var(--pink)'; (e.currentTarget as any).style.borderColor = 'var(--pink)' }}
              onMouseLeave={e => { (e.currentTarget as any).style.color = 'var(--text-secondary)'; (e.currentTarget as any).style.borderColor = 'rgba(255,45,120,0.25)' }}>
              GitHub →
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
