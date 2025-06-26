import React, { useState, useRef, useEffect  } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import "./index.css";

const AssistantBot = () => {
  const [step, setStep] = useState(0);
  const [user, setUser] = useState({
    name: "",
    businessName: "",
    servicesNeeded: [],
    contact: "",
  });

  const serviceOptions = [
    "Web Development",
    "IT Support",
    "Digital Marketing",
    "App Design",
    "Other"
  ];

  const [input, setInput] = useState("");

  const [chat, setChat] = useState([
    {
      from: "bot",
      text: "~< Welcome to 86ERA – your partner in Software, IT support, and Digital Marketing.",
    },
    {
      from: "bot",
      text: "👋 Hi! What’s your name? How can we help you today? Type your name below to get started.",
    },
  ]);
  
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);
  
  useEffect(() => {
    console.log("Saving to localStorage:", user);
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);
  
  const steps = ["name", "businessName", "servicesNeeded", "contact", "confirm"];

  const handleSend = () => {
    if (!input.trim()) return;
  
    const currentStep = steps[step];
    const updatedUser = { ...user };
    updatedUser[currentStep] = input;
  
    const newChat = [...chat, { from: "user", text: input }];
    setChat(newChat);
    setUser(updatedUser);
    setInput("");
    setIsTyping(true);
  
    let botResponse = ""; // ✅ define here before use
  // ✅ Check for intelligent keyword-based responses
const lowerInput = input.toLowerCase();
const smartResponses = {
  python: `🐍 **Python Overview**
Python is a high-level, interpreted programming language known for its readability and versatility.

**Use cases:**
- Web Development (Flask, Django)
- Data Analysis (Pandas, NumPy)
- Automation (scripts, bots)
- Machine Learning (TensorFlow, scikit-learn)

**Tip:** Try writing a simple script to automate a task on your computer!`,

  kali: `💻 **Kali Linux**
Kali Linux is a Debian-based distro packed with tools for penetration testing, digital forensics, and ethical hacking.

**Popular tools:**
- Nmap (network scanner)
- Metasploit (exploit framework)
- Hydra (brute-force attacks)
- Burp Suite (web vulnerabilities)

**Use Kali in a VM or live USB to stay secure.**`,

  metasploit: `🎯 **Metasploit Framework**
Metasploit helps ethical hackers exploit vulnerabilities to test system defenses.

**Common commands:**
- \`search <exploit>\`
- \`use exploit/path\`
- \`set payload <payload>\`
- \`exploit\`

**Warning:** Only use on systems you’re authorized to test!`,

  nmap: `📡 **Nmap (Network Mapper)**
Nmap is used to scan and map networks, ports, and services.

**Examples:**
- \`nmap -sV 192.168.1.1\` → version scan
- \`nmap -A scanme.nmap.org\` → aggressive scan

**Tip:** Use Nmap before any pentest to understand your target.`,
  
  wireshark: `📊 **Wireshark**
Wireshark captures and inspects live network packets to help analyze traffic and detect threats.

**Use cases:**
- Detect malicious traffic
- Troubleshoot connections
- Learn networking protocols

**Caution:** Capturing on networks without consent is illegal. Use it ethically.`,

  cybersecurity: `🛡️ **Cybersecurity 101**
Cybersecurity protects digital systems from threats like viruses, phishing, ransomware, and hackers.

**Core pillars:**
- 🔒 Confidentiality: Protecting data from unauthorized access
- 🧮 Integrity: Ensuring data is not tampered with
- 📶 Availability: Keeping systems up and running

**Best Practices:**
- Use strong passwords & 2FA
- Keep systems updated
- Never click unknown links or attachments`,
};


const matchKey = Object.keys(smartResponses).find((keyword) =>
  lowerInput.includes(keyword)
);

if (matchKey) {
  setChat([...newChat, { from: "bot", text: smartResponses[matchKey] }]);
  setIsTyping(false);
  return;
}


    switch (currentStep) {
      case "name":
        botResponse = `Hi ${input}, what’s your business name?`;
        break;
      case "businessName":
        botResponse = `What services do you need from 86ERA?`;
        break;
      case "servicesNeeded":
        botResponse = `How can we contact you (email or phone)?`;
        break;
      case "contact":
        botResponse = `Thanks, ${updatedUser.name}! We’ll reach out to you shortly.`;
        break;
      default:
        botResponse = `Thank you!`;
    }
  
    setTimeout(() => {
      setChat((prevChat) => [...prevChat, { from: "bot", text: botResponse }]);
      setIsTyping(false);
    }, 800);
  
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };
   
    

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white px-3">
      <img
        src="/logo.png"
        alt="86ERA Logo"
        className="mb-4 animate__animated animate__pulse animate__infinite w-25 drop-shadow"
      />
      <div className="bg-light text-dark shadow-lg rounded-4 p-4 w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center fw-bold mb-4">86ERA Assistant</h2>
        <div className="overflow-auto mb-3 px-2" style={{ maxHeight: "300px" }}>
        {chat.map((msg, index) => (
  <div
    key={index}
    className={`d-flex ${msg.from === "bot" ? "justify-content-start" : "justify-content-end"} mb-2`}
  >
    <div
      className={`alert ${
        msg.from === "bot" ? "alert-primary" : "alert-dark"
      } rounded-pill px-4 py-2 shadow-sm`}
      style={{ maxWidth: "75%", wordWrap: "break-word" }}
    >
      {msg.text.split("\n").map((line, i) => (
        <span key={i}>
          {line}
          <br />
        </span>
      ))}
    </div>
  </div>
))}


          
{isTyping && (
  <div className="alert alert-secondary fst-italic">
    Typing...
  </div>
)}
          
          <div ref={messagesEndRef} />

        </div>
        {steps[step] === "servicesNeeded" ? (
  <div className="d-flex flex-wrap gap-2 justify-content-center">
    {serviceOptions.map((service, index) => (
      <button
        key={index}
        className="btn btn-outline-primary"
        onClick={() => {
          setInput(service);
          handleSend();
        }}
      >
        {service}
      </button>
    ))}
  </div>
) : (
  <div className="input-group">
    <input
      type="text"
      className="form-control"
      placeholder="Type here..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSend()}
    />
    <button className="btn btn-primary fw-bold px-4 shadow-sm" onClick={handleSend}>
      Send
    </button>
  </div>
)}

      </div>
    </div>
  );
};

export default AssistantBot;
