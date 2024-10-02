import express from "express";
import fs from "fs";
import uuid4 from "uuid4";

const router = express.Router();

const photosFilePath = "./data/photos.json";

const readPhotos = () => {
  const photosData = fs.readFileSync(photosFilePath);
  const photos = JSON.parse(photosData);
  return photos;
};

const writePhotos = (data) => {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync(photosFilePath, stringifiedData);
};

router.get("/", (req, res) => {
  try {
    const photos = readPhotos();
    res.json(photos);
  } catch (error) {
    console.error("Error reading photos file", error);
  }
});

router.get("/:id", (req, res) => {
  try {
    const photos = readPhotos();
    const photoId = req.params.id;
    const individualPhoto = photos.find((photo) => photo.id === photoId);

    if (!individualPhoto) {
      console.log("photo not found for ID: ", photoId);
    }

    res.json(individualPhoto);
  } catch (error) {
    console.error("Error ", error);
  }
});

router.post("/:id/comments", (req, res) => {
  const photos = readPhotos();
  const photoId = req.params.id;
  const individualPhoto = photos.find((photo) => photo.id === photoId);

  if (!individualPhoto) {
    console.log("photo not found for ID: ", photoId);
  }

  const newComment = {
    id: uuid4(),
    name: req.body.name || "Test User",
    comment: req.body.comment || "No comment provided",
    timestamp: Date.now(),
  };

  individualPhoto.comments.push(newComment);
  writePhotos(photos);
  res.status(201).json(newComment);
});

export default router;
