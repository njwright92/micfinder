// app/about/page.tsx

export default function AboutPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">About OpenMicFinder</h1>
      <p className="mb-4">
        OpenMicFinder is dedicated to connecting artists with audiences through
        the power of live performances. Our platform is designed to help you
        discover and share open mic events in various artistic domains including
        comedy, music, poetry, and more.
      </p>
      <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
      <p className="mb-6">
        We believe in the power of live performances to inspire, entertain, and
        bring people together. Our mission is to make it easier for everyone to
        access these experiences and for artists to find their stage.
      </p>
      <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
      <p>
        If you have any questions or suggestions, please feel free to reach out
        to us at:
      </p>
      <ul>
        <li>Email: contact@openmicfinder.com</li>
        {/* Add more contact details if necessary */}
      </ul>
    </div>
  );
}
