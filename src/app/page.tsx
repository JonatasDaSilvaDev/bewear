import Image from "next/image"
import { Header } from "@/components/core/header"
import { Button } from "@/components/ui/button"

export default function Home() {
	return (
		<div className="w-full font-sans flex flex-col items-center min-h-screen pb-20 gap-16">
			<Header />
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<h1 className="font-urbanist font-bold text-4xl">Home</h1>
			</main>
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
		</div>
	)
}
