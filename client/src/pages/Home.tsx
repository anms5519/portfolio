import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Certificates from "@/components/Certificates";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background text-foreground"
    >
      <ParticleBackground />
      <Navbar />

      <main className="pt-16">
        <Hero />
        <About />
        <Skills />
        <Certificates />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </motion.div>
  );
}