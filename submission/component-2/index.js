const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Course = require("./models/Course");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Ars Florum server is running");
});

// TEMPORARY seed route - use once
app.get("/seed", async (req, res) => {
  try {
    await Course.deleteMany({});

    const seedCourses = [
      {
        title: "Floral Design Fundamentals",
        description:
          "This beginner-friendly course introduces the core principles of floral design. Students will learn how to create balanced, visually appealing arrangements using fresh flowers and foliage. The course explores colour theory, composition, and essential floristry techniques, providing a strong foundation for further studies or personal creativity.",
        instructor: "Steve Buscemi",
        duration: "6 hours",
        category: "Beginner Floristry",
        image: "/images/floral-design-fundamentals.jpg",
        modules: [
          "Introduction to Floristry Tools & Materials",
          "Understanding Flower Types & Care",
          "Colour Theory in Floral Design",
          "Basic Bouquet Techniques",
          "Vase and Container Arrangements",
          "Seasonal Flower Selection"
        ],
        enrolments: 24
      },
      {
        title: "Wedding & Event Floristry",
        description:
          "This intermediate course focuses on designing floral arrangements for weddings and events. Students will gain practical skills in creating bridal bouquets, centrepieces, and large-scale installations. The course also covers client consultation, styling concepts, and working within event themes.",
        instructor: "Mariska Hargitay",
        duration: "8 hours",
        category: "Event Floristry",
        image: "/images/wedding-event-floristry.jpg",
        modules: [
          "Understanding Wedding Floral Styles",
          "Bridal Bouquets & Boutonnieres",
          "Table Centrepieces & Installations",
          "Venue Styling & Floral Decor",
          "Working with Clients & Briefs",
          "Event Setup & Logistics"
        ],
        enrolments: 20
      },
      {
        title: "Sustainable Floristry Practices",
        description:
          "This course introduces environmentally conscious approaches to floristry. Students will learn how to reduce waste, source sustainable materials, and create beautiful arrangements without floral foam. Ideal for florists looking to adopt eco-friendly practices.",
        instructor: "Will Ferrell",
        duration: "5 hours",
        category: "Sustainable Design",
        image: "/images/sustainable-floristry-practices.jpg",
        modules: [
          "Introduction to Sustainable Floristry",
          "Foam-Free Arrangement Techniques",
          "Seasonal & Local Flower Sourcing",
          "Reducing Waste in Floral Design",
          "Reusable Mechanics & Materials",
          "Designing with Sustainability in Mind"
        ],
        enrolments: 15
      }
    ];

    const insertedCourses = await Course.insertMany(seedCourses);
    res.json(insertedCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all courses from MongoDB
app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET one course by MongoDB id
app.get("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new course to MongoDB
app.post("/courses", async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// PUT route to increase enrolments by 1
app.put("/courses/:id/enrol", async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { $inc: { enrolments: 1 } },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});