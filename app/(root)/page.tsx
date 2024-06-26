import OddsList from '@/components/ui/OddsList';

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'});
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full'})).format(now);

  return (
        <section className='flex size-full flex-col text-white gap-10'>
          <div className='h-[300px] w-full rounded-[20px]
           bg-hero bg-cover'>
            <div className="flex h-full flex-col
             justify-between max-md:px-5 max-md:py-8 lg:p-11">
              <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center
               text-base font-normal">
              </h2>
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold lg:text-7xl">
                  BETTIPS
                </h1>
                <p className="text-lg font-medium text-sky-1 lg:text-2xl">
                  winners are not people who never fail, but people who never quit!
                </p>
              </div>
            </div>
          </div>

          <OddsList/>
        </section>
        
  )
}

export default Home
