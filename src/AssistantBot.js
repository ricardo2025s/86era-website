import React, { useState } from "react";

const AssistantBot = () => {
  const [step, setStep] = useState(0);
  const [user, setUser] = useState({
    name: "",
    businessName: "",
    servicesNeeded: [],
    contact: "",
  });

  const [input, setInput] = useState("");
  const [chat, setChat] = useState([
    {
      from: "bot",
      text: "👋 Welcome to 86ERA — your partner in software, IT support, and digital marketing! I'm your smart assistant. Let's get started. What's your name?",
    },
  ]);

  const steps = ["name", "businessName", "servicesNeeded", "contact", "confirm"];

  const handleSend = () => {
    if (!input.trim()) return;

    const currentStep = steps[step];
    const updatedUser = { ...user };

    if (currentStep === "servicesNeeded") {
      updatedUser.servicesNeeded = input.split(",").map((s) => s.trim());
    } else if (currentStep !== "confirm") {
      updatedUser[currentStep] = input;
    }

    const newChat = [
      ...chat,
      { from: "user", text: input },
    ];

    let botResponse = "";

    switch (currentStep) {
      case "name":
        botResponse = `Nice to meet you, ${input}! What's the name of your business or organization?`;
        break;
      case "businessName":
        botResponse = `Great — what services are you looking for? (e.g., web development, IT support, marketing)`;
        break;
      case "servicesNeeded":
        botResponse = `Got it. How can we contact you? (email or phone number)`;
        break;
      case "contact":
        botResponse = `Thanks! Please confirm: your name is ${updatedUser.name}, your business is ${updatedUser.businessName}, you need ${updatedUser.servicesNeeded.join(", ")}, and we can contact you at ${updatedUser.contact}. Type "yes" to confirm.`;
        break;
      case "confirm":
        if (input.toLowerCase() === "yes") {
          botResponse = `✅ Awesome! We’ll follow up with you shortly. Thanks for choosing 86ERA!`;
        } else {
          botResponse = `No problem — you can restart or update your info anytime.`;
        }
        break;
      default:
        botResponse = "Let's get started!";
    }

    newChat.push({ from: "bot", text: botResponse });

    setChat(newChat);
    setUser(updatedUser);
    setInput("");
    if (step < steps.length - 1) setStep(step + 1);
  };

  return ( 
<>
<img src="/logo.png" alt="86ERA Logo" className="w-40 mx-auto mb-6 animate-pulse drop-shadow-xl" />

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-xl w-full p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">86ERA Assistant</h1>
        <div className="flex-1 overflow-y-auto space-y-2 max-h-[400px]">
          {chat.map((msg, index) => (
            <div
              key={index}>
              {msg.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

              className={`p-2 rounded-xl w-fit max-w-[90%] ${
                msg.from === "bot"
                  ? "bg-blue-100 text-black"
                  : "bg-black text-white self-end ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type here..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssistantBot;
