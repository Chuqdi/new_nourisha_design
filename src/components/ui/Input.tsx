
type props = {
    className?:string;
} &React.ComponentProps<"input">;
export default function Input ({className, ...rest }:props){
    return (
        <input
        placeholder={rest.placeholder}
        type="text"
        className={`w-full rounded-[0.75rem]  p-3 h-10 bg-[#F2F4F7] ${className}`}
        {...rest}
        />
    )
}