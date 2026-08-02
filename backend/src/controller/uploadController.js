import imagekit from "../config/imagekit.js";

export const uploadImage = async (req, res) => {
  try {
    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: Date.now() + "-" + req.file.originalname,
    });

    res.json({
      url: result.url,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Upload failed",
    });
  }
};