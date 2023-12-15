export default function AboutPage() {
  return (
    <div className="screen-container">
      <h1 className="page-title">About MicFinder</h1>
      <p className="mb-4">
        At MicFinder, we&apos;re passionate about creating connections between
        performers and their audience. Our platform is a dynamic space where you
        can find, explore, and share a variety of live events, spanning from
        stand-up comedy to soulful music gigs, engaging poetry readings, and
        beyond.
      </p>
      <h2 className="title">What Drives Us</h2>
      <p className="mb-6">
        Our core belief lies in the transformative effect of live performances.
        We aim to democratize the access to these rich, cultural experiences,
        facilitating a space where emerging talents can shine and audiences can
        indulge in diverse artistic expressions.
      </p>
      <h2 className="title">Get in Touch</h2>
      <p>
        Your feedback and queries are invaluable to us. For any questions,
        suggestions, or just to say hello, please contact us at:
      </p>
      <ul>
        <li>Email: contact@openmicfinder.com</li>
        <p className="mt-2">
          <a
            href="mailto:nitronate@gmail.com"
            className="text-blue-500 hover:underline"
          >
            Contact me with questions or issues
          </a>
        </p>
      </ul>
    </div>
  );
}
