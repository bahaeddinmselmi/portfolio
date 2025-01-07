import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Github, Facebook, Mail, Brain, Code2, Shield, Languages, Moon, Sun } from 'lucide-react';
import emailjs from '@emailjs/browser';
import myPhoto from './img/myphoto.jpg';
import crimsonShop from './img/crimsonshop.jpg';
import ChatBot from './components/ChatBot';
import SecurityScanner from './components/SecurityScanner';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const { scrollYProgress } = useScroll();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  useEffect(() => {
    emailjs.init('oIZvTyxrOuXHGa69M');
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.sendForm(
        'service_l6tgm6r',
        'template_5fa0a2v',
        formRef.current,
        'oIZvTyxrOuXHGa69M'
      );
      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 w-full z-40 bg-white bg-opacity-90 backdrop-blur-sm dark:bg-gray-800"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </motion.button>

          <div className="flex space-x-6">
            {['home', 'skills', 'projects', 'contact'].map((section) => (
              <motion.a
                key={section}
                href={`#${section}`}
                className="capitalize hover:text-indigo-600 dark:hover:text-indigo-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {section}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      <header id="home" className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center"
        >
          <motion.div
            className="mb-8 flex justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src={myPhoto} 
              alt="Baha Eddin Mselmi" 
              className="w-48 h-48 rounded-full object-cover border-4 border-indigo-600 shadow-xl"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            Baha Eddin Mselmi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            Cybersecurity Enthusiast | AI Developer | Tech Innovator
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center space-x-4"
          >
            {[
              { href: "https://github.com", icon: <Github className="w-6 h-6" /> },
              { href: "https://facebook.com", icon: <Facebook className="w-6 h-6" /> },
              { href: "#contact", icon: <Mail className="w-6 h-6" /> }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="p-2 hover:text-indigo-600"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </header>

      <main>
        <section id="skills" className="py-20 bg-white dark:bg-gray-800">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="container mx-auto px-4"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold text-center mb-12"
            >
              Skills & Expertise
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Shield className="w-6 h-6" />, title: "Cybersecurity", description: "Bug bounty hunter" },
                { icon: <Brain className="w-6 h-6" />, title: "AI Development", description: "PyTorch specialist" },
                { icon: <Code2 className="w-6 h-6" />, title: "Web Development", description: "Full-stack developer" },
                { icon: <Languages className="w-6 h-6" />, title: "Languages", description: "Multilingual" }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="text-indigo-600 dark:text-indigo-400 mb-4"
                  >
                    {skill.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <motion.section
          id="projects"
          className={`min-h-screen p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 className="text-4xl font-bold mb-8 text-center" variants={itemVariants}>
            Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              variants={itemVariants}
            >
              <img src={crimsonShop} alt="CrimsonShop Project" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">CrimsonShop</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  An e-commerce platform built with React and Node.js, featuring user authentication, product management, and secure payment processing.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/nanashi0x1/CrimsonShop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                  >
                    <Github className="w-5 h-5 mr-2" />
                    View Code
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              variants={itemVariants}
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Web Security Scanner</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  A powerful web security tool that helps identify vulnerabilities, analyze server configurations, and discover potential security risks in web applications.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/nanashi0x1/portfolio/blob/main/src/components/SecurityScanner.tsx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                  >
                    <Github className="w-5 h-5 mr-2" />
                    View Code
                  </a>
                </div>
              </div>
              <div className="px-6 pb-6">
                <SecurityScanner />
              </div>
            </motion.div>
          </div>
        </motion.section>

        <section id="contact" className="py-20 bg-white dark:bg-gray-800">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="container mx-auto px-4"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold text-center mb-12"
            >
              Get In Touch
            </motion.h2>
            <div className="max-w-lg mx-auto">
              <motion.div
                variants={itemVariants}
                className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-lg"
              >
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <motion.div variants={itemVariants}>
                    <label htmlFor="from_name" className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label htmlFor="from_email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      id="from_email"
                      name="from_email"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    ></textarea>
                  </motion.div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full py-3 px-6 rounded-lg text-white font-medium ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                  {submitStatus === 'success' && (
                    <p className="text-green-600 dark:text-green-400 text-center mt-2">Message sent successfully!</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-600 dark:text-red-400 text-center mt-2">Failed to send message. Please try again.</p>
                  )}
                </form>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
      <ChatBot darkMode={darkMode} />
    </div>
  );
}

export default App;