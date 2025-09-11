"use client";
import Image from "next/image";
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Stethoscope, User, ArrowRight } from 'lucide-react';

interface UserTypeSelectionProps {
  onSelectUserType: (userType: 'doctor' | 'patient') => void;
}

export default function UserTypeSelection({ onSelectUserType }: UserTypeSelectionProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-center mb-8">
        <div className="bg-gray-600 p-3 rounded-full mr-3">
          <Image src="/icon512_maskable.png" alt='portal logo' width={40} height={50}/>
        </div>
        <div>
          <h1 className="text-gray-800">MediSyncAi Portal</h1>
          <p className="text-gray-600">Secure Healthcare Access</p>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-gray-800">Welcome to MediSyncAi Portal</h2>
        <p className="text-gray-600 mt-2">Please select your account type to continue</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-gray-200 bg-white">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto bg-gray-100 p-4 rounded-full w-fit mb-4">
              <Stethoscope className="h-8 w-8 text-gray-600" />
            </div>
            <CardTitle className="text-gray-800">Healthcare Professional</CardTitle>
            <CardDescription className="text-gray-600">
              For doctors, nurses, and medical staff
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <ul className="text-sm text-gray-600 mb-6 space-y-2">
              <li>• Access patient records</li>
              <li>• Manage appointments</li>
              <li>• View medical histories</li>
              <li>• Prescription management</li>
            </ul>
            <Button 
              onClick={() => onSelectUserType('doctor')} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Continue as Doctor
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-gray-200 bg-white">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto bg-gray-100 p-4 rounded-full w-fit mb-4">
              <User className="h-8 w-8 text-gray-600" />
            </div>
            <CardTitle className="text-gray-800">Patient</CardTitle>
            <CardDescription className="text-gray-600">
              For patients seeking medical care
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <ul className="text-sm text-gray-600 mb-6 space-y-2">
              <li>• Book appointments</li>
              <li>• View test results</li>
              <li>• Access medical records</li>
              <li>• Message healthcare providers</li>
            </ul>
            <Button 
              onClick={() => onSelectUserType('patient')} 
              className="w-full bg-gray-800 hover:bg-gray-900 text-white"
            >
              Continue as Patient
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-600">
          Need help? Contact our support team at{' '}
          <button className="text-gray-700 hover:underline hover:text-gray-800">support@medisyncai.com</button>
        </p>
      </div>
    </div>
  );
}