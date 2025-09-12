"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Search, 
  Filter,
  Heart,
  Stethoscope,
  Eye,
  Activity
} from 'lucide-react';
import { ImageWithFallback } from '../components/interface/ImageWithFallback';
import Header from '../Header';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');



  interface Event {
      id: number,
      title: string,
      category: Category,
      date: string,
      time: string,
      location: string,
      description: string,
      attendees: number,
      maxAttendees: number,
      image: string, 
      status: string,
      medicines: Array<string>
  }




  const events : Event[]  = [
    {
      id: 1,
      title: 'Free Health Checkup Camp',
      category: 'checkup',
      date: '2025-01-15',
      time: '09:00 AM - 5:00 PM',
      location: 'Community Center, Downtown',
      description: 'Comprehensive health screening including blood pressure, diabetes, and general health assessment.',
      attendees: 120,
      maxAttendees: 200,
      image: 'https://images.unsplash.com/photo-1643215847836-44de0c0a1bee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2FtcCUyMGhlYWx0aGNhcmUlMjBldmVudHxlbnwxfHx8fDE3NTcwNjQzODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'upcoming',
      medicines: ['Basic First Aid', 'Blood Pressure Medication', 'Diabetes Testing Kits']
    },
    {
      id: 2,
      title: 'Cardiology Awareness Camp',
      category: 'cardiology',
      date: '2025-01-20',
      time: '10:00 AM - 4:00 PM',
      location: 'City Hospital Grounds',
      description: 'Heart health screening, ECG tests, and consultation with cardiologists.',
      attendees: 85,
      maxAttendees: 150,
      image: 'https://images.unsplash.com/photo-1643215847836-44de0c0a1bee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2FtcCUyMGhlYWx0aGNhcmUlMjBldmVudHxlbnwxfHx8fDE3NTcwNjQzODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'upcoming',
      medicines: ['Heart Medications', 'Blood Thinners', 'Emergency Cardiac Care']
    },
    {
      id: 3,
      title: 'Pediatric Vaccination Drive',
      category: 'pediatric',
      date: '2025-01-25',
      time: '08:00 AM - 3:00 PM',
      location: 'Primary School Campus',
      description: 'Free vaccination program for children aged 6 months to 12 years.',
      attendees: 200,
      maxAttendees: 300,
      image: 'https://images.unsplash.com/photo-1643215847836-44de0c0a1bee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2FtcCUyMGhlYWx0aGNhcmUlMjBldmVudHxlbnwxfHx8fDE3NTcwNjQzODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'upcoming',
      medicines: ['Vaccines', 'Pediatric Medicines', 'Vitamin Supplements']
    },
    {
      id: 4,
      title: 'Eye Care Awareness Camp',
      category: 'ophthalmology',
      date: '2025-01-30',
      time: '09:00 AM - 6:00 PM',
      location: 'Medical College',
      description: 'Free eye examination, vision testing, and distribution of reading glasses.',
      attendees: 95,
      maxAttendees: 180,
      image: 'https://images.unsplash.com/photo-1643215847836-44de0c0a1bee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2FtcCUyMGhlYWx0aGNhcmUlMjBldmVudHxlbnwxfHx8fDE3NTcwNjQzODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'upcoming',
      medicines: ['Eye Drops', 'Vision Correction Aids', 'Reading Glasses']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Events', icon: Activity },
    { id: 'checkup', label: 'Health Checkup', icon: Stethoscope },
    { id: 'cardiology', label: 'Cardiology', icon: Heart },
    { id: 'pediatric', label: 'Pediatric', icon: Users },
    { id: 'ophthalmology', label: 'Eye Care', icon: Eye }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

type Category = 'checkup' | 'cardiology' | 'pediatric' | 'ophthalmology';

const getCategoryBadgeColor = (category: Category) => {
  const colors: Record<Category, string> = {
    checkup: 'bg-blue-100 text-blue-800',
    cardiology: 'bg-red-100 text-red-800',
    pediatric: 'bg-green-100 text-green-800',
    ophthalmology: 'bg-purple-100 text-purple-800',
  };

  return colors[category] || 'bg-gray-100 text-gray-800';
};


  return (
    <>
    <Header/>
  
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 mb-2">Medical Events & Camps</h1>
          <p className="text-xl text-gray-600">
            Discover upcoming healthcare events and join medical camps in your area
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={filterCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryBadgeColor(event.category)}>
                    {categories.find(c => c.id === event.category)?.label}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-2">
                <h3 className="text-xl text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees}/{event.maxAttendees} registered</span>
                  </div>
                </div>

                {/* Medicine Availability */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Available Medicines:</h4>
                  <div className="flex flex-wrap gap-1">
                    {event.medicines.slice(0, 2).map((medicine, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {medicine}
                      </Badge>
                    ))}
                    {event.medicines.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{event.medicines.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Registration Progress</span>
                    <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    />
                  </div>
                </div>

                <Button className="w-full">
                  Register for Event
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg text-gray-500 mb-2">No events found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
      </>
  );
}