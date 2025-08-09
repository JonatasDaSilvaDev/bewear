import type { Metadata } from "next"
import { Geist, Geist_Mono, Roboto_Serif, Urbanist } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

const urbanist = Urbanist({
	variable: "--font-urbanist",
	subsets: ["latin"],
})

const robotoSerif = Roboto_Serif({
	variable: "--font-roboto-serif",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Bewear",
	description: "Sua loja de roupas online",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${urbanist.variable} ${robotoSerif.variable} antialiased`}
			>
				{children}
				<Toaster />
			</body>
		</html>
	)
}
