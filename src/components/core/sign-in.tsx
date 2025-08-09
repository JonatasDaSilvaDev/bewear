import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

const formSchema = z.object({
	email: z.email("E-mail inválido!"),
	password: z.string("Senha inválida!").min(8, "Senha inválida!"),
})

type formValues = z.infer<typeof formSchema>

export function SignIn() {
	const router = useRouter()

	const form = useForm<formValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	async function onSubmit(values: formValues) {
		await authClient.signIn.email({
			email: values.email,
			password: values.password,
			fetchOptions: {
				onSuccess: () => {
					router.push("/")
				},
				onError: (ctx) => {
					if (ctx.error.message === "USER_NOT_FOUND") {
						toast.error("Usuário não encontrado. Verifique os dados e tente novamente!")
						return form.setError("email", {
							message: "Usuário não encontrado.",
						})
					} else if (ctx.error.message === "INVALID_EMAIL_OR_PASSWORD") {
						toast.error("E-mail ou senha inválidos. Verifique os dados e tente novamente!")
						return form.setError("email", {
							message: "E-mail ou senha inválidos.",
						})
					}
					toast.error(ctx.error.message)
				},
			},
		})
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-urbanist font-bold text-lg">Acessar sua conta</CardTitle>
				<CardDescription className="font-roboto-serif text-xs">
					Faça login na sua conta para continuar.
				</CardDescription>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<CardContent className="grid gap-6">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-urbanist font-bold">Email</FormLabel>

									<FormControl className="font-urbanist font-base">
										<Input placeholder="Digite seu email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-urbanist font-bold">Senha</FormLabel>

									<FormControl className="font-urbanist font-base">
										<Input placeholder="Digite sua senha" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="flex flex-col gap-2">
						<Button type="submit" className="w-full font-urbanist font-bold">
							Entrar
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	)
}
