import dynamic from "next/dynamic";

const EventForm = dynamic(() => import("./components/EventForm"), {
  loading: () => <p>Loading form...</p>,
  ssr: false,
});

export default function HomePage() {
  return (
    <div className="screen-container">
      <h1 className="page-title">Welcome to MicFinder!</h1>
      <p className="text-center mb-4">
        Discover and share open mic events - your stepping stone in the world of
        stand-up comedy and live performances.
      </p>
      <section className="mb-6">
        <h2 className="title">Find Your Stage:</h2>
        <p>
          Browse through an array of open mic events tailored to comedians,
          poets, and musicians. OpenMicFinder is your gateway to experiencing
          and participating in the thriving local art scene.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="title">Connect and Grow:</h2>
        <p>
          Join a community of artists and enthusiasts. Share stories, gather
          insights, and forge connections in a space dedicated to the growth and
          celebration of live artistic expression.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="title">Promote Your Event:</h2>
        <p className="mb-2">
          Got an open mic event? Let OpenMicFinder amplify your reach. With
          targeted advertising and visibility among a passionate audience, your
          event is set for greater engagement and success.
        </p>
        <p className="mt-2">
          <a
            href="mailto:nitronate@gmail.com"
            className="neu-button hover:bg-blue-900 text-white font-bold py-2 px-4 mt-4 rounded"
          >
            Contact me with questions or issues
          </a>
        </p>
        <EventForm />
      </section>
      <section className="mb-6">
        <h2 className="title">Step into the Spotlight:</h2>
        <p>
          Whether you&apos;re a budding comedian, a poet, or a musician,
          OpenMicFinder is your platform to shine. Find events that resonate
          with your art and let the world be your audience.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="title text-green-400">Explore Comedify:</h2>
        <p className="mb-4">
          Dive into Comedify, the app with comicBot - a humorous, occasionally
          offensive LLM, and JokePad. It&apos;s the perfect companion for
          comedians looking to write, store, and refine their jokes. Get ready
          to laugh and be inspired!
        </p>
        <a
          href="https://comedify-54274.web.app/"
          className="neu-button hover:bg-green-900 text-white font-bold py-2 px-4 mt-4 rounded"
        >
          Visit Comedify 😃
        </a>
      </section>
    </div>
  );
}
