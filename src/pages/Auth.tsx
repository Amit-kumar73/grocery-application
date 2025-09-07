import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { OTPVerificationForm } from '@/components/auth/OTPVerificationForm';

type AuthMode = 'login' | 'register' | 'forgot-password' | 'otp-verification' | 'reset';

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [otpEmail, setOtpEmail] = useState('');
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check URL params for mode
    const urlMode = searchParams.get('mode');
    if (urlMode === 'reset') {
      setMode('reset');
    }
  }, [searchParams]);

  useEffect(() => {
    // Redirect authenticated users to home
    if (user && !loading) {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSwitchToOTP = (email: string) => {
    setOtpEmail(email);
    setMode('otp-verification');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="w-full max-w-md">
        {mode === 'login' && (
          <LoginForm
            onSwitchToRegister={() => setMode('register')}
            onSwitchToForgotPassword={() => setMode('forgot-password')}
          />
        )}
        
        {mode === 'register' && (
          <RegisterForm
            onSwitchToLogin={() => setMode('login')}
            onSwitchToOTP={handleSwitchToOTP}
          />
        )}
        
        {mode === 'forgot-password' && (
          <ForgotPasswordForm
            onSwitchToLogin={() => setMode('login')}
          />
        )}
        
        {mode === 'otp-verification' && (
          <OTPVerificationForm
            email={otpEmail}
            type="signup"
            onSwitchToLogin={() => setMode('login')}
          />
        )}
        
        {mode === 'reset' && (
          <OTPVerificationForm
            email={searchParams.get('email') || ''}
            type="recovery"
            onSwitchToLogin={() => setMode('login')}
          />
        )}
      </div>
    </div>
  );
}