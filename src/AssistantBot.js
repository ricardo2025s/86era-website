
import React, { useState } from "react";

const AssistantBot = () => {
  const [step, setStep] = useState(0);
  const [user, setUser] = useState({
    name: "",
    businessName: "",
    servicesNeeded: [],
    contact: ""
  });
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([
    { from: "bot", text: "👋 Welcome to 86ERA — your partner in software, IT support, and digital marketing! I’m your smart assistant. Let’s get started. What’s your name?" }
  ]);

  const steps = ["name", "businessName", "servicesNeeded", "contact", "confirm"];

  const handleSend = () => {
    const currentStep = steps[step];
    const updatedChat = [...chat, { from: "user", text: input }];
    let nextStep = step + 1;

    if (currentStep === "name") {
      setUser({ ...user, name: input });
      updatedChat.push({ from: "bot", text: `Nice to meet you, ${input}! What’s the name of your business or organization?` });
    }

    if (currentStep === "businessName") {
      setUser({ ...user, name: user.name, businessName: input });
      updatedChat.push({
        from: "bot",
        text: "📦 What services are you interested in? (Reply with numbers, e.g., 1 and 3)\n1. IT Support\n2. Ad Creation & Marketing\n3. Software / Mobile App Development"
      });
    }

    if (currentStep === "servicesNeeded") {
      const choices = input.split(",").map((s) => s.trim());
      const mapped = choices.map((c) => {
        if (c === "1") return "IT Support";
        if (c === "2") return "Ad Creation & Marketing";
        if (c === "3") return "Software / Mobile App Development";
        return "Other";
      });
      setUser({ ...user, servicesNeeded: mapped });
      updatedChat.push({ from: "bot", text: "📧 What’s the best way for us to reach you? (Email or phone)" });
    }

    if (currentStep === "contact") {
      setUser({ ...user, contact: input });
      updatedChat.push({
        from: "bot",
        text: `✅ Thanks, ${user.name}!\nBusiness: ${user.businessName}\nServices: ${user.servicesNeeded.join(", ")}\nContact: ${input}\nWe’ll reach out to you shortly. 🚀`
      });
    }

    setChat(updatedChat);
    setInput("");
    if (nextStep < steps.length) setStep(nextStep);
  };  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-4 h-screen flex flex-col">
      <h1 className="text-xl font-bold mb-2">86ERA Assistant</h1>
      <div className="flex-1 overflow-y-auto space-y-2">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-xl w-fit max-w-[90%] ${msg.from === "bot" ? "bg-blue-100 text-black" : "bg-black text-white self-end"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type here..."
          className="flex-1 p-2 border rounded-xl"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AssistantBot;
