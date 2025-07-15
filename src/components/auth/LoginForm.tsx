'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Brain, Mail, Lock, UserCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { UserRole } from '@/types';

interface LoginFormProps {
  onLogin?: (email: string, role: UserRole) => void;
  onSwitchToRegister?: () => void;
}

export function LoginForm({ onLogin, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('parent');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock validation
      if (email === 'demo@example.com' && password === 'password') {
        onLogin?.(email, role);
      } else {
        setError('Invalid email or password. Try demo@example.com / password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const roleDescriptions = {
    parent: 'Access family dashboard, case management, and professional communication',
    professional: 'Manage your practice, clients, and assessments',
    la_staff: 'Local authority tools for case management and compliance',
    school_staff: 'SEND management and educational support tools',
    healthcare_provider: 'Clinical workflows and patient management',
    legal_advocate: 'Legal case management and tribunal preparation',
    admin: 'System administration and platform management'
  };

  const roleColors = {
    parent: 'bg-blue-100 text-blue-700',
    professional: 'bg-purple-100 text-purple-700',
    la_staff: 'bg-green-100 text-green-700',
    school_staff: 'bg-orange-100 text-orange-700',
    healthcare_provider: 'bg-red-100 text-red-700',
    legal_advocate: 'bg-pink-100 text-pink-700',
    admin: 'bg-slate-100 text-slate-700'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center mx-auto">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
              SpectrumCare Platform
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Sign in to access your comprehensive autism support dashboard
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">Account Type</Label>
              <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parent">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-100 text-blue-700 text-xs">Parent</Badge>
                      <span>Parent & Family</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="professional">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-purple-100 text-purple-700 text-xs">Professional</Badge>
                      <span>Healthcare Professional</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="la_staff">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-700 text-xs">LA</Badge>
                      <span>Local Authority</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="school_staff">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-orange-100 text-orange-700 text-xs">School</Badge>
                      <span>School & Education</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="healthcare_provider">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-red-100 text-red-700 text-xs">NHS</Badge>
                      <span>Healthcare Provider</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="legal_advocate">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-pink-100 text-pink-700 text-xs">Legal</Badge>
                      <span>Legal Advocate</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-600 mt-1">
                {roleDescriptions[role]}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-4 w-4" />
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="space-y-4">
            <div className="text-center">
              <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Forgot your password?
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or</span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-slate-600">Don't have an account?</p>
              <Button
                type="button"
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={onSwitchToRegister}
              >
                Create New Account
              </Button>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-slate-900 mb-2">Demo Access</h4>
            <p className="text-xs text-slate-600 mb-2">
              Try the platform with demo credentials:
            </p>
            <div className="text-xs font-mono bg-white p-2 rounded border">
              <div>Email: demo@example.com</div>
              <div>Password: password</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
