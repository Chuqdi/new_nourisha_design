import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SidebarHOC from "@/HOC/SidebarHOC";
import { updatePasswordScheme } from "@/lib/scheme";
import { toast } from "@/ui/use-toast";
import { FormikHelpers, useFormik } from "formik";
import { useContext, useState } from "react";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  // const { apiClient } = useContext(ApiClientContext);
  type formDataType = {
    confirm_password: string;
    new_password: string;
    current_password: string;
  };
  const onSubmit = async (
    data: formDataType,
    action: FormikHelpers<formDataType>
  ) => {
    setLoading(true);
    const { confirm_password, new_password } = data;
    // await apiClient
    //   .put("customers/password", { confirm_password, new_password })
    //   .then((data) => {
    //     console.log(data);

    //     toast({
    //       variant: "default",
    //       title: "Password updated successfully",
    //     });
    //   });
    setLoading(false);
  };
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    validationSchema: updatePasswordScheme,
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    onSubmit,
  });
  return (
    <SidebarHOC isBack title="Change password">
      <div className="w-full">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div>
            <label>Old Password</label>
            <Input
              type="password"
              className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem]"
              placeholder="Enter current password"
              value={values.current_password}
              onChange={handleChange("current_password")}
            />
            {errors.current_password && touched.current_password && (
              <p className="error_text">{errors.current_password}</p>
            )}
          </div>

          <div>
            <label>New Password</label>
            <Input
              type="password"
              className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem]"
              value={values.new_password}
              onChange={handleChange("new_password")}
              placeholder="Enter New password"
            />
            {errors.new_password && touched.new_password && (
              <p className="error_text">{errors.new_password}</p>
            )}
          </div>

          <div>
            <label>Repeat New Password</label>
            <Input
              type="password"
              className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem]"
              placeholder="Enter Confirm New Password"
              value={values.confirm_password}
              onChange={handleChange("confirm_password")}
            />
          </div>

          <Button
            disabled={loading}
            title="Save changes"
            variant="primary"
            fullWidth
            className="h-[3rem]"
          />
        </form>
      </div>
    </SidebarHOC>
  );
}
