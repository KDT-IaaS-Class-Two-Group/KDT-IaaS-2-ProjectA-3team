import Link from "next/link";
const Dash: React.FC = () => {
  return (
    <div>
      <button>
        <Link href={"/pending"}>대기</Link>
      </button>
    </div>
  );
};

export default Dash;
