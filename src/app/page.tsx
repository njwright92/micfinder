// app/page.tsx

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">
        Welcome to OpenMicFinder
      </h1>
      <p className="text-center mb-4">
        Your go-to platform for discovering open mic events in your city.
      </p>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Find Events</h2>
        <p>
          Explore a wide range of open mic events, from comedy nights to poetry
          slams and music jams. Whether you&apos;re an aspiring artist or a fan of
          live performances, OpenMicFinder makes it easy to find events that
          match your interests.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Join a Community</h2>
        <p>
          Connect with local artists and enthusiasts. Share experiences, get
          feedback, and build your network in the vibrant world of live
          performances.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-3">Showcase Your Talent</h2>
        <p>
          Are you hosting an open mic event? OpenMicFinder offers a platform to
          promote your event and attract a passionate audience. Let&apos;s bring
          artists and audiences together!
        </p>
      </section>
    </div>
  );
}
