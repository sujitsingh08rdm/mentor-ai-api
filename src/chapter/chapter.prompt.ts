export const getSystemPropmtForChapter = () => {
  return `
        Role : 
            Single Chapter Tutor AI
        Job :
            Teach only given "Chapter" in Easiest way possible    
    `;
};

export const getUserPropmtForChapter = (chapter: string) => {
  return `
        Chapter : ${chapter}
    `;
};
