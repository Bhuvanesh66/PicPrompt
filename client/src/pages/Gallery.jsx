import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AppContext);

  useEffect(() => {
    fetchUserImages();
  }, []);

  const fetchUserImages = async () => {
    try {
      const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const response = await axios.get(
        `${base}/api/v1/images/user-generations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success && response.data.recentGenerations) {
        setImages(response.data.recentGenerations);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  };

  const filteredImages = images.filter((image) =>
    image.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] px-4 pt-14 mb-10"
    >
      <h1 className="text-center text-3xl font-medium mb-8">
        Your Generated Images
      </h1>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by prompt..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={image.imageUrl}
                alt={image.prompt}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-800 font-medium mb-2">{image.prompt}</p>
                <p className="text-gray-600 text-sm">
                  {formatDate(image.createdAt)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          {searchTerm
            ? "No images match your search."
            : "No images generated yet."}
        </div>
      )}
    </motion.div>
  );
};

export default Gallery;
