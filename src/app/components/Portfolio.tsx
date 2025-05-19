"use client";

import React, { useState, useEffect } from 'react';
import { Monitor, User, Code, Briefcase, Mail, FileText, Github, Linkedin, Twitter, Gamepad2 } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [typing, setTyping] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const textArray = [
    "Full Stack Developer",
    "Web Designer",
    "Problem Solver",
    "Code Enthusiast"
  ];
  
  useEffect(() => {
    if (isTyping) {
      if (typing.length < textArray[currentTextIndex].length) {
        const timeout = setTimeout(() => {
          setTyping(textArray[currentTextIndex].substring(0, typing.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (typing.length > 0) {
        const timeout = setTimeout(() => {
          setTyping(typing.substring(0, typing.length - 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(true);
        setCurrentTextIndex((currentTextIndex + 1) % textArray.length);
      }
    }
  }, [typing, isTyping, currentTextIndex]);

  // 8-bit pixel border style
  const pixelBorder: React.CSSProperties = {
    position: 'relative',
    border: '4px solid #000',
    boxShadow: 
      `inset -4px -4px 0 0 #555,
       inset 4px 4px 0 0 #fff`,
    backgroundColor: '#f8f8f8',
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="text-center py-8">
            <div className="mb-6">
              <div className="w-80 h-90 mx-auto relative" style={pixelBorder}>
                <div className="absolute inset-0 flex items-center justify-center">
                <img 
                    src="/pixel-art-old-computer.avif" 
                    alt="Old Computer Pixel Art" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">Kendra Dias</h1>
            <div className="h-6 mb-6">
              <span className="text-xl text-blue-600">{typing}<span className="animate-pulse">|</span></span>
            </div>
            <p className="max-w-lg mx-auto mb-6">
              A passionate full-stack developer specializing in creating modern, 
              efficient web applications with clean code and engaging user experiences.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => setActiveSection('projects')}
                className="px-4 py-2 bg-red-500 text-purple hover:bg-red-600 transition duration-200"
                style={pixelBorder}
              >
                View Projects
              </button>
              <button 
                onClick={() => setActiveSection('contact')}
                className="px-4 py-2 bg-blue-500 text-purple hover:bg-blue-600 transition duration-200"
                style={pixelBorder}
              >
                Contact Me
              </button>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
            <div className="mb-8" style={pixelBorder}>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-1 font-bold">Frontend</p>
                    <div className="mb-3">
                      <div className="w-full h-4 bg-gray-200 mb-1">
                        <div className="h-full bg-green-500" style={{ width: '95%' }}></div>
                      </div>
                      <div className="text-sm">React, Vue, Angular, HTML/CSS</div>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 font-bold">Backend</p>
                    <div className="mb-3">
                      <div className="w-full h-4 bg-gray-200 mb-1">
                        <div className="h-full bg-blue-500" style={{ width: '85%' }}></div>
                      </div>
                      <div className="text-sm">Node.js, Express, Python, Java, Kotlin, C# ASP.NET Core</div>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 font-bold">Database</p>
                    <div className="mb-3">
                      <div className="w-full h-4 bg-gray-200 mb-1">
                        <div className="h-full bg-yellow-500" style={{ width: '90%' }}></div>
                      </div>
                      <div className="text-sm">MongoDB, PostgreSQL, MySQL, DynamoDB</div>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 font-bold">DevOps</p>
                    <div className="mb-3">
                      <div className="w-full h-4 bg-gray-200 mb-1">
                        <div className="h-full bg-purple-500" style={{ width: '75%' }}></div>
                      </div>
                      <div className="text-sm">Docker, AWS, CI/CD, Git</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={pixelBorder}>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Experience</h3>
                <div className="mb-6">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold">Backend Developer</h4>
                    <span>April 2025 - May 2025</span>
                  </div>
                  <p className="text-gray-700">Quality Horticulture</p>
                  <p className="mt-2">Led development of data-transfer application from Docusign API to Business One SAP improving performance by 80% and implementing a modern frontend UI.</p>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold">Full Stack Developer</h4>
                    <span>June 2024 - Present</span>
                  </div>
                  <p className="text-gray-700">Independent Contractor</p>
                  <p className="mt-2">Developed and maintained E-Commerce websites, implemented responsive designs, integrated third-party APIs, and data persistance using Relational and NoSql databases.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project 1 */}
              <div style={pixelBorder}>
                <div className="p-4">
                  <div className="h-40 mb-4 overflow-hidden" style={{...pixelBorder, border: '2px solid #000'}}>
                    <img 
                      src="/squishmart.png" 
                      alt="Squishmart E-Commerce Platform Screenshot" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Squishmallow E-Commerce Platform</h3>
                  <p className="mb-3">A full-featured online store with payment processing, inventory management, user accounts, and permission based access using roles (admin/manager/customer).</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm">C# ASP.NET Core & Identity Frameworks</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm">Javascript</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm">CSS/HTML</span>
                    <span className="px-2 py-1 bg-yellow-100 text-purple-800 text-sm">Bootstrap</span>
                  </div>
                  <div className="flex space-x-3">
                    <a href="#" className="text-blue-600 hover:underline flex items-center">
                      <Code size={16} className="mr-1" /> View Demo
                    </a>
                    <a href="https://github.com/ryan-m-burns/SquishMart.git" className="text-blue-600 hover:underline flex items-center">
                      <Github size={16} className="mr-1" /> GitHub
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Project 2 */}
              <div style={pixelBorder}>
                <div className="p-4">
                  <div className="h-40 bg-gray-300 mb-4 flex items-center justify-center">
                  <img 
                      src="/jobtracker.png" 
                      alt="Job Tracker Application Screenshot" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Job Tracker App</h3>
                  <p className="mb-3">A collaborative job applicaton management tool with data persistance, the ability to update application status, wishlist companies for future opportunities and add personal notes to each entry.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm">Node.js</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm">Express</span>
                    <span className="px-2 py-1 bg-blue-100 text-purple-800 text-sm">React</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-sm">MongoDB</span>
                  </div>
                  <div className="flex space-x-3">
                    <a href="https://youtu.be/9ZNCpbRQSDw" className="text-blue-600 hover:underline flex items-center">
                      <Code size={16} className="mr-1" /> View Demo
                    </a>
                    <a href="https://github.com/kendradias/job-tracker.git" className="text-blue-600 hover:underline flex items-center">
                      <Github size={16} className="mr-1" /> GitHub
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Project 3 */}
              <div style={pixelBorder}>
                <div className="p-4">
                <div className="h-40 mb-4 overflow-hidden" style={{...pixelBorder, border: '2px solid #000'}}>
                  <img 
                    src="/hungryhero.png" 
                    alt="Hungry Hero Project Screenshot" 
                    className="w-full h-full object-cover"
                  />
                </div>
                  <h3 className="text-xl font-bold mb-2">Hungry Hero - A PacMan Style Game</h3>
                  <p className="mb-3">Pac-Man inspired maze chase game where a the player navigates through blue boundaries using WASD controls to move through the maze, earning points by collecting pellets while trying to avoid being caught by the enemies that use intelligent pathfinding to hunt them down.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm">Javascript</span>
                    <span className="px-2 py-1 bg-blue-100 text-yellow-800 text-sm">jQuery</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-sm">CSS</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm">HTML5 Canvas</span>
                  </div>
                  <div className="flex space-x-3">
                    <a href="https://kendradias.github.io/JSGame/" className="text-blue-600 hover:underline flex items-center">
                    <Gamepad2 size={16} className="mr-1" /> PLAY NOW
                    </a>
                    <a href="https://github.com/kendradias/JSGame.git" className="text-blue-600 hover:underline flex items-center">
                      <Github size={16} className="mr-1" /> GitHub
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Project 4 */}
              <div style={pixelBorder}>
                <div className="p-4">
                  <div className="h-40 mb-4 overflow-hidden" style={{...pixelBorder, border: '2px solid #000'}}>
                    <img 
                      src="/financetracker.png" 
                      alt="Finance Tracker Screenshot" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Budget Tracker</h3>
                  <p className="mb-3">A personal finance application with expense categorization and visual reports.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm">Kotlin</span>
                    <span className="px-2 py-1 bg-blue-100 text-purple-800 text-sm">JetPack Compose</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm">Canvas API</span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-sm">Room Database</span>
                  </div>
                  <div className="flex space-x-3">
                    <a href="https://youtube.com/shorts/PJHojFbDEgU" className="text-blue-600 hover:underline flex items-center">
                      <Code size={16} className="mr-1" /> View Demo
                    </a>
                    {/* <a href="#" className="text-blue-600 hover:underline flex items-center">
                      <Github size={16} className="mr-1" /> GitHub
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        case 'contact':
          return (
            <div className="p-6 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Contact Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4" style={pixelBorder}>
                  <Mail size={32} className="mx-auto mb-3 text-blue-600" />
                  <h3 className="font-bold mb-2">Email</h3>
                  <a href="mailto:kendra.dias@hotmail.com" className="text-blue-600 hover:underline">
                    kendra.dias@hotmail.com
                  </a>
                </div>
                <div className="text-center p-4" style={pixelBorder}>
                  <Github size={32} className="mx-auto mb-3 text-gray-800" />
                  <h3 className="font-bold mb-2">GitHub</h3>
                  <a href="https://github.com/kendradias" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    github.com/kendradias
                  </a>
                </div>
                <div className="text-center p-4" style={pixelBorder}>
                  <Linkedin size={32} className="mx-auto mb-3 text-blue-800" />
                  <h3 className="font-bold mb-2">LinkedIn</h3>
                  <a href="https://linkedin.com/in/kendra-dias-a284b3126/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    linkedin.com/in/kendra-dias-a284b3126/
                  </a>
                </div>
              </div>
                
              <div style={pixelBorder}>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Send Me a Message</h3>
                  
                  {submitted ? (
                    <div className="text-green-600 p-4 text-center">
                      <p className="mb-2 font-bold">Message Sent!</p>
                      <p>Thanks for reaching out. I'll get back to you soon.</p>
                      <button 
                        onClick={() => setSubmitted(false)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white"
                        style={pixelBorder}
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form 
                      action="https://formspree.io/f/YOUR_FORMSPREE_ID" 
                      method="POST"
                      onSubmit={(e) => {
                        // This will show success message after form submits
                        setTimeout(() => setSubmitted(true), 1000);
                      }}
                    >
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">Name</label>
                        <input 
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full p-2 border border-gray-300"
                          style={pixelBorder}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">Email</label>
                        <input 
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-2 border border-gray-300"
                          style={pixelBorder}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">Message</label>
                        <textarea 
                          name="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full p-2 border border-gray-300 h-32"
                          style={pixelBorder}
                          required
                        ></textarea>
                      </div>
                      <button 
                        type="submit"
                        className="px-6 py-3 bg-green-500 text-black hover:bg-green-600 transition duration-200 font-bold"
                        style={pixelBorder}
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          );
      case 'resume':
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Resume</h2>
            <div className="mb-6 flex justify-center">
              <a 
                href="#" 
                className="px-4 py-2 bg-blue-500 text-white flex items-center"
                style={pixelBorder}
              >
                <FileText size={18} className="mr-2" /> Download Full Resume
              </a>
            </div>
            
            <div className="mb-8" style={pixelBorder}>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Education</h3>
                <div className="mb-6">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold">Software Systems Developer</h4>
                    <span>2024-2025</span>
                  </div>
                  <p>BCIT (British Colombia Institute of Technology)</p>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold">Music Technology</h4>
                    <span>2015-2016</span>
                  </div>
                  <p>Douglas College</p>
                </div>
              </div>
            </div>
            
            <div style={pixelBorder}>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Work Experience</h3>
                <div className="mb-6">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold">Senior Web Developer</h4>
                    <span>2022 - Present</span>
                  </div>
                  <p className="text-gray-700 mb-2">Company Name</p>
                  <ul className="list-disc pl-5">
                    <li>Led development team of 5 engineers</li>
                    <li>Implemented CI/CD pipeline that reduced deployment time by 60%</li>
                    <li>Redesigned architecture to improve application performance</li>
                    <li>Mentored junior developers and conducted code reviews</li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold">Full Stack Developer</h4>
                    <span>2019 - 2022</span>
                  </div>
                  <p className="text-gray-700 mb-2">Previous Company</p>
                  <ul className="list-disc pl-5">
                    <li>Developed responsive web applications for clients</li>
                    <li>Managed database architecture and optimization</li>
                    <li>Implemented RESTful APIs for frontend consumption</li>
                    <li>Collaborated with design team to implement UI/UX improvements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-mono">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold mb-4 md:mb-0 flex items-center">
            <span className="text-purple-400 mr-2">&lt; /&gt;</span> 
            <span>KENDRADEV.COM</span>
          </div>
          <nav>
            <ul className="flex flex-wrap justify-center gap-2 md:gap-4">
              <li>
                <button 
                  onClick={() => setActiveSection('home')}
                  className={`px-3 py-1 ${activeSection === 'home' ? 'bg-white text-black' : ''}`}
                >
                  HOME
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection('about')}
                  className={`px-3 py-1 ${activeSection === 'about' ? 'bg-white text-black' : ''}`}
                >
                  ABOUT
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection('projects')}
                  className={`px-3 py-1 ${activeSection === 'projects' ? 'bg-white text-black' : ''}`}
                >
                  PROJECTS
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection('contact')}
                  className={`px-3 py-1 ${activeSection === 'contact' ? 'bg-white text-black' : ''}`}
                >
                  CONTACT
                </button>
              </li>
              {/* <li>
                <button 
                  onClick={() => setActiveSection('resume')}
                  className={`px-3 py-1 ${activeSection === 'resume' ? 'bg-white text-black' : ''}`}
                >
                  RESUME
                </button>
              </li> */}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow py-8">
        {renderSection()}
      </main>
      
      {/* Footer with 8-bit styling */}
      <footer className="bg-black text-white p-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
            <a href="https://github.com/kendradias" className="hover:text-blue-400"><Github size={24} /></a>
            <a href="https://www.linkedin.com/in/kendra-dias-a284b3126/" className="hover:text-blue-400"><Linkedin size={24} /></a>
            <a href="https://x.com/kendradiasdev" className="hover:text-blue-400"><Twitter size={24} /></a>
          </div>
          <p>&copy; {new Date().getFullYear()} - Made with 8-bit love, Kendra</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;