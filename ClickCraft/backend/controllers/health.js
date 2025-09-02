export const healthCheck = async (req, res) => {
    res.status(200).json({ status: 'ok' });
}

export const getBase64FromCloudinary = async (url) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    
    // 👇 you can set the MIME dynamically if you know the image type, e.g. jpg/png
    return `data:image/png;base64,${base64}`;
  }
  