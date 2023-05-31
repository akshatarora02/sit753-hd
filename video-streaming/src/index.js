const express = require("express");
const fs = require("fs");

//
// Setup event handlers.
//
function setupHandlers(app) {
    app.get("/video", (req, res) => { // Route for streaming video.
        
        const videoPath = "./videos/SampleVideo_1280x720_1mb.mp4";
        fs.stat(videoPath, (err, stats) => {
            if (err) {
                console.error("An error occurred ");
                res.sendStatus(500);
                return;
            }
    
            res.writeHead(200, {
                "Content-Length": stats.size,
                "Content-Type": "video/mp4",
            });
    
            fs.createReadStream(videoPath).pipe(res);
        });
    });
}

//
// Start the HTTP server.
        const app = express();
        setupHandlers(app);
        const port = process.env.PORT && parseInt(process.env.PORT) || 3000;
        app.listen(port, () => {
            console.log("Microservice online.")
        })
        

    module.exports = app;