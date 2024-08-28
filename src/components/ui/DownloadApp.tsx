import Link from "next/link";

export default function DownloadApp() {
  const options = [
    {
      image: "play_store.png",
      path: "",
    },
    {
      image: "app_store.png",
      path: "",
    },
  ];
  return (
    <div className="flex  flex-row items-center gap-5">
      {options.map((option) => (
        <Link href={option.path}>
          <img className="w-[8.5rem]" src={`/images/${option.image}`} />
        </Link>
      ))}
    </div>
  );
}
