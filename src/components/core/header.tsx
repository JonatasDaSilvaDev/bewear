"use client"

import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export function Header() {
	const { data: session } = authClient.useSession()

	return (
		<header className="w-full h-22 flex items-center justify-center border border-zinc-700/5">
			<div className="w-full max-w-7xl flex items-center justify-between px-6">
				<div className="flex-row items-center gap-4 hidden md:flex">
					<Avatar className="rounded-none">
						<AvatarImage src={session?.user?.image as string | undefined} />
						<AvatarFallback className="rounded-xs">
							{session?.user?.name?.split(" ")?.[0]?.[0]}
							{session?.user?.name?.split(" ")?.[2]?.[0]}
						</AvatarFallback>
					</Avatar>
					<p className="font-urbanist font-bold">{session?.user?.name?.split(" ")?.[0]}</p>
				</div>
				<Link href="/">
					<Image src="/logo.svg" alt="Bewear" width={100} height={26.14} className="object-cover" />
				</Link>
				<div className="context flex flex-row items-center">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon">
								<MenuIcon />
							</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Menu</SheetTitle>
							</SheetHeader>
							<div className="px-5">
								{session?.user ? (
									<div className="flex justify-between space-y-6">
										<div className="flex items-center gap-3">
											<Avatar className="rounded-xs">
												<AvatarImage
													src={session?.user?.image as string | undefined}
													className="rounded-none"
												/>
												<AvatarFallback className="rounded-xs">
													{session?.user?.name?.split(" ")?.[0]?.[0]}
													{session?.user?.name?.split(" ")?.[2]?.[0]}
												</AvatarFallback>
											</Avatar>

											<div>
												<h3 className="font-semibold">{session?.user?.name}</h3>
												<span className="text-muted-foreground block text-xs">
													{session?.user?.email}
												</span>
											</div>
										</div>
										<Button variant="ghost" size="icon" onClick={() => authClient.signOut()}>
											<LogOutIcon />
										</Button>
									</div>
								) : (
									<div className="flex items-center justify-between">
										<h2 className="font-semibold">Olá. Faça seu login!</h2>
										<Button size="icon" asChild variant="outline">
											<Link href="/authentication">
												<LogInIcon />
											</Link>
										</Button>
									</div>
								)}
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	)
}
