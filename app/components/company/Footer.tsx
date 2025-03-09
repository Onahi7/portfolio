import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hardy Technology</h3>
            <p className="text-slate-400 mb-4">
              Transforming ideas into digital reality with innovative software solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/hardytech" className="text-slate-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com/hardytech" className="text-slate-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com/hardytech" className="text-slate-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com/company/hardytech"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Services", href: "/services" },
                { name: "Training Events", href: "/training-events" },
                { name: "Project Calculator", href: "/calculator" },
                { name: "About Us", href: "/vision" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                { name: "Web Development", href: "/services#web" },
                { name: "Software Solutions", href: "/services#software" },
                { name: "Blockchain Development", href: "/services#blockchain" },
                { name: "Technical Training", href: "/training" },
                { name: "Consulting", href: "/services#consulting" },
              ].map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-slate-400 hover:text-white transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">123 Tech Street, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-slate-400" />
                <a href="tel:+2348012345678" className="text-slate-400 hover:text-white transition-colors">
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-slate-400" />
                <a
                  href="mailto:contact@hardytechnology.xyz"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  contact@hardytechnology.xyz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Hardy Technology. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy-policy" className="text-slate-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-slate-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

