import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
export default function Footer() {
  return (
    <footer className="bg-white text-black text-center p-1">
      <div className="container mx-auto">
        <h3 className="font-bold text-lg">Contact Us</h3>
        <p className="flex items-center justify-center mt-1">
          <EnvelopeIcon className="h-5 w-5 mr-1" />
          contact@openmicfinder.com
        </p>
        <p className="flex items-center justify-center mt-1">
          <PhoneIcon className="h-5 w-5 mr-1" />
          +1 234 567 890
        </p>
      </div>
      <p>© {new Date().getFullYear()} OpenMicFinder</p>
    </footer>
  );
}
