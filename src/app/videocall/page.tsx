"use client"
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import Header from '../Header';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff,
  Shield,
  Phone, 
  PhoneOff,
  Settings,
  Users,
  MessageCircle,
  Share,
  Clock,
  User
} from 'lucide-react';
import { ImageWithFallback } from '../components/interface/ImageWithFallback';


type Doctor = {
  id: number
  name: string
  specialty: string
  rating: number
  experience: string
  isOnline: boolean
  image: string
  consultationFee: string
  nextAvailable: string
}

export default function Page() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isInCall, setIsInCall] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const videoRef = useRef(null);

  const doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.9,
      experience: '15 years',
      isOnline: true,
      image: 'https://images.unsplash.com/photo-1744686910398-426ab2a0ce8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGNhbGwlMjB0ZWxlbWVkaWNpbmV8ZW58MXx8fHwxNzU3MDY0Mzg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      consultationFee: '$50',
      nextAvailable: 'Available Now'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'General Physician',
      rating: 4.8,
      experience: '12 years',
      isOnline: true,
      image: 'https://images.unsplash.com/photo-1744686910398-426ab2a0ce8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGNhbGwlMjB0ZWxlbWVkaWNpbmV8ZW58MXx8fHwxNzU3MDY0Mzg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      consultationFee: '$40',
      nextAvailable: 'Available in 15 min'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrician',
      rating: 4.9,
      experience: '18 years',
      isOnline: false,
      image: 'https://images.unsplash.com/photo-1744686910398-426ab2a0ce8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGNhbGwlMjB0ZWxlbWVkaWNpbmV8ZW58MXx8fHwxNzU3MDY0Mzg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      consultationFee: '$45',
      nextAvailable: 'Available at 3:00 PM'
    }
  ];

  const startCall = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsInCall(true);
  };

  const endCall = () => {
    setIsInCall(false);
    setSelectedDoctor(null);
    setCallDuration(0);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isInCall && selectedDoctor) {
    return (
      <>
      
      <Header/>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        {/* Call Header */}
        <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-gray-300" />
              </div>
              <div>
                <h3 className="text-white font-medium">{selectedDoctor.name}</h3>
                <p className="text-gray-400 text-sm">{selectedDoctor.specialty}</p>
              </div>
            </div>
            <Badge variant="outline" className="text-green-400 border-green-400">
              <Clock className="h-3 w-3 mr-1" />
              {formatDuration(callDuration)}
            </Badge>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Video Call Interface */}
        <div className="flex-1 relative">
          {/* Main Video */}
          <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <User className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-2xl text-white mb-2">{selectedDoctor.name}</h3>
                <p className="text-blue-200">Connected</p>
              </div>
            </div>

            {/* Self Video (Picture in Picture) */}
            <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600">
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                {isVideoOn ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-white text-sm mt-2">You</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <VideoOff className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Video Off</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Call Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-gray-800 rounded-full px-6 py-3">
              <Button
                variant={isAudioOn ? "secondary" : "destructive"}
                size="lg"
                className="rounded-full h-12 w-12 p-0"
                onClick={() => setIsAudioOn(!isAudioOn)}
              >
                {isAudioOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
              </Button>
              
              <Button
                variant="destructive"
                size="lg"
                className="rounded-full h-14 w-14 p-0 bg-red-600 hover:bg-red-700"
                onClick={endCall}
              >
                <PhoneOff className="h-6 w-6" />
              </Button>
              
              <Button
                variant={isVideoOn ? "secondary" : "destructive"}
                size="lg"
                className="rounded-full h-12 w-12 p-0"
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full h-12 w-12 p-0"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full h-12 w-12 p-0"
              >
                <Share className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
    <Header/>

    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 mb-2">Video Consultation</h1>
          <p className="text-xl text-gray-600">
            Connect with qualified healthcare professionals from anywhere
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Video className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg text-gray-900 mb-2">Instant Consultation</h3>
              <p className="text-gray-600 text-sm mb-4">Connect with available doctors immediately</p>
              <Button className="w-full">Start Now</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg text-gray-900 mb-2">Schedule Appointment</h3>
              <p className="text-gray-600 text-sm mb-4">Book a consultation for later</p>
              <Button variant="outline" className="w-full">Schedule</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg text-gray-900 mb-2">Group Consultation</h3>
              <p className="text-gray-600 text-sm mb-4">Join group sessions and seminars</p>
              <Button variant="outline" className="w-full">View Groups</Button>
            </CardContent>
          </Card>
        </div>

        {/* Available Doctors */}
        <div className="mb-8">
          <h2 className="text-2xl text-gray-900 mb-6">Available Doctors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map(doctor => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <User className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-2 border-white ${
                      doctor.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <h3 className="text-lg text-gray-900">{doctor.name}</h3>
                  <p className="text-blue-600">{doctor.specialty}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Rating:</span>
                    <span className="text-gray-900">⭐ {doctor.rating}/5</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Experience:</span>
                    <span className="text-gray-900">{doctor.experience}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Consultation:</span>
                    <span className="text-gray-900">{doctor.consultationFee}</span>
                  </div>
                  
                  <div className="text-center">
                    <Badge variant={doctor.isOnline ? "default" : "secondary"} className="mb-4">
                      {doctor.nextAvailable}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      disabled={!doctor.isOnline}
                      onClick={() => startCall(doctor)}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Start Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-8">
            <h2 className="text-2xl text-gray-900 mb-6 text-center">Why Choose Our Telemedicine Service?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">HD Video Quality</h3>
                <p className="text-xs text-gray-600">Crystal clear video and audio</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Secure & Private</h3>
                <p className="text-xs text-gray-600">HIPAA compliant platform</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">24/7 Availability</h3>
                <p className="text-xs text-gray-600">Round-the-clock support</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Expert Doctors</h3>
                <p className="text-xs text-gray-600">Qualified healthcare professionals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
        </>
  );
}