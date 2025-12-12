export default function HeroBanner() {

  return (
    <div className="relative h-62 shrink-0 basis-[49.5%] overflow-hidden rounded-xl 
                sm:grow phone:w-full">
      <video
        src="https://media.fluentez.com/uploads/UserProfiles/christmas_home.mp4"
        autoPlay
        loop
        className="absolute h-full w-full object-cover"
        preload="auto">
      </video>
      <div className="absolute left-[50%] top-[50%] w-full translate-x-[-50%] translate-y-[-50%] px-2
          text-center text-white">
        <h1 className="mb-2 text-nowrap font-body text-2xl font-bold text-white sm:text-wrap 
            md:text-wrap md:text-lg lg:text-2xl xl:text-3xl phone:text-wrap phone:text-lg">
          Explore many exciting courses
        </h1>
        <p className="mb-[10%] text-base text-white sm:text-wrap 
            md:text-wrap md:text-sm lg:text-lg phone:text-left phone:text-sm">
          Free English skills development platform. You can access necessary features in the sidebar
        </p>
      </div>
    </div>
  );
}
