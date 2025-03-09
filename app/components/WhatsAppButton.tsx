"use client"

import { FaWhatsapp } from "react-icons/fa"
import { motion } from "framer-motion"

export default function WhatsAppButton() {
  const openWhatsApp = () => {
    const whatsappUrl = `https://wa.me/2348162831919?text=Hello%20HardyTech,%20I'm%20interested%20in%20your%20services.`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <motion.button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="h-6 w-6" />
      <span className="ml-2 hidden md:inline">Chat with us</span>
    </motion.button>
  )
}

