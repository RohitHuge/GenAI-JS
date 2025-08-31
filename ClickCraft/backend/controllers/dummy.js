export const initialPromptMock = async (req, res) => {
    // Mock response for frontend debugging - no OpenAI tokens used
    const mockResponse = {
        finalResponse: {
            promptStructure: {
                analysis: {
                    missingBullets: ['Character/Item', 'Content type', 'Level/Map', 'Game branding', 'Tone'],
                    segment: "Gaming"
                },
                initialPrompt: "make thumbnail for the minecraft gameplay",
                isImageBase64: false,
                mode: "without_photo",
                questions: [
                    {
                        answer: "Creeper",
                        id: "q1",
                        options: ["Steve", "Creeper", "Diamond Sword", "Ender Dragon", "No Character/Item"],
                        q: "Which Minecraft character or item should be featured in the thumbnail?"
                    },
                    {
                        answer: "answer",
                        id: "q2",
                        options: ["Survival", "Creative", "Adventure", "Mini-game", "Challenge"],
                        q: "What type of Minecraft content is this gameplay thumbnail for?"
                    },
                    {
                        answer: "answer",
                        id: "q3",
                        options: ["Overworld", "Nether", "End", "Custom Map", "Any"],
                        q: "Which Minecraft level or map should be shown?"
                    },
                    {
                        answer: "answer",
                        id: "q4",
                        options: ["Minecraft Logo", "YouTube Logo", "No Branding", "Custom Branding"],
                        q: "What game branding should be included in the thumbnail?"
                    },
                    {
                        answer: "answer",
                        id: "q5",
                        options: ["Fun", "Epic", "Mysterious", "Competitive", "Relaxed"],
                        q: "What tone should the thumbnail convey?"
                    }
                ]
            }
        }
    };

    res.json(mockResponse);
};