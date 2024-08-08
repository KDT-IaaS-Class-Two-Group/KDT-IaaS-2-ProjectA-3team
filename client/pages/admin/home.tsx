import Link from "next/link";
const Dash: React.FC = () => {
  return (
    <div>
      <button>
        <Link href={"/admin/pendingRegister"}>대기</Link>
      </button>
      <button>
        <Link href={"/user/home"}>홈</Link>
      </button>
    </div>
  );
};

export default Dash;
