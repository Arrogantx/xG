import Header from '@/components/Header';

   export default function Home() {
     return (
       <main>
         <Header />
         <div className='p-4'>
           <h2 className='text-xl font-semibold'>Welcome to Your App</h2>
           <p className='mt-2'>This is a Next.js app with TypeScript and Tailwind CSS.</p>
         </div>
       </main>
     );
   }
   
