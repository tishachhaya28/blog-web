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
import { registerUser } from "@/services/auth.services"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

  const navigate = useNavigate();

  const [ formData, setFormData ] = useState({
    name: "",
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

  const { mutate: register } = useMutation({
    mutationKey: ["user-registration"],
    mutationFn: () => registerUser(formData),
    onSuccess: (data) =>{
      try {
        console.log(data);
        navigate("/login");
        toast("Registered successfully!");
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => {
      console.log(error);
      toast("Error while registration, Please try again later!");
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault();
    register();
  }

  return (
    <Card {...props} className="w-3xl mx-auto mt-48">
      <CardHeader>
        <CardTitle>Register an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form method="POST" onSubmit={(e) => handleSubmit(e)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input 
                id="name" 
                type="text" 
                placeholder="John Doe" 
                name="name"
                value={formData.name}
                onChange={(e) => handleChange(e)}
                required
              />
            </Field>
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
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input 
                id="password" 
                type="password" 
                name="password"
                value={formData.password}
                onChange={(e) => handleChange(e)}
                required
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to="/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
