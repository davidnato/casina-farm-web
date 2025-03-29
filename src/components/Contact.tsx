
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Message sent! We will get back to you soon.');
  };

  return (
    <section id="contact" className="section-padding bg-farm-beige/30">
      <div className="farm-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Contact Us</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Have questions or want to place an order? Reach out to us, and we'll be happy to help.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-farm-earth mb-6">Farm Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="text-farm-green mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-farm-earth">Address</h4>
                  <p className="text-gray-600">123 Farm Road, Countryside, CA 90210</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-farm-green mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-farm-earth">Phone</h4>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="text-farm-green mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-farm-earth">Email</h4>
                  <p className="text-gray-600">info@casinafarm.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="text-farm-green mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-farm-earth">Farm Hours</h4>
                  <p className="text-gray-600">Monday - Friday: 8am - 5pm</p>
                  <p className="text-gray-600">Saturday: 9am - 3pm</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium text-farm-earth mb-2">Farm Store</h4>
              <p className="text-gray-600 mb-4">
                Visit our farm store to purchase fresh produce directly and meet our team.
              </p>
              <Button className="btn-secondary">Get Directions</Button>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-farm-earth mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input 
                  id="name"
                  placeholder="Your name"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="Your email"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input 
                  id="subject"
                  placeholder="Subject"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea 
                  id="message"
                  placeholder="Your message"
                  required
                  className="w-full min-h-[120px]"
                />
              </div>
              
              <Button type="submit" className="btn-primary w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
