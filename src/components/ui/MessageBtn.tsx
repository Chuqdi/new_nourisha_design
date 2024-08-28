

export default function MessageBtn ({ title }:{ title:string }){
    return (
        <button className="text-[#FE7E00] font-inter text-base leading-[1.5rem] tracking-[-0.015rem] rounded-full p-6 h-14 mx-auto w-fit border-[1px] border-[#828893] flex justify-center items-center">
        {title}
      </button>
    )
}