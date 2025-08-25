import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import { Loader2, Shield, TrendingUp, DollarSign } from 'lucide-react';
import Image from 'next/image';

export default function Page() {
  return (
    <div className='min-h-screen relative overflow-hidden'>
      {/* Animated gradient background */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 animate-pulse'></div>
      </div>
      
      {/* Floating elements */}
      <div className='absolute top-20 left-20 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-bounce'></div>
      <div className='absolute top-40 right-32 w-16 h-16 bg-purple-500/10 rounded-full blur-lg animate-pulse delay-1000'></div>
      <div className='absolute bottom-32 left-40 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl animate-bounce delay-2000'></div>

      <div className='relative min-h-screen grid grid-cols-1 lg:grid-cols-2'>
        {/* Left column - Auth form */}
        <div className='flex flex-col items-center justify-center min-h-screen px-6 py-12 lg:px-12'>
          <div className='w-full max-w-lg space-y-8'>
            {/* Header section */}
            <div className='text-center space-y-6'>
              <div className='mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25'>
                <Shield className='h-8 w-8 text-white' />
              </div>
              
              <div className='space-y-3'>
                <h1 className='font-bold text-4xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent'>
                  Welcome Back
                </h1>
                <p className='text-lg text-muted-foreground max-w-sm mx-auto leading-relaxed'>
                  Sign in to access your financial dashboard and continue managing your wealth
                </p>
              </div>
            </div>

            {/* Auth form container */}
            <div className='backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 rounded-3xl border border-white/20 shadow-2xl shadow-blue-500/10 overflow-hidden'>
              <ClerkLoaded>
                <div className='flex justify-center items-center p-8'>
                  <SignIn 
                    path='/sign-in' 
                    appearance={{
                      elements: {
                        formButtonPrimary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 transition-all duration-200 text-white font-semibold py-3 px-6 rounded-xl w-full',
                        card: 'shadow-none bg-transparent border-none w-full max-w-none',
                        rootBox: 'w-full flex justify-center',
                        headerTitle: 'text-2xl font-bold text-foreground mb-2 text-center',
                        headerSubtitle: 'text-muted-foreground mb-6 text-center',
                        socialButtonsBlockButton: 'border-2 border-gray-200 hover:border-blue-300 transition-colors duration-200 rounded-xl py-3 mb-3 w-full',
                        socialButtonsBlockButtonText: 'font-medium text-foreground',
                        formFieldInput: 'border-2 border-gray-200 focus:border-blue-400 rounded-xl transition-colors duration-200 py-3 px-4 w-full bg-background',
                        formFieldLabel: 'text-foreground font-medium mb-2 block',
                        footerActionLink: 'text-blue-600 hover:text-purple-600 font-semibold transition-colors duration-200',
                        dividerLine: 'bg-gradient-to-r from-transparent via-gray-300 to-transparent',
                        dividerText: 'text-muted-foreground font-medium bg-white dark:bg-gray-900 px-4',
                        formFieldRow: 'mb-4 w-full',
                        footer: 'mt-6 text-center w-full',
                        main: 'w-full',
                        identityPreviewEditButton: 'text-blue-600 hover:text-purple-600',
                        formFieldInputShowPasswordButton: 'text-blue-600 hover:text-purple-600',
                        formResendCodeLink: 'text-blue-600 hover:text-purple-600'
                      },
                      layout: {
                        socialButtonsPlacement: 'top'
                      }
                    }}
                  />
                </div>
              </ClerkLoaded>

              <ClerkLoading>
                <div className='flex flex-col items-center justify-center py-20 space-y-4'>
                  <Loader2 className='animate-spin h-8 w-8 text-blue-600' />
                  <p className='text-muted-foreground'>Loading secure authentication...</p>
                </div>
              </ClerkLoading>
            </div>

            {/* Trust indicators */}
            <div className='flex items-center justify-center space-x-6 text-sm text-muted-foreground flex-wrap gap-y-2'>
              <div className='flex items-center space-x-2'>
                <Shield className='h-4 w-4 text-green-500' />
                <span>Bank-level security</span>
              </div>
              <div className='flex items-center space-x-2'>
                <TrendingUp className='h-4 w-4 text-blue-500' />
                <span>Real-time insights</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Branding */}
        <div className='hidden lg:flex items-center justify-center relative'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700'></div>
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent'></div>
          
          {/* Decorative circles */}
          <div className='absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl'></div>
          <div className='absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl'></div>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl'></div>

          <div className='relative z-10 text-center text-white space-y-8 max-w-md px-8'>
            <div className='mx-auto w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl'>
              <Image src="/logo.png" alt="MOX Finance" width={48} height={48} className='rounded-xl' />
            </div>
            
            <div className='space-y-4'>
              <h2 className='text-3xl font-bold'>MOX Finance</h2>
              <p className='text-xl text-blue-100 leading-relaxed'>
                Your intelligent financial companion for smarter money management
              </p>
            </div>

            <div className='grid grid-cols-2 gap-6 pt-8'>
              <div className='text-center space-y-2'>
                <DollarSign className='h-8 w-8 mx-auto text-green-300' />
                <p className='text-sm font-medium'>Smart Budgeting</p>
              </div>
              <div className='text-center space-y-2'>
                <TrendingUp className='h-8 w-8 mx-auto text-blue-300' />
                <p className='text-sm font-medium'>Investment Tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}