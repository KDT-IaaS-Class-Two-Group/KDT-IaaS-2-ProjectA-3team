import Link from "next/link";
import { BackButtonSection } from "./style/backbutton.css";
import BackButtonProps from "./utils/props/backbutton.props";

const BackButton: React.FC<BackButtonProps> = ({ url, button_name }) => {
  return (
    <section className={BackButtonSection}>
      <Link href={url}>
        <button>
          <span />
          {button_name}
        </button>
      </Link>
    </section>
  );
};
export default BackButton;
