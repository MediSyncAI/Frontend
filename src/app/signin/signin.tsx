"use client";
import { UserAuth } from "../context/AuthContext";


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useRouter } from "next/navigation";

import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Eye, EyeOff, Stethoscope, ShieldCheck, UserPlus, LogIn, ArrowLeft, User } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
}


interface DoctorRegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  licenseNumber: string;
  specialty: string;
  hospitalAffiliation?: string;
  yearsOfExperience: string;
}

interface PatientRegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  phoneNumber: string;
  emergencyContact: string;
  insuranceProvider?: string;
  allergies?: string;
}

interface AuthFormProps {
  userType: 'doctor' | 'patient';
  onBack: () => void;
}

export default function AuthForm({ userType, onBack }: AuthFormProps) {
  const { signInUser } = UserAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const { signUpNewUser } = UserAuth();
  const loginForm = useForm<LoginFormData>();
  const doctorRegisterForm = useForm<DoctorRegisterFormData>();
  const patientRegisterForm = useForm<PatientRegisterFormData>();
  const [error, setError] = useState<string | null>(null);
    const router = useRouter();


  const onLoginSubmit = async (data: LoginFormData,) => {
     const { session, error } = await signInUser(data.email, data.password,userType); // Use your signIn function

    if (error) {
      setError(error); // Set the error message if sign-in fails

      // Set a timeout to clear the error message after a specific duration (e.g., 3 seconds)
      setTimeout(() => {
        setError("");
      }, 3000); // 3000 milliseconds = 3 seconds
    } else {
      // Redirect or perform any necessary actions after successful sign-in
      
      router.push("/dashboard");
    }
    
    if (session) {
      setError(""); // Reset the error when there's a session
    }else{
      console.log(session)
      setLoginSuccess(true);

    }
    
    // Mock successful login
    setTimeout(() => setLoginSuccess(false), 3000);
  };

  const onDoctorRegisterSubmit = async (data: DoctorRegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      doctorRegisterForm.setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match'
      });
      return;
    }
    const { session, err } = await signUpNewUser(data.email, data.password,"doctor",data.firstName+data.lastName); 
    if (err) {
      setError(err); // Set the error message if sign-in fails

      // Set a timeout to clear the error message after a specific duration (e.g., 3 seconds)
      setTimeout(() => {
        setError("");
      }, 3000); // 3000 milliseconds = 3 seconds
    } else {
      // Redirect or perform any necessary actions after successful sign-in

      router.push("/dashboard")
      
    }
    if (session) {

      setError(""); // Reset the error when there's a session
    }
    setRegisterSuccess(true);
    setTimeout(() => setRegisterSuccess(false), 3000);
  };

  const onPatientRegisterSubmit = async (data: PatientRegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      patientRegisterForm.setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match'
      });
      return;
    }
    const { session, err } = await signUpNewUser(data.email, data.password,"patient",data.firstName+data.lastName); // Use your signIn function
    if (err) {
      setError(err); // Set the error message if sign-in fails

      // Set a timeout to clear the error message after a specific duration (e.g., 3 seconds)
      setTimeout(() => {
        setError("");
      }, 3000); // 3000 milliseconds = 3 seconds
    } else {
      // Redirect or perform any necessary actions after successful sign-in

      router.push("/onboarding")
      
    }
    if (session) {

      setError(""); // Reset the error when there's a session
    }



    setRegisterSuccess(true);
    setTimeout(() => setRegisterSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={onBack} className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center">
          <div className="p-3 rounded-full mr-3 bg-gray-100">
            {userType === 'doctor' ? (
              <Stethoscope className="h-8 w-8 text-gray-600" />
            ) : (
              <User className="h-8 w-8 text-gray-600" />
            )}
          </div>
          <div>
            <h1 className="text-gray-800">
              {userType === 'doctor' ? 'Doctor Portal' : 'Patient Portal'}
            </h1>
            <p className="text-gray-600">
              {userType === 'doctor' ? 'Healthcare Professional Access' : 'Patient Care Access'}
            </p>
          </div>
        </div>
        <div className="w-10"></div>
      </div>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-50">
          <TabsTrigger value="login" className="flex items-center gap-2 data-[state=active]:bg-gray-800 data-[state=active]:text-white">
            <LogIn className="h-4 w-4" />
            Login
          </TabsTrigger>
          <TabsTrigger value="register" className="flex items-center gap-2 data-[state=active]:bg-gray-800 data-[state=active]:text-white">
            <UserPlus className="h-4 w-4" />
            Register
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <ShieldCheck className="h-5 w-5 text-gray-600" />
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to access your healthcare portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loginSuccess && (
                <Alert className="mb-4 border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    Login successful! Welcome back to MedCare Portal.
                  </AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email Address</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder={userType === 'doctor' ? 'doctor@medcare.com' : 'patient@email.com'}
                    {...loginForm.register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-destructive text-sm">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      {...loginForm.register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-destructive text-sm">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button type="button" className="text-sm hover:underline text-gray-600 hover:text-gray-700">
                    Forgot password?
                  </button>
                </div>

                <Button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700" disabled={loginForm.formState.isSubmitting}>
                  {loginForm.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <UserPlus className="h-5 w-5 text-gray-600" />
                Create Account
              </CardTitle>
              <CardDescription className="text-gray-600">
                Join our secure healthcare platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {registerSuccess && (
                <Alert className="mb-4 border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    Registration successful! Please check your email for verification.
                  </AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={userType === 'doctor' ? 
                doctorRegisterForm.handleSubmit(onDoctorRegisterSubmit) : 
                patientRegisterForm.handleSubmit(onPatientRegisterSubmit)
              } className="space-y-4">
                {userType === 'doctor' ? (
                  <DoctorRegistrationFields 
                    form={doctorRegisterForm}
                    showPassword={showPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowPassword={setShowPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                  />
                ) : (
                  <PatientRegistrationFields 
                    form={patientRegisterForm}
                    showPassword={showPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowPassword={setShowPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                  />
                )}

                <div className="text-sm text-gray-600">
                  By creating an account, you agree to our Terms of Service and Privacy Policy.
                </div>

                <Button type="submit" className="w-full text-white bg-gray-800 hover:bg-gray-900" disabled={
                  userType === 'doctor' ? doctorRegisterForm.formState.isSubmitting : patientRegisterForm.formState.isSubmitting
                }>
                  {(userType === 'doctor' ? doctorRegisterForm.formState.isSubmitting : patientRegisterForm.formState.isSubmitting) ? 
                    'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DoctorRegistrationFields({ form, showPassword, showConfirmPassword, setShowPassword, setShowConfirmPassword }: any) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="Dr. John"
            {...form.register('firstName', {
              required: 'First name is required'
            })}
          />
          {form.formState.errors.firstName && (
            <p className="text-destructive text-sm">
              {form.formState.errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Smith"
            {...form.register('lastName', {
              required: 'Last name is required'
            })}
          />
          {form.formState.errors.lastName && (
            <p className="text-destructive text-sm">
              {form.formState.errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-email">Email Address</Label>
        <Input
          id="register-email"
          type="email"
          placeholder="doctor@hospital.com"
          {...form.register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {form.formState.errors.email && (
          <p className="text-destructive text-sm">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="licenseNumber">Medical License Number</Label>
        <Input
          id="licenseNumber"
          placeholder="MD123456789"
          {...form.register('licenseNumber', {
            required: 'Medical license number is required'
          })}
        />
        {form.formState.errors.licenseNumber && (
          <p className="text-destructive text-sm">
            {form.formState.errors.licenseNumber.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialty">Medical Specialty</Label>
        <Input
          id="specialty"
          placeholder="e.g., Cardiology, Pediatrics, Internal Medicine"
          {...form.register('specialty', {
            required: 'Medical specialty is required'
          })}
        />
        {form.formState.errors.specialty && (
          <p className="text-destructive text-sm">
            {form.formState.errors.specialty.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hospitalAffiliation">Hospital/Clinic Affiliation (Optional)</Label>
        <Input
          id="hospitalAffiliation"
          placeholder="General Hospital"
          {...form.register('hospitalAffiliation')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="yearsOfExperience">Years of Experience</Label>
        <Input
          id="yearsOfExperience"
          type="number"
          placeholder="5"
          {...form.register('yearsOfExperience', {
            required: 'Years of experience is required',
            min: { value: 0, message: 'Must be 0 or greater' }
          })}
        />
        {form.formState.errors.yearsOfExperience && (
          <p className="text-destructive text-sm">
            {form.formState.errors.yearsOfExperience.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-password">Password</Label>
        <div className="relative">
          <Input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            {...form.register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Password must contain uppercase, lowercase, and a number'
              }
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {form.formState.errors.password && (
          <p className="text-destructive text-sm">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            {...form.register('confirmPassword', {
              required: 'Please confirm your password'
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {form.formState.errors.confirmPassword && (
          <p className="text-destructive text-sm">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>
    </>
  );
}

function PatientRegistrationFields({ form, showPassword, showConfirmPassword, setShowPassword, setShowConfirmPassword }: any) {
  return (
    <>


      <div className="space-y-2">
        <Label htmlFor="register-email">Email Address</Label>
        <Input
          id="register-email"
          type="email"
          placeholder="patient@email.com"
          {...form.register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {form.formState.errors.email && (
          <p className="text-destructive text-sm">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>




      <div className="space-y-2">
        <Label htmlFor="register-password">Password</Label>
        <div className="relative">
          <Input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            {...form.register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Password must contain uppercase, lowercase, and a number'
              }
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {form.formState.errors.password && (
          <p className="text-destructive text-sm">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            {...form.register('confirmPassword', {
              required: 'Please confirm your password'
            })}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {form.formState.errors.confirmPassword && (
          <p className="text-destructive text-sm">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>
    </>
  );
}