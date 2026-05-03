import CookieSettingsButton from "./CookieSettingsButton";

interface FooterProps {
  phones: string[];
}

export default function Footer({ phones }: FooterProps) {
  return (
    <footer className="bg-black py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-start">
          <img src="/logo-removebg-preview (1).png" alt="MT AUTOS" className="h-16 w-auto" />
        </div>

        <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-jost text-xl font-semibold text-gray-300">Navigácia</h3>
            <ul className="space-y-2 font-montserrat">
              <li><a href="/" className="hover:text-gray-300">Domov</a></li>
              <li><a href="/ponuka" className="hover:text-gray-300">Ponuka</a></li>
              <li><a href="/dovoz" className="hover:text-gray-300">Dovoz</a></li>
              <li><a href="/leasing" className="hover:text-gray-300">Leasing</a></li>
              <li><a href="/vykup" className="hover:text-gray-300">Výkup</a></li>
              <li><a href="/pzp" className="hover:text-gray-300">Poistenie</a></li>
              <li><a href="/kontakt" className="hover:text-gray-300">Kontakt</a></li>
              <li><a href="/ochrana-osobnych-udajov" className="hover:text-gray-300">Ochrana osobných údajov</a></li>
              <li><CookieSettingsButton /></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-jost text-xl font-semibold text-gray-300">Adresa</h3>
            <div className="space-y-2 font-montserrat text-gray-400">
              <p>29 Augusta č.2261/145,</p>
              <p>03852 Sučany, okres Martin</p>
              <p>(Sučany-Juh, pri Čerpacej stanici Orlen)</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-jost text-xl font-semibold text-gray-300">Kontakt</h3>
            <div className="space-y-2 font-montserrat text-gray-400">
              <p>mtautossro@gmail.com</p>
              {phones.length > 0 ? phones.map((phone) => <p key={phone}>{phone}</p>) : <p>+421 915 511 111</p>}
              <div className="mt-4 flex justify-start space-x-4">
                <a
                  href="https://wa.me/+421915834574"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 transition-colors hover:bg-green-600"
                  title="WhatsApp"
                  aria-label="WhatsApp"
                >
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.488" />
                  </svg>
                </a>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 transition-colors hover:bg-purple-600"
                  title="Viber"
                  aria-label="Viber"
                >
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.9 1.6c.8-.1 1.6-.1 2.4 0C20.1 2.2 22 6.7 22 12c0 5.5-4.5 10-10 10-1.7 0-3.3-.4-4.7-1.2L2 22l1.3-5.3C2.5 15.3 2 13.7 2 12 2 6.5 6.5 2 12 2c.7 0 1.3.1 1.9.2l.8-.1v.1h.1c.4 0 .7.3.8.7 0 .1 0 .2-.1.3-.1.2-.3.3-.5.3h-.1c-.6-.1-1.2-.2-1.9-.2-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8c0-4.2-1.6-7.8-5.1-8.3-.1 0-.2-.1-.2-.2 0-.4.3-.7.7-.7h.3zm.6 6.9c.2.1.4.3.4.5v.1c0 .2-.1.4-.3.5-.1.1-.3.1-.4 0-1.2-.5-2.6-.5-3.8 0-.1.1-.3 0-.4 0-.2-.1-.3-.3-.3-.5v-.1c0-.2.2-.4.4-.5 1.4-.6 3-.6 4.4 0zm-1.3 2.3c.9.3 1.7 1 2.1 1.9.1.2 0 .4-.2.5h-.1c-.2 0-.3-.1-.4-.2-.3-.7-.9-1.2-1.6-1.4-.2-.1-.3-.3-.3-.5s.3-.4.5-.3zm-1.9 2.6c.1.1.1.2.1.3v2.7c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-2.7c0-.5.4-.9.9-.9.3 0 .6.2.8.6zm3.8-1.1c.2 0 .4.2.4.4v4.4c0 .2-.2.4-.4.4s-.4-.2-.4-.4v-4.4c0-.2.2-.4.4-.4zm-7.5.9c.2 0 .4.2.4.4v2.6c0 .2-.2.4-.4.4s-.4-.2-.4-.4v-2.6c0-.2.2-.4.4-.4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center font-montserrat text-gray-400">
          <p className="mb-2">
            Tvorba webu -{" "}
            <a href="https://aebdigital.sk" target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-white">
              AEB Digital
            </a>
          </p>
          <p>Copyright © 2026 MT AUTOS s.r.o. All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
}
