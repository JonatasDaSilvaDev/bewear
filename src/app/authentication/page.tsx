"use client"

import { SignIn } from "@/components/core/sign-in"
import { SignUp } from "@/components/core/sign-up"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Authentication() {
	return (
		<section className="flex w-full max-w-sm flex-col gap-6 p-4">
			<Tabs defaultValue="sign-in">
				<TabsList className="w-full max-w-full">
					<TabsTrigger value="sign-in" className="font-urbanist font-bold">
						Entrar
					</TabsTrigger>
					<TabsTrigger value="sign-up" className="font-urbanist font-bold">
						Registrar
					</TabsTrigger>
				</TabsList>
				<TabsContent value="sign-in">
					<SignIn />
				</TabsContent>
				<TabsContent value="sign-up">
					<SignUp />
				</TabsContent>
			</Tabs>
		</section>
	)
}
