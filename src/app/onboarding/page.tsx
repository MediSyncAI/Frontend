"use client"
import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { CalendarIcon, UserCheck, Heart, AlertTriangle } from "lucide-react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';



interface OnboardingData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  emergencyPhone: string;
  bloodGroup: string;
  allergies: string;
  pastMedicalHistory: string;
  familyMedicalHistory: {
    cancer: boolean;
    heartDisease: boolean;
    diabetes: boolean;
    hypertension: boolean;
    other: string;
  };
}

export default function MedicalOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const [formData, setFormData] = useState<OnboardingData>({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    emergencyPhone: '',
    bloodGroup: '',
    allergies: '',
    pastMedicalHistory: '',
    familyMedicalHistory: {
      cancer: false,
      heartDisease: false,
      diabetes: false,
      hypertension: false,
      other: ''
    }
  });

  const totalSteps = 3;

  const handleInputChange = (field: keyof OnboardingData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFamilyHistoryChange = (condition: keyof OnboardingData['familyMedicalHistory'], value: boolean | string) => {
    setFormData(prev => ({
      ...prev,
      familyMedicalHistory: {
        ...prev.familyMedicalHistory,
        [condition]: value
      }
    }));
  };

  const handleSubmit = () => {
    console.log('Onboarding data:', formData);
    // Handle form submission here
    alert('Profile created successfully! Welcome to the app.');
    router.push("/dashboard");

    
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Image src="/icon512_maskable.png" alt='logo' width={50} height={100}/>
            <h1 className="text-3xl text-gray-900">MediSyncAI</h1>
          </div>
          <h2 className="text-xl text-gray-700">Complete Your Medical Profile</h2>
          <p className="text-gray-500 mt-2">Help us provide you with personalized care</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {currentStep === 1 && <><UserCheck className="mr-2 h-5 w-5" />Personal Information</>}
              {currentStep === 2 && <><Heart className="mr-2 h-5 w-5" />Medical Information</>}
              {currentStep === 3 && <><AlertTriangle className="mr-2 h-5 w-5" />Medical History</>}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Let's start with your basic information"}
              {currentStep === 2 && "Now, some important medical details"}
              {currentStep === 3 && "Finally, your medical history"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {genders.map((gender) => (
                          <SelectItem key={gender} value={gender.toLowerCase()}>
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  </div>
                  <div>
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      value={formData.emergencyPhone}
                      onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>
            
            )}

            {/* Step 2: Medical Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bloodGroup">Blood Group *</Label>
                  
                  <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  
                </div>

                <div>
                  <Label htmlFor="allergies">Known Allergies</Label>
                  <Textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                    placeholder="List any known allergies (medications, food, environmental, etc.)"
                    rows={3}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Include medications, foods, or environmental allergies. Write &quot;None&quot; if no known allergies.
                  </p>
                </div>

                <div>
                  <Label htmlFor="pastMedicalHistory">Past Medical History</Label>
                  <Textarea
                    id="pastMedicalHistory"
                    value={formData.pastMedicalHistory}
                    onChange={(e) => handleInputChange('pastMedicalHistory', e.target.value)}
                    placeholder="Previous surgeries, chronic conditions, major illnesses, current medications..."
                    rows={4}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Include surgeries, chronic conditions, current medications, and major illnesses.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Family Medical History */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Family Medical History</Label>
                  <p className="text-sm text-gray-600 mb-4">
                    Select any conditions that run in your family (parents, siblings, grandparents)
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="cancer"
                        checked={formData.familyMedicalHistory.cancer}
                        onCheckedChange={(checked) => handleFamilyHistoryChange('cancer', checked as boolean)}
                      />
                      <Label htmlFor="cancer">Cancer</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="heartDisease"
                        checked={formData.familyMedicalHistory.heartDisease}
                        onCheckedChange={(checked) => handleFamilyHistoryChange('heartDisease', checked as boolean)}
                      />
                      <Label htmlFor="heartDisease">Heart Disease</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="diabetes"
                        checked={formData.familyMedicalHistory.diabetes}
                        onCheckedChange={(checked) => handleFamilyHistoryChange('diabetes', checked as boolean)}
                      />
                      <Label htmlFor="diabetes">Diabetes</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hypertension"
                        checked={formData.familyMedicalHistory.hypertension}
                        onCheckedChange={(checked) => handleFamilyHistoryChange('hypertension', checked as boolean)}
                      />
                      <Label htmlFor="hypertension">High Blood Pressure (Hypertension)</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="otherFamilyHistory">Other Family Medical Conditions</Label>
                  <Textarea
                    id="otherFamilyHistory"
                    value={formData.familyMedicalHistory.other}
                    onChange={(e) => handleFamilyHistoryChange('other', e.target.value)}
                    placeholder="Any other significant family medical conditions..."
                    rows={3}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Privacy Notice:</strong> Your medical information is encrypted and securely stored. 
                    This information helps healthcare providers give you better, more personalized care.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < totalSteps ? (
                <Button onClick={nextStep}>
                  Next Step
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  Complete Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-500">
          Your information is secure and HIPAA compliant
        </div>
      </div>
    </div>
  );
}