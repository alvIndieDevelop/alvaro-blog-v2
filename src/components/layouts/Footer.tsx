import Link from "next/link";
import { ButtonIcon } from "../alvaroUI";
import { FaFacebookF, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <div className="grid grid-flow-col gap-4">
        <Link href={"/"} className="link link-hover">
          Inicio
        </Link>
        <Link href={"/resumen"} className="link link-hover">
          Resumen
        </Link>
        <Link href={"/blog"} className="link link-hover">
          blog
        </Link>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <ButtonIcon
            onClick={() =>
              openLink("https://www.instagram.com/alvindiedevelop/")
            }
          >
            <FaFacebookF fontSize={26} />
          </ButtonIcon>
          <ButtonIcon
            onClick={() =>
              openLink(
                "https://www.youtube.com/channel/UCeAvcmYAq3d4aiQyKwAvSXw"
              )
            }
          >
            <FaYoutube fontSize={26} />
          </ButtonIcon>
        </div>
      </div>
      <div>
        <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
      </div>
    </footer>
  );
}
