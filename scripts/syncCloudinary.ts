import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const posters = fs
  .readdirSync("public/posters")
  .filter((dir) => !dir.startsWith("."));
const videos = fs.readdirSync("public/videos");
const images = fs.readdirSync("public/images");

// Function to fetch Cloudinary resources
async function syncFiles() {
  const resImages = await cloudinary.api.resources({
    max_results: 1000,
  });
  const resVideos = await cloudinary.api.resources({
    max_results: 1000,
    resource_type: "video",
  });

  const resMap: Record<string, string> = {};

  resImages.resources.forEach((r) => {
    resMap[r.public_id] = r.secure_url;
  });
  resVideos.resources.forEach((r) => {
    resMap[r.public_id] = r.secure_url;
  });

  const unsyncedPosters = posters.filter((dir) => !resMap[`posters/${dir}`]);

  if (unsyncedPosters.length === 0) {
    console.log("All posters are synced");
  } else {
    for (let i = 0; i < unsyncedPosters.length; i++) {
      const dir = unsyncedPosters[i];
      try {
        console.log(
          `Uploading poster ${dir} (${i + 1} of ${unsyncedPosters.length})`
        );
        const upload = await cloudinary.uploader.upload(
          `public/posters/${dir}/poster.jpg`,
          {
            public_id: dir,
            folder: "posters",
          }
        );
        resMap[upload.public_id] = upload.secure_url;
      } catch (err) {
        console.log(err);
      }
    }
  }

  const unsyncedImages = images.filter((dir) => !resMap[`images/${dir}`]);

  if (unsyncedImages.length === 0) {
    console.log("All images are synced");
  } else {
    for (let i = 0; i < unsyncedImages.length; i++) {
      const dir = unsyncedImages[i];
      try {
        console.log(
          `Uploading image ${dir} (${i + 1} of ${unsyncedImages.length})`
        );
        const upload = await cloudinary.uploader.upload(
          `public/images/${dir}`,
          {
            public_id: dir,
            folder: "images",
          }
        );
        resMap[upload.public_id] = upload.secure_url;
      } catch (err) {
        console.log(err);
      }
    }
  }

  const unsyncedVideos = videos.filter((dir) => !resMap[`videos/${dir}`]);

  if (unsyncedVideos.length === 0) {
    console.log("All videos are synced");
  } else {
    for (let i = 0; i < unsyncedVideos.length; i++) {
      const vid = unsyncedVideos[i];
      try {
        console.log(
          `Uploading video ${vid} (${i + 1} of ${unsyncedVideos.length})`
        );
        const upload = await cloudinary.uploader.upload(
          `public/videos/${vid}`,
          {
            resource_type: "video",
            public_id: vid,
            folder: "videos",
          }
        );
        resMap[upload.public_id] = upload.secure_url;
      } catch (err) {
        console.log(err);
      }
    }
  }

  const sortedResMap: typeof resMap = {};
  for (const key of Object.keys(resMap).sort()) {
    sortedResMap[key] = resMap[key];
  }
  fs.writeFileSync("src/cdn.json", JSON.stringify(sortedResMap, null, 2));
}

// console.log(videos);
// Fetch and cache Cloudinary files
syncFiles().catch(console.error);
