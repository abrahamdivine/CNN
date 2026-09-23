const express = require("express")
const News = require("../models/news");
const authMiddleware = require( "../middleware/authMiddleware")
const router = express.Router();
const newsRoutes = require("./routes/newsRoutes")


//create post
router.post("/", authMiddleware,async (req,res)=>{
    const {title,body} = req.body;

    const news= new News({ title, body});
    await news.save();
    res.status(201).json(news);
});
//read post
router.get("/", authMiddleware,async (req,res)=>{
    const News = await News.find()
    res.json(news);
})
//update news
router.put("/:id", authMiddleware, async (req,res)=>{
    const { title, body} = req.body;

    const news = await News.findByIDAndUpdate(
        req.params.id,
        {title, body}, {new: true}
    )

    if (!news){
        return res.status(404).json({ message: "News not found"});
    }
    res.json(news);
});

//Delete news
router.delete("/:id", authMiddleware, async (req, res) => {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) {
        return res.status(404).json({ message: "News not found" });
    }

    res.json({ message: "News deleted successfully" });
});

module.exports = router;
