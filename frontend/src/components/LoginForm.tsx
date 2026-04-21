import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "@/services/auth.services"
import { toast } from "sonner"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  const [ formData, setFormData ] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const { mutate: login } = useMutation({
    mutationKey: ["user-login"],
    mutationFn: () => loginUser(formData),
    onSuccess: (data) =>{
      try {
        const { token, user } = data?.data?.data;
        const strigfyUser = JSON.stringify(user);
        localStorage.setItem("token", token)
        localStorage.setItem("user", strigfyUser)
        if(user.role == "admin"){
          navigate("/dashboard");
        }else{
          navigate("/posts");
        }
        toast("Login successfully!");
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => {
      console.log(error);
      toast("Error while Login, Please try again later!");
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login();
  }
  return (
    <div className={cn("flex flex-col gap-6 w-3xl mx-auto mt-56", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form method="POST" onSubmit={(e) => handleSubmit(e)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleChange(e)}
                  required 
                />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/register">Register</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
