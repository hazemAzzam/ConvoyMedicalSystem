import { UseFormSetError, FieldValues, Path } from "react-hook-form";

export const getServerErrors = <T extends FieldValues>(
  response: any,
  form: { setError: UseFormSetError<T> },
) => {
  console.log("Error response:", response);
  const errors =
    response?.response?.data || response?.data || response?.message;
  if (errors) {
    console.log("Server validation errors:", response.response.data.errors);
    Object.entries(errors).forEach(([field, message]) => {
      form.setError(field as Path<T>, {
        message: message as string,
      });
    });
  } else if (response?.data?.errors) {
    console.log("Direct validation errors:", response.data.errors);
    Object.entries(response.data.errors).forEach(([field, message]) => {
      form.setError(field as Path<T>, {
        message: message as string,
      });
    });
  } else {
    console.log("Setting root error");
    form.setError("root" as Path<T>, {
      message: response?.message || "An unexpected error occurred",
    });
  }
};
