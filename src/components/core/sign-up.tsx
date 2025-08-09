"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

const formSchema = z
	.object({
		name: z.string("Nome inválido.").trim().min(1, "Nome é obrigatório."),
		email: z.email("E-mail inválido."),
		password: z.string("Senha inválida.").min(8, "Senha inválida."),
		passwordConfirmation: z.string("Senha inválida.").min(8, "Senha inválida."),
	})
	.refine(
		(data) => {
			return data.password === data.passwordConfirmation
		},
		{
			error: "As senhas não coincidem.",
			path: ["passwordConfirmation"],
		},
	)

type FormValues = z.infer<typeof formSchema>

export function SignUp() {
	const router = useRouter()
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			passwordConfirmation: "",
		},
	})

	async function onSubmit(values: FormValues) {
		console.info(values.password)
		const { data, error } = await authClient.signUp.email({
			name: values.name,
			email: values.email, // required
			password: values.password, // required
			image: `https://avatar.iran.liara.run/username?username=${values.name}`,
			fetchOptions: {
				onSuccess: () => {
					router.push("/")
				},
				onError: (error) => {
					if (error.error.code === "USER_ALREADY_EXISTS") {
						toast.error("E-mail já cadastrado.")
						return form.setError("email", {
							message: "E-mail já cadastrado.",
						})
					}
					toast.error(error.error.message)
				},
			},
		})
	}

	return (
		<>
			<Card className="w-full">
				<CardHeader>
					<CardTitle className="font-urbanist font-bold text-lg">Criar conta</CardTitle>
					<CardDescription className="font-roboto-serif text-xs">
						Crie uma conta para continuar.
					</CardDescription>
				</CardHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<CardContent className="grid w-full gap-6">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-urbanist font-bold">Nome</FormLabel>
										<FormControl className="font-urbanist font-base">
											<Input placeholder="Digite seu nome" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
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
							<FormField
								control={form.control}
								name="passwordConfirmation"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-urbanist font-bold">Confirmar senha</FormLabel>
										<FormControl className="font-urbanist font-base">
											<Input
												placeholder="Digite a sua senha novamente"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter>
							<Button type="submit" className="w-full font-urbanist font-bold">
								Criar conta
							</Button>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</>
	)
}
