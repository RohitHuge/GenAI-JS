

export const initialPrompt = async (req, res) => {
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);
    
    // For FormData, the data comes in req.body
    const prompt = req.body.prompt;
    const mode = req.body.mode;
    const imageFile = req.files?.imageFile; // Files come in req.files when using multer
    
    console.log('Extracted data:', { prompt, mode, hasImageFile: !!imageFile });
    
    res.json({ 
        message: "Initial prompt received",
        receivedData: { prompt, mode, hasImageFile: !!imageFile }
    });
}