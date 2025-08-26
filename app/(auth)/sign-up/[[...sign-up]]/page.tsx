import { SignUp, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import { Loader2, UserPlus, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='min-h-screen relative bg-neutral-50 dark:bg-neutral-950 overflow-hidden'>
      {/* Modern grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Contemporary mesh gradient */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-300 dark:bg-emerald-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-teal-300 dark:bg-teal-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-cyan-300 dark:bg-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className='relative min-h-screen flex items-center justify-center py-12'>
        <div className='w-full max-w-lg px-6'>
          <div className='space-y-6'>
            {/* Header section */}
            <div className='text-center space-y-4'>
              <div className='mx-auto w-12 h-12 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-xl flex items-center justify-center shadow-lg border border-neutral-200 dark:border-neutral-800'>
                <UserPlus className='h-6 w-6 text-neutral-900 dark:text-white' />
              </div>
              
              <div className='space-y-2'>
                <h1 className='font-black text-2xl text-neutral-900 dark:text-white tracking-tight'>
                  Join MOX Finance
                </h1>
                <p className='text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed'>
                  Start your journey to financial freedom
                </p>
              </div>
            </div>

            {/* Auth form container */}
            <div className='bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden'>
              <ClerkLoaded>
                <div className='flex justify-center items-center p-8'>
                  <SignUp 
                    path='/sign-up' 
                    appearance={{
                      elements: {
                        formButtonPrimary: 'bg-neutral-900 dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 font-semibold py-3 px-6 rounded-xl w-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]',
                        card: 'shadow-none bg-transparent border-none w-full max-w-none',
                        rootBox: 'w-full flex justify-center',
                        headerTitle: 'text-xl font-black text-neutral-900 dark:text-white mb-2 text-center tracking-tight',
                        headerSubtitle: 'text-neutral-600 dark:text-neutral-300 mb-5 text-center text-sm',
                        socialButtonsBlockButton: 'bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300 rounded-xl py-3 mb-3 w-full hover:shadow-lg hover:scale-[1.02]',
                        socialButtonsBlockButtonText: 'font-medium text-neutral-900 dark:text-white',
                        formFieldInput: 'bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 focus:border-neutral-400 dark:focus:border-neutral-500 rounded-xl transition-all duration-300 py-3 px-4 w-full text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:shadow-lg',
                        formFieldLabel: 'text-neutral-900 dark:text-white font-semibold mb-2 block',
                        footerActionLink: 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white font-semibold transition-colors duration-200',
                        dividerLine: 'bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent',
                        dividerText: 'text-neutral-600 dark:text-neutral-300 font-medium bg-white/60 dark:bg-neutral-900/60 px-4',
                        formFieldRow: 'mb-4 w-full',
                        footer: 'mt-5 text-center w-full',
                        main: 'w-full',
                        identityPreviewEditButton: 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white',
                        formFieldInputShowPasswordButton: 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white',
                        formResendCodeLink: 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white',
                        formFieldAction: 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
                      },
                      layout: {
                        socialButtonsPlacement: 'top'
                      }
                    }}
                  />
                </div>
              </ClerkLoaded>

              <ClerkLoading>
                <div className='flex flex-col items-center justify-center py-12 space-y-3'>
                  <Loader2 className='animate-spin h-6 w-6 text-neutral-600 dark:text-neutral-300' />
                  <p className='text-neutral-600 dark:text-neutral-300 text-sm'>Loading...</p>
                </div>
              </ClerkLoading>
            </div>

            {/* Trust indicators */}
            <div className='flex items-center justify-center space-x-4 text-xs text-neutral-600 dark:text-neutral-300 flex-wrap gap-y-1'>
              <div className='flex items-center space-x-1'>
                <Shield className='h-3 w-3 text-emerald-500' />
                <span>Secure</span>
              </div>
              <div className='flex items-center space-x-1'>
                <TrendingUp className='h-3 w-3 text-blue-500' />
                <span>Free to start</span>
              </div>
            </div>

            {/* Footer link */}
            <div className='text-center'>
              <p className='text-xs text-neutral-600 dark:text-neutral-300'>
                Already have an account?{' '}
                <Link 
                  href='/sign-in' 
                  className='text-neutral-900 dark:text-white font-semibold hover:underline transition-all duration-200 group'
                >
                  Sign in
                  <ArrowRight className='inline-block w-3 h-3 ml-1 transition-transform group-hover:translate-x-1' />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}