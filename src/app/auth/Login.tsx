import Input from "@/components/ui/Input";
import Link from "next/link";

export default function Login({ formikObj }: {formikObj:any} ) {
  const { values, errors,  handleChange,  } = formikObj;
 

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label>Email address</label>
        <Input
          className="h-[3rem] rounded-[0.75rem] bg-[#F2F4F7]"
          value={values.email}
          onChange={handleChange("email")}
        />
        {errors.email  && (
          <p className="error_text">{errors.email}</p>
        )}
      </div>

      <div>
        <label>Password</label>
        <Input
          type="password"
          className="h-[3rem] rounded-[0.75rem] bg-[#F2F4F7]"
          value={values.password}
          onChange={handleChange("password")}
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="error_text">{errors.password}</p>
        )}
      </div>

       <Link
        className="underline text-black-900 font-inter text-base font-semibold"
        href=""
      >
        Forgot Password?
      </Link> 
    </div>
  );
}
