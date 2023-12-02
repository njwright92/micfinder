import EventForm from "./components/EventForm";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-400">
        Welcome to MicFinder!
      </h1>
      <p className="text-center mb-4">
        Discover and share open mic events - your stepping stone in the world of
        stand-up comedy and live performances.
      </p>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 underline text-blue-500">
          Find Your Stage:
        </h2>
        <p>
          Browse through an array of open mic events tailored to comedians,
          poets, and musicians. OpenMicFinder is your gateway to experiencing
          and participating in the thriving local art scene.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 underline text-blue-500">
          Connect and Grow:
        </h2>
        <p>
          Join a community of artists and enthusiasts. Share stories, gather
          insights, and forge connections in a space dedicated to the growth and
          celebration of live artistic expression.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 underline text-blue-500">
          Promote Your Event:
        </h2>
        <p>
          Got an open mic event? Let OpenMicFinder amplify your reach. With
          targeted advertising and visibility among a passionate audience, your
          event is set for greater engagement and success.
        </p>
        <p className="mt-2">
          <a
            href="mailto:nitronate@gmail.com"
            className="text-blue-500 hover:underline"
          >
            Contact me with questions or issues
          </a>
        </p>
        <EventForm />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4 underline text-blue-500">
          Step into the Spotlight:
        </h2>
        <p>
          Whether you're a budding comedian, a poet, or a musician,
          OpenMicFinder is your platform to shine. Find events that resonate
          with your art and let the world be your audience.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 underline text-green-400">
          Explore Comedify:
        </h2>
        <p>
          Dive into Comedify, the app with comicBot - a humorous, occasionally
          offensive LLM, and JokePad. It's the perfect companion for comedians
          looking to write, store, and refine their jokes. Get ready to laugh
          and be inspired!
        </p>
        <p className="mt-1">
          <a
            href="https://comedify-54274.web.app/"
            className="text-green-300 hover:underline"
          >
            Visit Comedify 😃
          </a>
        </p>
      </section>
    </div>
  );
}
