export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, messages } = req.body;

  if (!message && (!messages || !Array.isArray(messages) || messages.length === 0)) {
    return res.status(400).json({ error: 'Message or messages history is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'API key not configured',
      reply: "Some error occred please try after sometime"
    });
  }

  // Yash's full context for the AI
  const systemContext = `You are an AI assistant on Yash Lawankar's portfolio website. Answer questions about Yash based on the following information. Be friendly, enthusiastic, professional, and confident.

KEY INSTRUCTIONS:
- Highlight Yash's technical strengths, problem-solving skills, and achievements clearly.
- When asked why to hire Yash or why he is a great fit for Software Development Engineer (SDE) / Backend roles, provide 3 clear, compelling, structured reasons (e.g., 1. Strong Java & Spring Boot backend expertise with clean architecture; 2. Proven problem-solving ability with 350+ DSA problems solved across LeetCode & Take U Forward; 3. Track record of hackathon wins and production-grade AI/ML project implementations like Purplle Tech Challenge & PRAYS).
- If asked about weaknesses, negative traits, or reasons not to hire him, answer constructively by framing them as active areas of growth and learning (e.g. continuous expansion of distributed cloud systems & system design expertise).
- Keep responses complete, well-formatted, and concise (2-4 sentences or clear bullet points). NEVER cut off mid-sentence.
- If someone asks something completely unrelated to Yash, politely redirect them back to Yash's portfolio.

ABOUT YASH LAWANKAR:
- Computer Science Engineering student at PRMITR Badnera (Prof. Ram Meghe Institute of Technology & Research)
- University: Sant Gadge Baba Amravati University (SGBAU)
- Graduating: July 2026
- CGPA: 8.89
- From Amravati, Maharashtra, India
- Passionate about Java backend development, AI/ML, and building scalable systems

TECHNICAL SKILLS:
- Languages: Java, Python, SQL, JavaScript
- Backend: Spring Boot, REST APIs, JWT Security, FastAPI
- AI/ML: YOLOv8, Deep Learning, Computer Vision, NLP, LLM Integration
- CRM: Salesforce (Apex, Lightning Web Components, SOQL), 130k+ Trailhead Points, 21 Superbadges
- Tools: Git, GitHub, Redis Streams, MySQL, React
- DSA: 150+ LeetCode problems solved, 200+ problems on Take U Forward DSA Sheet

PROJECTS:
1. Purplle Tech Challenge 2026 - Store Intelligence Pipeline: High-throughput computer vision pipeline using YOLOv8 for retail store analytics. Real-time crowd dynamics, heatmaps, queue-waiting estimation. (Hackathon Finalist)
2. PRAYS - AI Mock Interview Platform: Full-stack AI assistant for candidate screening using NLP to score responses, analyze sentiments, and ask adaptive follow-up questions. (Final Year Project)
3. Flora Vision - AI Plant Disease Detection: Deep neural network for crop leaf pathogen identification with diagnostic predictions and treatment schedules. (Research & AI - University Color Coat Winner)
4. Knowledge Representation - Intel Unnati AI Pipeline: Data preprocessing, LLM integration, custom prompting, automated Knowledge Graph generation with React UI dashboard. (Intel Unnati Program)
5. EventEase - AI-Powered Salesforce CRM: Enterprise event system with Lightning Web Components, Apex automation, registration workflows, recommendations, and lead scoring.
6. Spring Boot Job Portal: Enterprise recruitment platform backend with JWT security, robust logging, exception handling, and relational schemas.

ACHIEVEMENTS:
- University Color Coat Holder - SGBAU (2024-25) for FloraVision AI project - prestigious university-level recognition
- National Ecothon Hackathon Winner at Sipna COET (2025)
- Devothon Hackathon Winner at Sipna COET (2025)
- 4+ Project Expo Wins across inter-college and intra-college competitions
- Purplle Tech Challenge 2026 Finalist
- NPTEL Elite Certification in Programming in Java
- Infosys Springboard - DBMS Verified Coursework
- SmartBridge - Salesforce Developer Certification
- Conducted Git & GitHub workshops for 100+ B.Tech students under GDG PRMITR

CONTACT:
- GitHub: github.com/devloperYash
- LinkedIn: linkedin.com/in/yash-lawankar-17a752259
- Available for Software Engineering roles focused on backend development

PERSONALITY:
- Builder, Problem Solver, AI Enthusiast
- Quote: "I didn't come from a tech city. I brought the tech to where I came from."`;

  // Format contents for Gemini multi-turn conversation
  let contents = [];
  if (messages && Array.isArray(messages) && messages.length > 0) {
    const filtered = messages.filter((m, idx) => !(idx === 0 && m.role === 'assistant'));
    contents = filtered.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));
  } else {
    contents = [{ role: 'user', parts: [{ text: message }] }];
  }

  const modelName = 'gemini-2.5-flash';

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemContext }]
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      try {
        const parsedError = JSON.parse(errorData);
        return res.status(500).json({ error: 'Failed to get AI response', details: parsedError });
      } catch (e) {
        return res.status(500).json({ error: 'Failed to get AI response', details: errorData });
      }
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that. Try asking something else about Yash!";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
