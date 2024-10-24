import Input from "@/components/ui/Input";


export default function SignUp({ formikObj }:{formikObj:any}) {
  const { values, errors,handleChange,  } = formikObj;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label>First name</label>
        <Input
          value={values.first_name}
          onChange={handleChange("first_name")}
          className="h-[3rem] rounded-[0.75rem] bg-[#F2F4F7]"
        />
        {errors.first_name  && (
          <p className="error_text">{errors.first_name}</p>
        )}
      </div>

      <div>
        <label>Last name</label>
        <Input
        value={values.last_name}
        onChange={handleChange("last_name")}
         className="h-[3rem] rounded-[0.75rem] bg-[#F2F4F7]" />
        {errors.last_name && (
          <p className="error_text">{errors.last_name}</p>
        )}
      </div>

      <div>
        <label>Email address</label>
        <Input
          type="email"
          onChange={handleChange("email")}
          className="h-[3rem] rounded-[0.75rem] bg-[#F2F4F7]"
        />
        {errors.email  && (
          <p className="error_text">{errors.email}</p>
        )}
      </div>

      <div>
        <label>Password</label>
        <Input
          type="password"
          value={values.password}
          onChange={handleChange("password")}
          className="h-[3rem] rounded-[0.75rem] bg-[#F2F4F7]"
          isPassword
        />
        {errors.password && (
          <p className="error_text">{errors.password}</p>
        )}
      </div>

      <div>
        <label>Confirm Password</label>
        <Input
          value={values.confirm_password}
          onChange={handleChange("confirm_password")}
          className="h-[3rem] rounded-[0.75rem] bg-[#F2F4F7]"
          isPassword
        />
        {errors.confirm_password && (
          <p className="error_text">{errors.confirm_password}</p>
        )}
      </div>
    </div>
  );
}
