"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from '../app/components/ui/button';
import { Card, CardContent } from '../app/components/ui/card';
import { Activity, Calendar, Video, Users, Heart, Shield, Zap } from 'lucide-react';
import { ImageWithFallback } from '../app/components/interface/ImageWithFallback';
import Header from "./Header";

export default function LandingPage({ setCurrentPage }) {
  const router = useRouter();
  const features = [
    {
      icon: Calendar,
      title: 'Medical Events',
      description: 'Discover and join medical camps and healthcare events in your area.',
      action: () => setCurrentPage('events')
    },
    {
      icon: Video,
      title: 'Telemedicine',
      description: 'Connect with healthcare professionals through secure video calls.',
      action: () => setCurrentPage('video')
    },
    {
      icon: Users,
      title: 'Patient Dashboard',
      description: 'Manage your health records and track your medical journey.',
      action: () => setCurrentPage('dashboard')
    }
  ];

  const stats = [
    { icon: Heart, value: '10,000+', label: 'Patients Served' },
    { icon: Shield, value: '500+', label: 'Medical Camps' },
    { icon: Zap, value: '24/7', label: 'Support Available' }
  ];

  return (
    <>
    <Header/>
    
  
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-5xl lg:text-6xl text-gray-900"
                >
                  Healthcare{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Innovation
                  </span>{' '}
                  at Your Fingertips
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl text-gray-600 max-w-2xl"
                >
                  Connect with medical professionals, join health camps, and manage your healthcare journey 
                  through our comprehensive medtech platform.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  size="lg" 
                  onClick={() => router.push("/events")}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
                >
                  Explore Events
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => router.push("/videocall")}
                  className="px-8 py-3"
                >
                  Start Video Call
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1576669801838-1b1c52121e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzU2OTg3NzEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Medical Technology"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
              </div>
              
              {/* Floating Animation Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center shadow-lg"
              >
                <Activity className="h-8 w-8 text-blue-600" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-4 w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center shadow-lg"
              >
                <Heart className="h-6 w-6 text-purple-600" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl text-gray-900 mb-4">Comprehensive Healthcare Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your health and connect with medical professionals in one platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={feature.action}>
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl text-gray-900 mb-4">{feature.title}</h3>
                      <p className="text-gray-600 mb-6">{feature.description}</p>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl text-white">Ready to Transform Your Healthcare Experience?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of patients and healthcare providers using our platform to improve healthcare delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3"
              >
                Create Account
              </Button>
              <Button 
                size="lg"
                onClick={() => router.push("/events")}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3"
              >
                View Events
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
      </>
  );
}