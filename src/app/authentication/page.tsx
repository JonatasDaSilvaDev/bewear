"use client"

import { SignIn } from "@/components/core/sign-in"
import { SignUpForm } from "@/components/core/sign-up"
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
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Authentication() {
	return (
		<section className="flex w-full max-w-sm flex-col gap-6 p-4">
			<Tabs defaultValue="sign-in">
				<TabsList>
					<TabsTrigger value="sign-in">Entrar</TabsTrigger>
					<TabsTrigger value="sign-up">Registrar</TabsTrigger>
				</TabsList>
				<TabsContent value="sign-in">
					<SignIn />
				</TabsContent>
				<TabsContent value="sign-up">
					<SignUpForm />
				</TabsContent>
			</Tabs>
		</section>
	)
}
