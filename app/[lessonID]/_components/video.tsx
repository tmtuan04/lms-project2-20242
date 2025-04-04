// 'use client';
// import { useEffect } from "react";

// use videojs npm install --save-dev video.js
// import "video.js/dist/video-js.css";
// import '@videojs/themes/dist/sea/index.css';
// import '@videojs/themes/dist/city/index.css';
// import videojs from "video.js";

// use video of video-next npm install next-video
// import video from 'next-video'



function MyVideo() {
    // const videoSrc = "https:/ / vjs.zencdn.net / v / oceans.mp4";

    // useEffect(() => {
    //     const player = videojs("my_video_1");
    //     // Cleanup khi component bị unmount
    //     return () => {
    //         if (player) {
    //             player.dispose();
    //         }
    //     };
    // }, []);


    return (
        <div>
            {/* <video
                id="my_video_1"
                className="video-js vjs-default-skin vjs  vjs-big-play-centered "
                width="640px"
                height="267px"
                controls
                preload="auto"
                data-setup='{"playbackRates": [0.5, 1, 1.5, 2] }'
            >
                <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
            </video> */}

            {/* <video src="https://vjs.zencdn.net/v/oceans.mp4" /> */}
        </div>
    );
}

export default MyVideo;