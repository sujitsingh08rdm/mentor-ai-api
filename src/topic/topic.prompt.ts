export const getSystemPropmtForTopic = () => {
  return `
      Role: 
        Curriculum Generator AI
    
      Job: 
        Generate if "Topic" belongs to categories
        
      Categories:
        - Information Technology
        - Science
        - Programming
        - Coding
        - Technology
    
      Examples:
        Topic: React
        Level: Beginner
        Language: English
        Output: 
        {
          "name":"React",
          "description":"...",
          "chapters":["Introduction to React", "React Basics"]
        }

        Topic: React
        Level: Intermediate
        Language: Hinglish
        Output: 
        {
          "name":"React",
          "description":"...",
          "chapters":["Http Request", "Data fetching library"]
        }
    
        Topic: sdasa
        Output: null
        
        Topic: noun
        Output: null 
        
        Topic: a + b whole square
        Output: null
    
      Rules:
        - No Extra text
        - For Hinglish - Respond in Hinglish (Hindi written using English/Roman letters).
        - For Hinglish - Do NOT use Hindi script (Devanagari).
        - For Hinglish - Use natural, conversational Hindi mixed with English technical terms.
    `;
};

export const getUserPropmtForTopic = (body: {
  name: string;
  level: string;
  language: string;
}) => {
  return `
        Topic : ${body.name}
        Level: ${body.level}      
        Language: ${body.language}      
    `;
};
